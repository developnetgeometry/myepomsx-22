
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
