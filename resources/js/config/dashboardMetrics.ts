import { TicketIcon, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { DashboardData } from '@/types/dashboard';

export interface MetricConfig {
  key: keyof Pick<DashboardData, 'openTickets' | 'inProgressTickets' | 'closedTickets' | 'pendingTickets'>;
  title: string;
  badge?: {
    text: string;
    icon: typeof AlertTriangle;
  };
  colors: {
    gradient: string;
    iconBg: string;
    iconColor: string;
    progressGradient: string;
    linkColor: string;
    linkHoverColor: string;
  };
  icon: typeof TicketIcon;
  description: string;
  linkHref: string;
  linkText: string;
  calculatePercentage?: boolean;
}

export const DASHBOARD_METRICS: MetricConfig[] = [
  {
    key: 'openTickets',
    title: 'Open Tickets',
    badge: {
      text: 'Urgent',
      icon: AlertTriangle,
    },
    colors: {
      gradient: 'bg-gradient-to-br from-yellow-500/5 to-orange-500/5',
      iconBg: 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/20',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      progressGradient: 'bg-gradient-to-r from-yellow-500 to-orange-500',
      linkColor: 'text-blue-600 dark:text-blue-400',
      linkHoverColor: 'hover:text-blue-700 dark:hover:text-blue-300',
    },
    icon: TicketIcon,
    description: 'Needs Attention',
    linkHref: '/tickets?status=open',
    linkText: 'View',
  },
  {
    key: 'inProgressTickets',
    title: 'In Progress',
    badge: {
      text: 'Active',
      icon: Clock,
    },
    colors: {
      gradient: 'bg-gradient-to-br from-blue-500/5 to-indigo-500/5',
      iconBg: 'bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border-blue-500/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      progressGradient: 'bg-gradient-to-r from-blue-500 to-indigo-500',
      linkColor: 'text-blue-600 dark:text-blue-400',
      linkHoverColor: 'hover:text-blue-700 dark:hover:text-blue-300',
    },
    icon: Clock,
    description: 'Being Worked On',
    linkHref: '/tickets?status=in-progress',
    linkText: 'View',
  },
  {
    key: 'closedTickets',
    title: 'Resolved Tickets',
    colors: {
      gradient: 'bg-gradient-to-br from-green-500/5 to-emerald-500/5',
      iconBg: 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-500/20',
      iconColor: 'text-green-600 dark:text-green-400',
      progressGradient: 'bg-gradient-to-r from-green-500 to-emerald-500',
      linkColor: 'text-green-600 dark:text-green-400',
      linkHoverColor: 'hover:text-green-700 dark:hover:text-green-300',
    },
    icon: CheckCircle,
    description: 'Success Rate',
    linkHref: '/tickets?status=closed',
    linkText: 'View',
    calculatePercentage: true,
  },
  {
    key: 'pendingTickets',
    title: 'Pending Tickets',
    badge: {
      text: 'Awaiting',
      icon: Clock,
    },
    colors: {
      gradient: 'bg-gradient-to-br from-purple-500/5 to-violet-500/5',
      iconBg: 'bg-gradient-to-br from-purple-500/20 to-violet-500/20 border-purple-500/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      progressGradient: 'bg-gradient-to-r from-purple-500 to-violet-500',
      linkColor: 'text-purple-600 dark:text-purple-400',
      linkHoverColor: 'hover:text-purple-700 dark:hover:text-purple-300',
    },
    icon: Clock,
    description: 'Need Review',
    linkHref: '/tickets?status=pending',
    linkText: 'Review',
  },
];