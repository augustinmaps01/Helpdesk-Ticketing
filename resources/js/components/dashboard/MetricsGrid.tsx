import React from 'react';
import { motion } from 'framer-motion';
import { MetricCard } from './MetricCard';
import { ProcessedMetric } from '@/hooks/useDashboard';

interface MetricsGridProps {
  metrics: ProcessedMetric[];
  totalTickets: number;
}

export const MetricsGrid = React.memo<MetricsGridProps>(({ metrics, totalTickets }) => (
  <motion.div
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
  >
    {metrics.map((metric, index) => (
      <MetricCard
        key={metric.title}
        title={metric.title}
        value={metric.value}
        badge={metric.badge}
        percentage={metric.percentage}
        totalValue={totalTickets}
        colors={metric.colors}
        icon={metric.icon}
        description={metric.description}
        linkHref={metric.linkHref}
        linkText={metric.linkText}
        delay={0.3 + index * 0.1}
      />
    ))}
  </motion.div>
));