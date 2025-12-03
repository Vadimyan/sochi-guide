/**
 * Get the base path for the application
 * Returns /sochi-guide for production (GitHub Pages)
 * Returns empty string for development
 */
export const basePath = process.env.NODE_ENV === 'production' ? '/sochi-guide' : '';

/**
 * Add base path to an image URL
 * Handles both absolute and relative paths
 */
export function getImagePath(path: string): string {
  if (!path) return path;

  // If path already includes the basePath, return as is
  if (path.startsWith(basePath)) {
    return path;
  }

  // If path is absolute (starts with /), add basePath
  if (path.startsWith('/')) {
    return `${basePath}${path}`;
  }

  // If relative path, add basePath and /
  return `${basePath}/${path}`;
}
