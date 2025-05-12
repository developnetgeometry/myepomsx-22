
/**
 * Utility functions for formatting data in tables and forms
 */

/**
 * Format a number as Malaysian Ringgit (RM)
 * @param value The number value to format
 * @returns Formatted string (e.g. RM 1,234.56)
 */
export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return `RM ${value.toLocaleString('en-MY', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

/**
 * Check if a field name or label represents a monetary value
 * @param fieldName The field name or label to check
 * @returns True if the field represents a monetary value
 */
export const isMonetaryField = (fieldName: string): boolean => {
  const monetaryTerms = [
    'price', 'cost', 'amount', 'value', 'penalty', 'budget', 'fee', 
    'charge', 'payment', 'salary', 'wage', 'bonus', 'commission'
  ];
  
  const lowerFieldName = fieldName.toLowerCase();
  return monetaryTerms.some(term => lowerFieldName.includes(term));
};

/**
 * Format a percentage value
 * @param value The number value to format
 * @returns Formatted string with % symbol
 */
export const formatPercentage = (value: number | null | undefined): string => {
  if (value === null || value === undefined) return '-';
  return `${value.toFixed(1)}%`;
};

/**
 * Format a date in Malaysian format (DD/MM/YYYY)
 * @param dateString A valid date string
 * @returns Formatted date string
 */
export const formatDate = (dateString: string | Date | null | undefined): string => {
  if (!dateString) return '-';
  
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  if (isNaN(date.getTime())) return '-';
  
  return date.toLocaleDateString('en-MY', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).replace(/\//g, '/');
};

/**
 * Format a number with specific decimal places
 * @param value The number to format
 * @param decimalPlaces Number of decimal places
 * @returns Formatted number
 */
export const formatNumber = (value: number | null | undefined, decimalPlaces = 2): string => {
  if (value === null || value === undefined) return '-';
  return value.toLocaleString('en-MY', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces
  });
};
