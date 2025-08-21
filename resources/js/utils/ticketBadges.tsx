import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { STATUS_CONFIG, PRIORITY_CONFIG, type TicketStatus, type TicketPriority } from './ticketConstants';

export const getStatusBadge = (status: string) => {
    const config = STATUS_CONFIG[status as TicketStatus] || STATUS_CONFIG.pending;
    const IconComponent = config.icon;

    return (
        <Badge className={`${config.color} flex items-center gap-1`}>
            <IconComponent className="w-3 h-3" />
            {status.replace('_', ' ').toUpperCase()}
        </Badge>
    );
};

export const getPriorityBadge = (priority: string) => {
    const config = PRIORITY_CONFIG[priority as TicketPriority] || PRIORITY_CONFIG.medium;

    return (
        <Badge className={config.color}>
            <AlertTriangle className="w-3 h-3 mr-1" />
            {priority.toUpperCase()}
        </Badge>
    );
};

export const getStatusBadgeClasses = (status: string): string => {
    const config = STATUS_CONFIG[status as TicketStatus] || STATUS_CONFIG.pending;
    return config.color;
};

export const getPriorityBadgeClasses = (priority: string): string => {
    const config = PRIORITY_CONFIG[priority as TicketPriority] || PRIORITY_CONFIG.medium;
    return config.color;
};

export const getStatusColor = (status: string) => {
    const config = STATUS_CONFIG[status as TicketStatus] || STATUS_CONFIG.pending;
    return config.rgb;
};

export const getPriorityColor = (priority: string) => {
    const config = PRIORITY_CONFIG[priority as TicketPriority] || PRIORITY_CONFIG.medium;
    return config.rgb;
};