import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  badge?: {
    text: string;
    icon: LucideIcon;
  };
  percentage?: number;
  totalValue: number;
  colors: {
    gradient: string;
    iconBg: string;
    iconColor: string;
    progressGradient: string;
    linkColor: string;
    linkHoverColor: string;
  };
  icon: LucideIcon;
  description: string;
  linkHref: string;
  linkText: string;
  delay: number;
}

export const MetricCard = React.memo<MetricCardProps>(({
  title,
  value,
  badge,
  percentage,
  totalValue,
  colors,
  icon: Icon,
  description,
  linkHref,
  linkText,
  delay
}) => {
  const progressWidth = totalValue > 0 ? Math.min((value / totalValue) * 100, 100) : 0;
  const displayPercentage = percentage ?? progressWidth;

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5, scale: 1.02 }}
    >
      <div className={`absolute inset-0 ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      
      <div className="relative space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold text-foreground">{value}</p>
              {badge && (
                <span className={`flex items-center text-xs ${colors.iconColor}`}>
                  <badge.icon className="w-3 h-3 mr-1" />
                  {badge.text}
                </span>
              )}
              {percentage !== undefined && (
                <span className={`flex items-center text-xs ${colors.iconColor}`}>
                  {Math.round(percentage)}%
                </span>
              )}
            </div>
          </div>
          
          <motion.div
            className={`flex h-14 w-14 items-center justify-center rounded-full ${colors.iconBg} border border-opacity-20`}
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Icon className={`h-7 w-7 ${colors.iconColor}`} />
          </motion.div>
        </div>
        
        <div className="w-full bg-muted/50 rounded-full h-2">
          <div 
            className={`${colors.progressGradient} h-2 rounded-full`} 
            style={{ width: `${progressWidth}%` }}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{description}</span>
          <Link
            href={linkHref}
            className={`text-sm ${colors.linkColor} ${colors.linkHoverColor} font-medium group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1`}
          >
            {linkText} →
          </Link>
        </div>
      </div>
    </motion.div>
  );
});