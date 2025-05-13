
import React from 'react';
import { cn } from '@/lib/utils';

type StatusType = 'active' | 'inactive' | 'pending' | 'completed' | 'critical' | 'warning' | 'normal' | 'high' | 'medium' | 'low';

interface StatusBadgeProps {
  status: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className, size = 'md' }) => {
  const lowercaseStatus = status?.toLowerCase() || '';
  
  // Health status with colored dot indicator
  if (lowercaseStatus === 'good' || lowercaseStatus === 'excellent') {
    return (
      <div className="flex items-center">
        <div className={cn(
          "rounded-full bg-green-500 mr-2",
          size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-2.5 w-2.5'
        )}></div>
        <span className={cn(
          'text-gray-800 font-medium',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
          className
        )}>
          {status}
        </span>
      </div>
    );
  }
  
  if (lowercaseStatus === 'fair') {
    return (
      <div className="flex items-center">
        <div className={cn(
          "rounded-full bg-yellow-500 mr-2",
          size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-2.5 w-2.5'
        )}></div>
        <span className={cn(
          'text-gray-800 font-medium',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
          className
        )}>
          {status}
        </span>
      </div>
    );
  }
  
  if (lowercaseStatus === 'poor' || lowercaseStatus === 'needs attention') {
    return (
      <div className="flex items-center">
        <div className={cn(
          "rounded-full bg-red-500 mr-2",
          size === 'sm' ? 'h-2 w-2' : size === 'lg' ? 'h-3 w-3' : 'h-2.5 w-2.5'
        )}></div>
        <span className={cn(
          'text-gray-800 font-medium',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm',
          className
        )}>
          {status}
        </span>
      </div>
    );
  }
  
  // Regular status badges
  const getStatusClass = (status: string) => {    
    if (lowercaseStatus.includes('operational') || lowercaseStatus === 'active' || lowercaseStatus.includes('completed') || lowercaseStatus === 'normal' || lowercaseStatus === 'good') {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    
    if (lowercaseStatus === 'critical') {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    
    if (lowercaseStatus.includes('under maintenance')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    
    if (lowercaseStatus.includes('scheduled maintenance')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    
    if (lowercaseStatus === 'high') {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    
    if (lowercaseStatus === 'medium') {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    
    if (lowercaseStatus === 'low') {
      return 'bg-slate-100 text-slate-800 border-slate-200';
    }
    
    if (lowercaseStatus.includes('inactive') || lowercaseStatus === 'cancelled' || lowercaseStatus === 'closed') {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
    
    if (lowercaseStatus.includes('pending') || lowercaseStatus.includes('in progress') || lowercaseStatus === 'warning') {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span 
      className={cn(
        'inline-flex items-center justify-center rounded-full text-xs font-medium border',
        getStatusClass(status),
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 
        size === 'lg' ? 'px-3 py-1 text-base' : 'px-2.5 py-0.5 text-xs',
        className
      )}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
