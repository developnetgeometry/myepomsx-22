
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'critical' | 'warning' | 'normal' | 'high' | 'medium' | 'low';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const getStatusClass = (status: string) => {
    const lowercaseStatus = status.toLowerCase();
    
    if (lowercaseStatus.includes('active') || lowercaseStatus.includes('completed') || lowercaseStatus === 'normal' || lowercaseStatus === 'good') {
      return 'bg-green-100 text-green-800';
    }
    
    if (lowercaseStatus.includes('inactive') || lowercaseStatus === 'cancelled' || lowercaseStatus === 'closed') {
      return 'bg-gray-100 text-gray-800';
    }
    
    if (lowercaseStatus.includes('pending') || lowercaseStatus.includes('in progress') || lowercaseStatus === 'medium' || lowercaseStatus === 'warning') {
      return 'bg-yellow-100 text-yellow-800';
    }
    
    if (lowercaseStatus.includes('critical') || lowercaseStatus.includes('high') || lowercaseStatus === 'urgent') {
      return 'bg-red-100 text-red-800';
    }
    
    if (lowercaseStatus.includes('low') || lowercaseStatus === 'info') {
      return 'bg-blue-100 text-blue-800';
    }
    
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <span className={cn('status-badge', getStatusClass(status), className)}>
      {status}
    </span>
  );
};

export default StatusBadge;
