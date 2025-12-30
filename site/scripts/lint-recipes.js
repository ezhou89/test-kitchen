#!/usr/bin/env node

/**
 * Recipe Content Linting Script
 *
 * Validates recipe content for:
 * - Forbidden ingredients (allergies/aversions)
 * - Measurement standards (grams vs volume)
 * - Required sections in protocols
 * - Consistency with food preferences
 */

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// Validation results
const errors = [];
const warnings = [];

// Color helpers
const colors = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

/**
 * Forbidden ingredients based on food-preferences.md
 * OAS triggers and aversions
 */
const FORBIDDEN_INGREDIENTS = [
  // OAS - Oral Allergy Syndrome triggers
  { pattern: /\braw\s+banana\b/i, reason: 'OAS trigger' },
  { pattern: /\bbanana\b(?!.*(?:cooked|baked|bread|muffin|cake))/i, reason: 'OAS trigger (ensure cooked)' },
  { pattern: /\bpeach(?:es)?\b(?!.*(?:cooked|canned|jam|preserve))/i, reason: 'OAS trigger (fuzzy fruit)' },
  { pattern: /\bnectarine\b/i, reason: 'OAS trigger (fuzzy fruit)' },
  { pattern: /\bapricot\b/i, reason: 'OAS trigger (fuzzy fruit)' },
  { pattern: /\balmond\b/i, reason: 'OAS trigger' },
  { pattern: /\balmond\s+(milk|flour|butter|extract)/i, reason: 'OAS trigger' },

  // Texture/taste aversions
  { pattern: /\braw\s+tomato\b/i, reason: 'texture aversion' },
  { pattern: /\bfresh\s+tomato\b(?!.*(?:sauce|paste|roasted|cooked))/i, reason: 'texture aversion (ensure cooked)' },
];

/**
 * Volume measurements to flag (prefer grams)
 */
const VOLUME_MEASUREMENTS = [
  { pattern: /\d+\s*(?:cup|cups)\b/i, suggestion: 'Use grams for repeatability' },
  { pattern: /\d+\s*(?:tbsp|tablespoon|tablespoons)\b/i, suggestion: 'Consider grams for dry ingredients' },
  { pattern: /\d+\s*(?:tsp|teaspoon|teaspoons)\b/i, suggestion: 'Consider grams for dry ingredients' },
  { pattern: /\bpinch\b/i, suggestion: 'Specify weight range instead of "pinch"' },
  { pattern: /\bsplash\b/i, suggestion: 'Specify volume or weight instead of "splash"' },
  { pattern: /\bhandful\b/i, suggestion: 'Specify weight instead of "handful"' },
];

/**
 * Recursively get all markdown files in a directory
 */
function getMarkdownFiles(dir, files = []) {
  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      getMarkdownFiles(fullPath, files);
    } else if (entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * Check for forbidden ingredients
 */
function checkForbiddenIngredients(content, relPath) {
  for (const { pattern, reason } of FORBIDDEN_INGREDIENTS) {
    const match = content.match(pattern);
    if (match) {
      errors.push(`${relPath}: Contains forbidden ingredient '${match[0]}' (${reason})`);
    }
  }
}

/**
 * Check for volume measurements (protocols only)
 */
function checkMeasurements(content, relPath, isProtocol) {
  // Only strict checking for protocols
  if (!isProtocol) return;

  // Find the ingredients section
  const ingredientsMatch = content.match(/##\s*Ingredients[\s\S]*?(?=##|$)/i);
  if (!ingredientsMatch) return;

  const ingredientsSection = ingredientsMatch[0];

  for (const { pattern, suggestion } of VOLUME_MEASUREMENTS) {
    const match = ingredientsSection.match(pattern);
    if (match) {
      warnings.push(`${relPath}: Volume measurement '${match[0]}' found. ${suggestion}`);
    }
  }
}

/**
 * Check protocol has required sections
 */
function checkProtocolSections(content, relPath) {
  const requiredSections = [
    { name: 'Ingredients', pattern: /##\s*Ingredients/i },
    { name: 'Instructions/Method/Steps', pattern: /##\s*(Instructions|Method|Steps)/i },
  ];

  for (const { name, pattern } of requiredSections) {
    if (!pattern.test(content)) {
      warnings.push(`${relPath}: Missing '${name}' section`);
    }
  }

  // Check for success criteria
  if (!/success\s*criteria|done\s*when|ready\s*when/i.test(content)) {
    warnings.push(`${relPath}: Consider adding success criteria (what "done" looks like)`);
  }
}

/**
 * Check for bitter preparations (aversion)
 */
function checkBitterPreparations(content, relPath) {
  const bitterPatterns = [
    /\bbitter\s+greens?\b/i,
    /\bradicchio\b/i,
    /\bendive\b/i,
    /\bescarole\b/i,
    /\bcharred.*bitter\b/i,
  ];

  for (const pattern of bitterPatterns) {
    const match = content.match(pattern);
    if (match) {
      warnings.push(`${relPath}: Contains potentially bitter ingredient '${match[0]}' (user aversion)`);
    }
  }
}

/**
 * Check ingredient specificity
 */
function checkIngredientSpecificity(content, relPath, isProtocol) {
  if (!isProtocol) return;

  // Check for vague salt specification
  if (/\bsalt\b/i.test(content) && !/diamond\s*crystal|morton|kosher\s*salt/i.test(content)) {
    warnings.push(`${relPath}: Specify salt type (e.g., 'kosher salt (Diamond Crystal)')`);
  }
}

/**
 * Validate protocol files
 */
function lintProtocols() {
  const protocolsDir = join(ROOT, '01_protocols');
  const files = getMarkdownFiles(protocolsDir);

  console.log(colors.cyan('\n🍳 Linting Protocols...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const content = readFileSync(file, 'utf-8');

    try {
      const { content: body } = matter(content);

      checkForbiddenIngredients(body, relPath);
      checkMeasurements(body, relPath, true);
      checkProtocolSections(body, relPath);
      checkBitterPreparations(body, relPath);
      checkIngredientSpecificity(body, relPath, true);
    } catch (e) {
      errors.push(`${relPath}: Failed to parse - ${e.message}`);
    }
  }

  console.log(colors.dim(`  Linted ${files.length} protocol files`));
}

/**
 * Validate dishes
 */
function lintDishes() {
  const dishesDir = join(ROOT, '06_dishes');
  const files = getMarkdownFiles(dishesDir);

  console.log(colors.cyan('\n🍽️  Linting Dishes...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const content = readFileSync(file, 'utf-8');

    try {
      const { content: body } = matter(content);

      checkForbiddenIngredients(body, relPath);
      checkBitterPreparations(body, relPath);
    } catch (e) {
      errors.push(`${relPath}: Failed to parse - ${e.message}`);
    }
  }

  console.log(colors.dim(`  Linted ${files.length} dish files`));
}

/**
 * Validate meal plans
 */
function lintMealPlans() {
  const plansDir = join(ROOT, '08_meal-plans');
  const files = getMarkdownFiles(plansDir);

  console.log(colors.cyan('\n📅 Linting Meal Plans...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const content = readFileSync(file, 'utf-8');

    try {
      const { content: body } = matter(content);

      checkForbiddenIngredients(body, relPath);
    } catch (e) {
      errors.push(`${relPath}: Failed to parse - ${e.message}`);
    }
  }

  console.log(colors.dim(`  Linted ${files.length} meal plan files`));
}

/**
 * Main linting runner
 */
function main() {
  console.log(colors.cyan('\n═══════════════════════════════════════'));
  console.log(colors.cyan('       Recipe Linting Report'));
  console.log(colors.cyan('═══════════════════════════════════════'));

  lintProtocols();
  lintDishes();
  lintMealPlans();

  console.log(colors.cyan('\n═══════════════════════════════════════'));
  console.log(colors.cyan('              Summary'));
  console.log(colors.cyan('═══════════════════════════════════════\n'));

  if (warnings.length > 0) {
    console.log(colors.yellow(`⚠️  ${warnings.length} Warnings:\n`));
    warnings.forEach((w) => console.log(colors.yellow(`   • ${w}`)));
    console.log();
  }

  if (errors.length > 0) {
    console.log(colors.red(`❌ ${errors.length} Errors:\n`));
    errors.forEach((e) => console.log(colors.red(`   • ${e}`)));
    console.log();
    process.exit(1);
  }

  if (warnings.length === 0 && errors.length === 0) {
    console.log(colors.green('✅ All recipes linted successfully!\n'));
  } else if (errors.length === 0) {
    console.log(colors.yellow('⚠️  Linting passed with warnings\n'));
  }
}

main();
