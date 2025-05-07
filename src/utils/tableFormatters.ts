
/**
 * Utility functions for formatting data in tables
 */

/**
 * Format a number as Malaysian Ringgit
 */
export const formatRM = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return `RM ${value.toLocaleString('en-MY', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Format a date to a standard readable format
 */
export const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format a date with time
 */
export const formatDateTime = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-';
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleString('en-MY', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Format linked entity data for displaying in tables
 * Returns formatted data that can be used in cell rendering
 */
export const formatLinkedEntity = (value: any, label: string | null | undefined): { 
  value: any;
  label: string | null | undefined;
  hasRelation: boolean;
} => {
  return {
    value: value || '-',
    label: label,
    hasRelation: !!label
  };
};
