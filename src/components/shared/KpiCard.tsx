
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from '@/lib/utils';

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  change?: number;
  changeLabel?: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  positiveChange?: 'up' | 'down';
  className?: string;
}

const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  icon,
  change,
  changeLabel,
  changeDirection,
  positiveChange = 'up',
  className
}) => {
  const getChangeColor = () => {
    if (!changeDirection) return 'text-gray-500';
    
    const isPositive = changeDirection === positiveChange;
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className={cn("bg-white rounded-lg border border-gray-200 p-6 shadow-sm", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {(typeof change !== 'undefined' || changeLabel) && (
            <div className="flex items-center mt-2">
              {changeDirection && (
                <span className={cn("inline-flex mr-1", getChangeColor())}>
                  {changeDirection === 'up' ? (
                    <ArrowUpIcon className="h-4 w-4" />
                  ) : changeDirection === 'down' ? (
                    <ArrowDownIcon className="h-4 w-4" />
                  ) : null}
                </span>
              )}
              {typeof change !== 'undefined' && (
                <span className={cn("text-sm font-medium", getChangeColor())}>
                  {change}%
                </span>
              )}
              {changeLabel && (
                <span className="text-sm text-gray-500 ml-1">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        
        {icon && (
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
