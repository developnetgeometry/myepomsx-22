
import React from 'react';
import { Badge } from '@/components/ui/badge';

export type PurchasingStatus = 
  | 'draft'
  | 'submitted'
  | 'approved'
  | 'rejected'
  | 'cancelled'
  | 'converted'
  | 'partial'
  | 'completed'
  | 'pending';

interface StatusBadgeProps {
  status: PurchasingStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getVariant = () => {
    switch (status) {
      // Use specific color variants for each status
      case 'draft': return 'status-draft';
      case 'submitted': return 'status-submitted';
      case 'approved': return 'status-approved';
      case 'rejected': return 'status-destructive';
      case 'cancelled': return 'status-destructive';
      case 'converted': return 'status-converted';
      case 'partial': return 'status-warning';
      case 'completed': return 'status-success';
      case 'pending': return 'status-pending';
      default: return 'default';
    }
  };

  const getLabel = () => {
    switch (status) {
      case 'draft': return 'Draft';
      case 'submitted': return 'Submitted';
      case 'approved': return 'Approved';
      case 'rejected': return 'Rejected';
      case 'cancelled': return 'Cancelled';
      case 'converted': return 'PO Created';
      case 'partial': return 'Partially Received';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: {
        // Handle the default case safely by ensuring status is a string before using string methods
        const statusStr = String(status); // Convert to string to ensure string methods work
        return statusStr ? statusStr.charAt(0).toUpperCase() + statusStr.slice(1) : 'Unknown';
      }
    }
  };

  return (
    <Badge 
      variant={getVariant()} 
      className={className}
    >
      {getLabel()}
    </Badge>
  );
};

export default StatusBadge;
