/**
 * Component utility functions
 * Extracted logic for testability
 */

export type BadgeVariant = 'stable' | 'beta' | 'wip' | 'draft';
export type ProtocolStatus = 'stable' | 'beta' | 'wip' | 'draft';

/**
 * Generates the CSS class for a badge based on its variant
 */
export function getBadgeClass(variant: BadgeVariant = 'draft'): string {
  return `badge badge-${variant}`;
}

/**
 * Generates the CSS class for a status badge on RecipeCard
 */
export function getStatusClass(status: ProtocolStatus | undefined): string {
  return status ? `badge-${status}` : '';
}

/**
 * Determines if a tag array should be rendered
 */
export function shouldShowTags(tags: string[] | undefined): boolean {
  return Array.isArray(tags) && tags.length > 0;
}

/**
 * Formats a tag for display (removes # prefix if present)
 */
export function formatTag(tag: string): string {
  return tag.startsWith('#') ? tag : `#${tag}`;
}

/**
 * Generates card metadata items from optional fields
 */
export function getCardMetaItems(options: {
  category?: string;
  prepTime?: string;
  cookTime?: string;
}): string[] {
  const items: string[] = [];
  if (options.category) items.push(options.category);
  if (options.prepTime) items.push(`Prep: ${options.prepTime}`);
  if (options.cookTime) items.push(`Cook: ${options.cookTime}`);
  return items;
}

/**
 * Validates RecipeCard props
 */
export interface RecipeCardProps {
  title: string;
  href: string;
  description?: string;
  category?: string;
  tags?: string[];
  version?: string;
  status?: ProtocolStatus;
  prepTime?: string;
  cookTime?: string;
}

export function validateRecipeCardProps(props: Partial<RecipeCardProps>): string[] {
  const errors: string[] = [];
  if (!props.title) errors.push('title is required');
  if (!props.href) errors.push('href is required');
  if (props.href && !props.href.startsWith('/') && !props.href.startsWith('http')) {
    errors.push('href should be an absolute path or URL');
  }
  return errors;
}
