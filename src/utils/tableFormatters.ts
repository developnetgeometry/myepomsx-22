
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
 * Create a linked entity formatter for displaying related data
 */
export const createLinkedEntityFormatter = (value: any, label: string | null | undefined) => {
  if (!value) return '-';
  if (!label) return value;
  return (
    <div className="flex flex-col">
      <span className="font-medium">{label}</span>
      <span className="text-xs text-gray-500">{value}</span>
    </div>
  );
};
