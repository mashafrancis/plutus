/**
 * Utility function for combining class names
 * Replace with your preferred utility (e.g., clsx, classnames, or tailwind-merge)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

