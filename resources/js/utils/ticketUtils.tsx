import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { type TicketStatus, type TicketPriority } from '@/types/ticket';

export const getStatusBadge = (status: TicketStatus): React.ReactElement => {
    const statusConfig = {
        pending: {
            variant: 'secondary' as const,
            className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            icon: <Clock className="w-3 h-3 mr-1" />,
            text: 'Pending'
        },
        approved: {
            variant: 'default' as const,
            className: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            icon: <CheckCircle className="w-3 h-3 mr-1" />,
            text: 'Approved'
        },
        in_progress: {
            variant: 'default' as const,
            className: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            icon: <Clock className="w-3 h-3 mr-1" />,
            text: 'In Progress'
        },
        resolved: {
            variant: 'default' as const,
            className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            icon: <CheckCircle className="w-3 h-3 mr-1" />,
            text: 'Resolved'
        },
        closed: {
            variant: 'default' as const,
            className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            icon: <XCircle className="w-3 h-3 mr-1" />,
            text: 'Closed'
        },
        rejected: {
            variant: 'destructive' as const,
            className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            icon: <XCircle className="w-3 h-3 mr-1" />,
            text: 'Rejected'
        }
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <Badge variant={config.variant} className={config.className}>
            {config.icon}
            {config.text}
        </Badge>
    );
};

export const getPriorityBadge = (priority: TicketPriority): React.ReactElement => {
    const priorityConfig = {
        low: {
            variant: 'outline' as const,
            className: 'border-green-200 text-green-700 dark:border-green-700 dark:text-green-300',
            icon: null,
            text: 'Low'
        },
        medium: {
            variant: 'outline' as const,
            className: 'border-yellow-200 text-yellow-700 dark:border-yellow-700 dark:text-yellow-300',
            icon: null,
            text: 'Medium'
        },
        high: {
            variant: 'outline' as const,
            className: 'border-orange-200 text-orange-700 dark:border-orange-700 dark:text-orange-300',
            icon: <AlertTriangle className="w-3 h-3 mr-1" />,
            text: 'High'
        },
        critical: {
            variant: 'destructive' as const,
            className: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            icon: <AlertTriangle className="w-3 h-3 mr-1" />,
            text: 'Critical'
        }
    };

    const config = priorityConfig[priority] || priorityConfig.low;

    return (
        <Badge variant={config.variant} className={config.className}>
            {config.icon}
            {config.text}
        </Badge>
    );
};

export const getStatusColor = (status: TicketStatus): string => {
    const colors = {
        pending: 'text-yellow-600 dark:text-yellow-400',
        approved: 'text-blue-600 dark:text-blue-400',
        in_progress: 'text-orange-600 dark:text-orange-400',
        resolved: 'text-green-600 dark:text-green-400',
        closed: 'text-gray-600 dark:text-gray-400',
        rejected: 'text-red-600 dark:text-red-400'
    };
    return colors[status] || colors.pending;
};

export const getPriorityColor = (priority: TicketPriority): string => {
    const colors = {
        low: 'text-green-600 dark:text-green-400',
        medium: 'text-yellow-600 dark:text-yellow-400',
        high: 'text-orange-600 dark:text-orange-400',
        critical: 'text-red-600 dark:text-red-400'
    };
    return colors[priority] || colors.low;
};