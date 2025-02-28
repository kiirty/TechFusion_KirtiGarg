
import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResultCardProps {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'none';
  confidence?: number;
  recommendations?: string[];
  className?: string;
}

const ResultCard = ({ 
  title, 
  description, 
  severity = 'none', 
  confidence, 
  recommendations = [],
  className 
}: ResultCardProps) => {
  const [expanded, setExpanded] = useState(false);
  
  const getSeverityColor = () => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-900/50';
      case 'medium':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-900/50';
      case 'low':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-900/50';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800/50 dark:text-slate-300 dark:border-slate-700';
    }
  };
  
  const getSeverityIcon = () => {
    switch (severity) {
      case 'high':
        return <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case 'medium':
        return <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />;
      case 'low':
        return <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />;
      default:
        return <Info className="h-5 w-5 text-slate-500 dark:text-slate-400" />;
    }
  };
  
  return (
    <div 
      className={cn(
        "rounded-xl border p-4 transition-all duration-300 overflow-hidden",
        getSeverityColor(),
        expanded ? "shadow-md" : "shadow-sm hover:shadow-md",
        className
      )}
    >
      <div 
        className="flex items-start justify-between cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start space-x-3">
          <div className="mt-0.5">
            {getSeverityIcon()}
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-sm opacity-90 line-clamp-2">{description}</p>
          </div>
        </div>
        
        {confidence !== undefined && (
          <div className="flex flex-col items-end">
            <span className="text-xs uppercase font-medium tracking-wide">Confidence</span>
            <div className="flex items-center mt-1">
              <div className="relative w-16 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden mr-2">
                <div
                  className={cn(
                    "absolute left-0 top-0 bottom-0 rounded-full",
                    confidence > 80 ? "bg-emerald-500" : 
                    confidence > 60 ? "bg-amber-500" : 
                    "bg-red-500"
                  )}
                  style={{ width: `${confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium">{confidence}%</span>
            </div>
          </div>
        )}
      </div>
      
      {expanded && recommendations.length > 0 && (
        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 animate-slide-up">
          <h4 className="text-sm font-medium mb-2">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1">
            {recommendations.map((recommendation, i) => (
              <li key={i} className="text-sm">
                {recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ResultCard;
