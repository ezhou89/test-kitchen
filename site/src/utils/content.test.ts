import { describe, it, expect } from 'vitest';
import {
  extractTitle,
  parseTags,
  sortCategories,
  groupBy,
  getProtocolStatus,
  isValidDateFormat,
  extractRunNumber,
  isValidRunFilename,
  CATEGORY_ORDER,
} from './content';

describe('extractTitle', () => {
  it('extracts H1 heading from markdown content', () => {
    const content = '# My Recipe Title\n\nSome description here.';
    expect(extractTitle(content, 'fallback')).toBe('My Recipe Title');
  });

  it('returns fallback when no H1 heading exists', () => {
    const content = 'No heading here\n\nJust text.';
    expect(extractTitle(content, 'default-title')).toBe('default-title');
  });

  it('handles empty content', () => {
    expect(extractTitle('', 'fallback')).toBe('fallback');
  });

  it('extracts first H1 when multiple exist', () => {
    const content = '# First Title\n\n## Subtitle\n\n# Second Title';
    expect(extractTitle(content, 'fallback')).toBe('First Title');
  });

  it('ignores H2 and other headings', () => {
    const content = '## Not H1\n\n### Also not H1';
    expect(extractTitle(content, 'fallback')).toBe('fallback');
  });

  it('handles heading with special characters', () => {
    const content = "# Beef & Broccoli — Mom's Recipe";
    expect(extractTitle(content, 'fallback')).toBe("Beef & Broccoli — Mom's Recipe");
  });
});

describe('parseTags', () => {
  it('parses space-separated tags', () => {
    expect(parseTags('#weeknight #low-mess #high-protein')).toEqual([
      'weeknight',
      'low-mess',
      'high-protein',
    ]);
  });

  it('handles tags without # prefix', () => {
    expect(parseTags('weeknight low-mess')).toEqual(['weeknight', 'low-mess']);
  });

  it('handles mixed tags with and without #', () => {
    expect(parseTags('#weeknight low-mess #batch-prep')).toEqual([
      'weeknight',
      'low-mess',
      'batch-prep',
    ]);
  });

  it('returns empty array for undefined input', () => {
    expect(parseTags(undefined)).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(parseTags('')).toEqual([]);
  });

  it('handles multiple spaces between tags', () => {
    expect(parseTags('#tag1    #tag2')).toEqual(['tag1', 'tag2']);
  });

  it('filters out empty strings', () => {
    expect(parseTags('  #tag1  ')).toEqual(['tag1']);
  });
});

describe('sortCategories', () => {
  it('sorts categories according to predefined order', () => {
    const categories = ['starches', 'proteins', 'sauces'];
    expect(sortCategories(categories)).toEqual(['proteins', 'sauces', 'starches']);
  });

  it('places unknown categories at the end alphabetically', () => {
    const categories = ['proteins', 'desserts', 'beverages'];
    expect(sortCategories(categories)).toEqual(['proteins', 'beverages', 'desserts']);
  });

  it('handles empty array', () => {
    expect(sortCategories([])).toEqual([]);
  });

  it('handles all unknown categories', () => {
    const categories = ['zebra', 'apple', 'mango'];
    expect(sortCategories(categories)).toEqual(['apple', 'mango', 'zebra']);
  });

  it('does not mutate original array', () => {
    const original = ['starches', 'proteins'];
    sortCategories(original);
    expect(original).toEqual(['starches', 'proteins']);
  });

  it('handles uncategorized correctly', () => {
    const categories = ['uncategorized', 'proteins'];
    expect(sortCategories(categories)).toEqual(['proteins', 'uncategorized']);
  });
});

describe('CATEGORY_ORDER', () => {
  it('contains expected categories in order', () => {
    expect(CATEGORY_ORDER).toEqual([
      'proteins',
      'sauces',
      'veg-sides',
      'starches',
      'uncategorized',
    ]);
  });
});

describe('groupBy', () => {
  it('groups items by key function', () => {
    const items = [
      { name: 'chicken', category: 'proteins' },
      { name: 'rice', category: 'starches' },
      { name: 'beef', category: 'proteins' },
    ];
    const result = groupBy(items, (item) => item.category);
    expect(result).toEqual({
      proteins: [
        { name: 'chicken', category: 'proteins' },
        { name: 'beef', category: 'proteins' },
      ],
      starches: [{ name: 'rice', category: 'starches' }],
    });
  });

  it('handles empty array', () => {
    expect(groupBy([], (item: { key: string }) => item.key)).toEqual({});
  });

  it('handles single item', () => {
    const items = [{ id: 1, type: 'a' }];
    expect(groupBy(items, (item) => item.type)).toEqual({
      a: [{ id: 1, type: 'a' }],
    });
  });
});

describe('getProtocolStatus', () => {
  it('returns stable for v1.x versions', () => {
    expect(getProtocolStatus('v1.0')).toBe('stable');
    expect(getProtocolStatus('v1.2.3')).toBe('stable');
    expect(getProtocolStatus('v1')).toBe('stable');
  });

  it('returns beta for v0.x versions', () => {
    expect(getProtocolStatus('v0.1')).toBe('beta');
    expect(getProtocolStatus('v0.9')).toBe('beta');
    expect(getProtocolStatus('v0.0.1')).toBe('beta');
  });

  it('returns draft for undefined version', () => {
    expect(getProtocolStatus(undefined)).toBe('draft');
  });

  it('returns wip for other versions', () => {
    expect(getProtocolStatus('v2.0')).toBe('wip');
    expect(getProtocolStatus('wip')).toBe('wip');
    expect(getProtocolStatus('draft')).toBe('wip');
  });
});

describe('isValidDateFormat', () => {
  it('accepts valid YYYY-MM-DD format', () => {
    expect(isValidDateFormat('2025-12-26')).toBe(true);
    expect(isValidDateFormat('2024-01-01')).toBe(true);
  });

  it('rejects invalid formats', () => {
    expect(isValidDateFormat('12-26-2025')).toBe(false);
    expect(isValidDateFormat('2025/12/26')).toBe(false);
    expect(isValidDateFormat('Dec 26, 2025')).toBe(false);
    expect(isValidDateFormat('')).toBe(false);
  });

  it('rejects incomplete dates', () => {
    expect(isValidDateFormat('2025-12')).toBe(false);
    expect(isValidDateFormat('2025')).toBe(false);
  });
});

describe('extractRunNumber', () => {
  it('extracts run number from valid filename', () => {
    expect(extractRunNumber('chicken-thighs__run-01.md')).toBe(1);
    expect(extractRunNumber('recipe__run-15.md')).toBe(15);
    expect(extractRunNumber('complex-name-here__run-99.md')).toBe(99);
  });

  it('returns null for invalid filenames', () => {
    expect(extractRunNumber('recipe.md')).toBeNull();
    expect(extractRunNumber('run-01.md')).toBeNull();
    expect(extractRunNumber('recipe__run-01.txt')).toBeNull();
  });

  it('handles run numbers with leading zeros', () => {
    expect(extractRunNumber('recipe__run-001.md')).toBe(1);
    expect(extractRunNumber('recipe__run-007.md')).toBe(7);
  });
});

describe('isValidRunFilename', () => {
  it('accepts valid run filenames', () => {
    expect(isValidRunFilename('chicken-thighs__run-01.md')).toBe(true);
    expect(isValidRunFilename('recipe__run-123.md')).toBe(true);
  });

  it('rejects invalid filenames', () => {
    expect(isValidRunFilename('recipe.md')).toBe(false);
    expect(isValidRunFilename('recipe_run-01.md')).toBe(false);
    expect(isValidRunFilename('recipe__run-01')).toBe(false);
    expect(isValidRunFilename('recipe__run-.md')).toBe(false);
  });
});
