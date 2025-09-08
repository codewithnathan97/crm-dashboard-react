import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  period?: string;
  icon?: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  trend = 'neutral',
  period,
  icon,
  className = ''
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className={`bg-white rounded-lg p-6 card-shadow hover:card-shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{title}</h3>
        {icon && (
          <div className="p-2 bg-blue-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              {getTrendIcon()}
              <span className={`text-sm font-medium ${getTrendColor()}`}>
                {change > 0 ? '+' : ''}{change}%
              </span>
              {period && (
                <span className="text-sm text-gray-500">{period}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;