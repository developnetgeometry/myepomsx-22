
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
      // Enhanced colors for each status
      case 'draft': return 'bg-gray-500 text-white';
      case 'submitted': return 'bg-blue-500 text-white';
      case 'approved': return 'bg-green-600 text-white';
      case 'rejected': return 'bg-red-500 text-white';
      case 'cancelled': return 'bg-red-500 text-white';
      case 'converted': return 'bg-emerald-500 text-white';
      case 'partial': return 'bg-amber-500 text-white';
      case 'completed': return 'bg-green-600 text-white';
      case 'pending': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
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
      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getVariant()} ${className}`}
    >
      {getLabel()}
    </Badge>
  );
};

export default StatusBadge;
