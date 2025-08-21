import { useMemo } from 'react';
import { DashboardData } from '@/types/dashboard';
import { DASHBOARD_METRICS, MetricConfig } from '@/config/dashboardMetrics';

export interface ProcessedMetric extends Omit<MetricConfig, 'key' | 'calculatePercentage'> {
  value: number;
  percentage?: number;
}

interface UseDashboardReturn {
  processedMetrics: ProcessedMetric[];
  totalTickets: number;
}

export const useDashboard = (dashboardData: DashboardData): UseDashboardReturn => {
  const { totalTickets } = dashboardData;

  const processedMetrics = useMemo<ProcessedMetric[]>(() => {
    return DASHBOARD_METRICS.map((metric, index) => {
      const value = dashboardData[metric.key];
      let percentage: number | undefined;

      if (metric.calculatePercentage && totalTickets > 0) {
        percentage = Math.round((value / totalTickets) * 100);
      }

      return {
        title: metric.title,
        value,
        badge: metric.badge,
        percentage,
        colors: metric.colors,
        icon: metric.icon,
        description: metric.description,
        linkHref: metric.linkHref,
        linkText: metric.linkText,
      };
    });
  }, [dashboardData, totalTickets]);

  return {
    processedMetrics,
    totalTickets,
  };
};