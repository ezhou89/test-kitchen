#!/usr/bin/env node

/**
 * Content Validation Script
 *
 * Validates markdown content files for:
 * - Required frontmatter fields
 * - Proper date formats
 * - Valid file naming conventions
 * - Link integrity
 */

import { readFileSync, readdirSync, existsSync, statSync } from 'fs';
import { join, dirname, relative, basename } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');

// Validation results
const errors = [];
const warnings = [];

// Color helpers for terminal output
const colors = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

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
 * Validate date format (YYYY-MM-DD)
 */
function isValidDateFormat(date) {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

/**
 * Validate run filename convention
 */
function isValidRunFilename(filename) {
  return /__run-\d+\.md$/.test(filename);
}

/**
 * Check if a relative link resolves to an existing file
 */
function checkLink(link, fromFile) {
  // Skip external links and anchors
  if (link.startsWith('http') || link.startsWith('#')) return true;

  const fromDir = dirname(fromFile);
  const targetPath = join(fromDir, link.replace(/#.*$/, ''));

  return existsSync(targetPath);
}

/**
 * Extract markdown links from content
 */
function extractLinks(content) {
  const linkRegex = /\[([^\]]*)\]\(([^)]+)\)/g;
  const links = [];
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    links.push({ text: match[1], href: match[2] });
  }
  return links;
}

/**
 * Validate protocol files
 */
function validateProtocols() {
  const protocolsDir = join(ROOT, '01_protocols');
  const files = getMarkdownFiles(protocolsDir);

  console.log(colors.cyan('\n📋 Validating Protocols...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const content = readFileSync(file, 'utf-8');

    try {
      const { data: frontmatter, content: body } = matter(content);

      // Check required fields
      if (!frontmatter.category) {
        warnings.push(`${relPath}: Missing 'category' field in frontmatter`);
      }

      if (!frontmatter.version) {
        warnings.push(`${relPath}: Missing 'version' field in frontmatter`);
      }

      // Check for H1 title
      if (!/^#\s+.+$/m.test(body)) {
        errors.push(`${relPath}: Missing H1 title heading`);
      }

      // Check filename convention (lowercase, hyphens)
      const filename = basename(file);
      if (filename !== filename.toLowerCase()) {
        errors.push(`${relPath}: Filename should be lowercase`);
      }
      if (/\s/.test(filename)) {
        errors.push(`${relPath}: Filename should not contain spaces`);
      }

      // Check links
      const links = extractLinks(body);
      for (const link of links) {
        if (!checkLink(link.href, file)) {
          warnings.push(`${relPath}: Broken link to '${link.href}'`);
        }
      }
    } catch (e) {
      errors.push(`${relPath}: Failed to parse frontmatter - ${e.message}`);
    }
  }

  console.log(colors.dim(`  Checked ${files.length} protocol files`));
}

/**
 * Validate run files
 */
function validateRuns() {
  const runsDir = join(ROOT, '02_runs');
  const files = getMarkdownFiles(runsDir);

  console.log(colors.cyan('\n🏃 Validating Runs...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const filename = basename(file);
    const content = readFileSync(file, 'utf-8');

    try {
      const { data: frontmatter } = matter(content);

      // Check run filename convention
      if (!isValidRunFilename(filename)) {
        warnings.push(`${relPath}: Run filename should match pattern '<protocol>__run-NN.md'`);
      }

      // Check date field
      if (!frontmatter.date) {
        errors.push(`${relPath}: Missing 'date' field in frontmatter`);
      } else if (!isValidDateFormat(frontmatter.date)) {
        errors.push(`${relPath}: Invalid date format '${frontmatter.date}' (expected YYYY-MM-DD)`);
      }

      // Check protocol link
      if (!frontmatter['protocol used']) {
        warnings.push(`${relPath}: Missing 'protocol used' field in frontmatter`);
      }

      // Check directory structure matches date
      const pathParts = relPath.split('/');
      if (pathParts.length >= 3) {
        const yearDir = pathParts[1];
        const dateDir = pathParts[2];
        if (frontmatter.date && !dateDir.includes(frontmatter.date)) {
          warnings.push(`${relPath}: Directory '${dateDir}' doesn't match date '${frontmatter.date}'`);
        }
      }
    } catch (e) {
      errors.push(`${relPath}: Failed to parse frontmatter - ${e.message}`);
    }
  }

  console.log(colors.dim(`  Checked ${files.length} run files`));
}

/**
 * Validate series files
 */
function validateSeries() {
  const seriesDir = join(ROOT, '03_series');
  if (!existsSync(seriesDir)) return;

  const entries = readdirSync(seriesDir, { withFileTypes: true });
  const seriesDirs = entries.filter((e) => e.isDirectory());

  console.log(colors.cyan('\n🔬 Validating Series...\n'));

  for (const dir of seriesDirs) {
    const seriesPath = join(seriesDir, dir.name);
    const relPath = relative(ROOT, seriesPath);

    // Check for required files
    const requiredFiles = ['series-brief.md', 'run-log.md', 'conclusions.md'];
    for (const reqFile of requiredFiles) {
      if (!existsSync(join(seriesPath, reqFile))) {
        warnings.push(`${relPath}: Missing required file '${reqFile}'`);
      }
    }

    // Check for runs subdirectory
    if (!existsSync(join(seriesPath, 'runs'))) {
      warnings.push(`${relPath}: Missing 'runs/' subdirectory`);
    }
  }

  console.log(colors.dim(`  Checked ${seriesDirs.length} series directories`));
}

/**
 * Validate meal plans
 */
function validateMealPlans() {
  const plansDir = join(ROOT, '08_meal-plans');
  const files = getMarkdownFiles(plansDir);

  console.log(colors.cyan('\n📅 Validating Meal Plans...\n'));

  for (const file of files) {
    const relPath = relative(ROOT, file);
    const filename = basename(file);

    // Check naming convention: YYYY-wNN_<goal-name>.md
    if (!/^\d{4}-w\d{2}_[a-z0-9-]+\.md$/.test(filename)) {
      warnings.push(`${relPath}: Filename should match pattern 'YYYY-wNN_<goal-name>.md'`);
    }
  }

  console.log(colors.dim(`  Checked ${files.length} meal plan files`));
}

/**
 * Main validation runner
 */
function main() {
  console.log(colors.cyan('\n═══════════════════════════════════════'));
  console.log(colors.cyan('       Content Validation Report'));
  console.log(colors.cyan('═══════════════════════════════════════'));

  validateProtocols();
  validateRuns();
  validateSeries();
  validateMealPlans();

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
    console.log(colors.green('✅ All content validated successfully!\n'));
  } else if (errors.length === 0) {
    console.log(colors.yellow('⚠️  Validation passed with warnings\n'));
  }
}

main();
