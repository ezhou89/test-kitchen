/**
 * Content utility functions for parsing and transforming recipe data
 */

/**
 * Extracts the title from markdown content by finding the first H1 heading.
 * Falls back to the provided fallback string if no heading is found.
 */
export function extractTitle(content: string, fallback: string): string {
  const match = content.match(/^#\s+(.+)$/m);
  return match?.[1] ?? fallback;
}

/**
 * Parses a space-separated tag string into an array of tag names.
 * Removes leading # from each tag.
 */
export function parseTags(tagString: string | undefined): string[] {
  if (!tagString) return [];
  return tagString
    .split(/\s+/)
    .map((t) => t.replace(/^#/, ''))
    .filter(Boolean);
}

/**
 * Category display order for protocols.
 * Categories not in this list will be sorted alphabetically at the end.
 */
export const CATEGORY_ORDER = [
  'proteins',
  'sauces',
  'veg-sides',
  'starches',
  'uncategorized',
];

/**
 * Sorts category names according to the predefined order.
 * Unknown categories are sorted alphabetically after known ones.
 */
export function sortCategories(categories: string[]): string[] {
  return [...categories].sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a);
    const bIndex = CATEGORY_ORDER.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

/**
 * Groups items by a key extracted from each item.
 */
export function groupBy<T>(
  items: T[],
  keyFn: (item: T) => string
): Record<string, T[]> {
  return items.reduce(
    (acc, item) => {
      const key = keyFn(item);
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/**
 * Determines the status badge for a protocol based on its version.
 */
export function getProtocolStatus(
  version: string | undefined
): 'stable' | 'beta' | 'wip' | 'draft' {
  if (!version) return 'draft';
  if (version.startsWith('v1')) return 'stable';
  if (version.startsWith('v0.')) return 'beta';
  return 'wip';
}

/**
 * Validates a date string is in YYYY-MM-DD format.
 */
export function isValidDateFormat(date: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
}

/**
 * Extracts run number from a run filename (e.g., "recipe__run-03.md" -> 3)
 */
export function extractRunNumber(filename: string): number | null {
  const match = filename.match(/__run-(\d+)\.md$/);
  return match?.[1] ? parseInt(match[1], 10) : null;
}

/**
 * Validates that a filename follows the run naming convention.
 */
export function isValidRunFilename(filename: string): boolean {
  return /__run-\d+\.md$/.test(filename);
}
