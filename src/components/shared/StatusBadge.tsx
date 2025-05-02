
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'critical' | 'warning' | 'normal' | 'high' | 'medium' | 'low';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const lowercaseStatus = status?.toLowerCase() || '';
  
  // Health status with colored dot indicator
  if (lowercaseStatus === 'good' || lowercaseStatus === 'excellent') {
    return (
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
        <span className={cn('text-sm text-gray-800 font-medium', className)}>
          {status}
        </span>
      </div>
    );
  }
  
  if (lowercaseStatus === 'fair') {
    return (
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
        <span className={cn('text-sm text-gray-800 font-medium', className)}>
          {status}
        </span>
      </div>
    );
  }
  
  if (lowercaseStatus === 'poor' || lowercaseStatus === 'needs attention') {
    return (
      <div className="flex items-center">
        <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
        <span className={cn('text-sm text-gray-800 font-medium', className)}>
          {status}
        </span>
      </div>
    );
  }
  
  // Regular status badges
  const getStatusClass = (status: string) => {    
    if (lowercaseStatus.includes('operational') || lowercaseStatus === 'active' || lowercaseStatus.includes('completed') || lowercaseStatus === 'normal' || lowercaseStatus === 'good') {
      return 'bg-green-50 text-green-800 border-green-100';
    }
    
    if (lowercaseStatus === 'critical') {
      return 'bg-red-50 text-red-800 border-red-100';
    }
    
    if (lowercaseStatus.includes('under maintenance')) {
      return 'bg-yellow-50 text-yellow-800 border-yellow-100';
    }
    
    if (lowercaseStatus.includes('scheduled maintenance')) {
      return 'bg-blue-50 text-blue-800 border-blue-100';
    }
    
    if (lowercaseStatus === 'high') {
      return 'bg-amber-50 text-amber-800 border-amber-100';
    }
    
    if (lowercaseStatus === 'medium') {
      return 'bg-blue-50 text-blue-800 border-blue-100';
    }
    
    if (lowercaseStatus === 'low') {
      return 'bg-slate-50 text-slate-800 border-slate-100';
    }
    
    if (lowercaseStatus.includes('inactive') || lowercaseStatus === 'cancelled' || lowercaseStatus === 'closed') {
      return 'bg-gray-50 text-gray-800 border-gray-100';
    }
    
    if (lowercaseStatus.includes('pending') || lowercaseStatus.includes('in progress') || lowercaseStatus === 'warning') {
      return 'bg-yellow-50 text-yellow-800 border-yellow-100';
    }
    
    return 'bg-gray-50 text-gray-800 border-gray-100';
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        getStatusClass(status),
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
