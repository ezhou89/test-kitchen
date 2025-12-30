import { describe, it, expect } from 'vitest';
import {
  getBadgeClass,
  getStatusClass,
  shouldShowTags,
  formatTag,
  getCardMetaItems,
  validateRecipeCardProps,
} from './components';

describe('getBadgeClass', () => {
  it('returns correct class for stable variant', () => {
    expect(getBadgeClass('stable')).toBe('badge badge-stable');
  });

  it('returns correct class for beta variant', () => {
    expect(getBadgeClass('beta')).toBe('badge badge-beta');
  });

  it('returns correct class for wip variant', () => {
    expect(getBadgeClass('wip')).toBe('badge badge-wip');
  });

  it('returns draft class as default', () => {
    expect(getBadgeClass()).toBe('badge badge-draft');
    expect(getBadgeClass('draft')).toBe('badge badge-draft');
  });
});

describe('getStatusClass', () => {
  it('returns status class when status provided', () => {
    expect(getStatusClass('stable')).toBe('badge-stable');
    expect(getStatusClass('beta')).toBe('badge-beta');
  });

  it('returns empty string when status is undefined', () => {
    expect(getStatusClass(undefined)).toBe('');
  });
});

describe('shouldShowTags', () => {
  it('returns true for non-empty tag array', () => {
    expect(shouldShowTags(['tag1', 'tag2'])).toBe(true);
    expect(shouldShowTags(['single'])).toBe(true);
  });

  it('returns false for empty array', () => {
    expect(shouldShowTags([])).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(shouldShowTags(undefined)).toBe(false);
  });
});

describe('formatTag', () => {
  it('adds # prefix when not present', () => {
    expect(formatTag('weeknight')).toBe('#weeknight');
  });

  it('keeps # prefix when already present', () => {
    expect(formatTag('#weeknight')).toBe('#weeknight');
  });

  it('handles empty string', () => {
    expect(formatTag('')).toBe('#');
  });
});

describe('getCardMetaItems', () => {
  it('returns all items when all provided', () => {
    const items = getCardMetaItems({
      category: 'proteins',
      prepTime: '10 min',
      cookTime: '30 min',
    });
    expect(items).toEqual(['proteins', 'Prep: 10 min', 'Cook: 30 min']);
  });

  it('returns only provided items', () => {
    expect(getCardMetaItems({ category: 'sauces' })).toEqual(['sauces']);
    expect(getCardMetaItems({ prepTime: '5 min' })).toEqual(['Prep: 5 min']);
    expect(getCardMetaItems({ cookTime: '1 hr' })).toEqual(['Cook: 1 hr']);
  });

  it('returns empty array when no items provided', () => {
    expect(getCardMetaItems({})).toEqual([]);
  });

  it('preserves order: category, prep, cook', () => {
    const items = getCardMetaItems({
      cookTime: '30 min',
      category: 'proteins',
      prepTime: '10 min',
    });
    expect(items).toEqual(['proteins', 'Prep: 10 min', 'Cook: 30 min']);
  });
});

describe('validateRecipeCardProps', () => {
  it('returns no errors for valid props', () => {
    const errors = validateRecipeCardProps({
      title: 'Chicken Thighs',
      href: '/protocols/chicken-thighs/',
    });
    expect(errors).toEqual([]);
  });

  it('returns error for missing title', () => {
    const errors = validateRecipeCardProps({
      href: '/protocols/test/',
    });
    expect(errors).toContain('title is required');
  });

  it('returns error for missing href', () => {
    const errors = validateRecipeCardProps({
      title: 'Test Recipe',
    });
    expect(errors).toContain('href is required');
  });

  it('returns error for relative href', () => {
    const errors = validateRecipeCardProps({
      title: 'Test',
      href: 'protocols/test/',
    });
    expect(errors).toContain('href should be an absolute path or URL');
  });

  it('accepts http URLs', () => {
    const errors = validateRecipeCardProps({
      title: 'External',
      href: 'https://example.com/recipe',
    });
    expect(errors).toEqual([]);
  });

  it('returns multiple errors when appropriate', () => {
    const errors = validateRecipeCardProps({});
    expect(errors).toContain('title is required');
    expect(errors).toContain('href is required');
  });
});
