import React from 'react';
import { Badge } from '@/components/ui/badge';
import { TicketStatus, TicketPriority } from '@/types/ticket';
import {
    Clock,
    AlertTriangle,
    CheckCircle,
    XCircle,
    User,
} from 'lucide-react';

// Color utilities for PDF/Print exports
export const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return { r: 251, g: 191, b: 36 }; // yellow-500
        case 'approved': return { r: 147, g: 197, b: 253 }; // blue-300
        case 'in_progress': return { r: 59, g: 130, b: 246 }; // blue-500
        case 'resolved': return { r: 34, g: 197, b: 94 }; // green-500
        case 'closed': return { r: 107, g: 114, b: 128 }; // gray-500
        case 'rejected': return { r: 239, g: 68, b: 68 }; // red-500
        default: return { r: 107, g: 114, b: 128 }; // gray-500
    }
};

export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'critical': return { r: 220, g: 38, b: 127 }; // pink-600
        case 'high': return { r: 239, g: 68, b: 68 }; // red-500
        case 'medium': return { r: 251, g: 191, b: 36 }; // yellow-500
        case 'low': return { r: 34, g: 197, b: 94 }; // green-500
        default: return { r: 107, g: 114, b: 128 }; // gray-500
    }
};

// CSS class utilities
export const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'approved':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'resolved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'closed':
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        case 'rejected':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
};

export const getPriorityBadgeClasses = (priority: string) => {
    switch (priority) {
        case 'critical':
            return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
        case 'high':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'low':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
};

// Icon utilities
export const getStatusIcon = (status: TicketStatus) => {
    switch (status) {
        case 'pending':
            return <Clock className="w-4 h-4" />;
        case 'approved':
            return <CheckCircle className="w-4 h-4" />;
        case 'in_progress':
            return <User className="w-4 h-4" />;
        case 'resolved':
            return <CheckCircle className="w-4 h-4" />;
        case 'closed':
            return <XCircle className="w-4 h-4" />;
        case 'rejected':
            return <XCircle className="w-4 h-4" />;
        default:
            return <Clock className="w-4 h-4" />;
    }
};

export const getPriorityIcon = (priority: TicketPriority) => {
    switch (priority) {
        case 'critical':
            return <AlertTriangle className="w-4 h-4" />;
        case 'high':
            return <AlertTriangle className="w-4 h-4" />;
        case 'medium':
            return <Clock className="w-4 h-4" />;
        case 'low':
            return <CheckCircle className="w-4 h-4" />;
        default:
            return <Clock className="w-4 h-4" />;
    }
};

// Badge variant utilities
export const getStatusBadgeVariant = (status: TicketStatus): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
        case 'pending':
            return 'secondary';
        case 'approved':
            return 'default';
        case 'in_progress':
            return 'default';
        case 'resolved':
            return 'default';
        case 'closed':
            return 'outline';
        case 'rejected':
            return 'destructive';
        default:
            return 'outline';
    }
};

export const getPriorityBadgeVariant = (priority: TicketPriority): "default" | "secondary" | "destructive" | "outline" => {
    switch (priority) {
        case 'critical':
            return 'destructive';
        case 'high':
            return 'destructive';
        case 'medium':
            return 'secondary';
        case 'low':
            return 'default';
        default:
            return 'outline';
    }
};

// React component utilities
export const getStatusBadge = (status: TicketStatus) => {
    return (
        <Badge variant={getStatusBadgeVariant(status)} className={getStatusBadgeClasses(status)}>
            <div className="flex items-center gap-1">
                {getStatusIcon(status)}
                <span className="capitalize">{status.replace('_', ' ')}</span>
            </div>
        </Badge>
    );
};

export const getPriorityBadge = (priority: TicketPriority) => {
    return (
        <Badge variant={getPriorityBadgeVariant(priority)} className={getPriorityBadgeClasses(priority)}>
            <div className="flex items-center gap-1">
                {getPriorityIcon(priority)}
                <span className="capitalize">{priority}</span>
            </div>
        </Badge>
    );
};

// Utility functions
export const formatTicketDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const getTicketAge = (createdAt: string): string => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now.getTime() - created.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        return diffHours === 0 ? 'Just now' : `${diffHours}h ago`;
    } else if (diffDays === 1) {
        return '1 day ago';
    } else {
        return `${diffDays} days ago`;
    }
};

export const getTicketStatusText = (status: TicketStatus): string => {
    switch (status) {
        case 'pending': return 'Pending Approval';
        case 'approved': return 'Approved';
        case 'in_progress': return 'In Progress';
        case 'resolved': return 'Resolved';
        case 'closed': return 'Closed';
        case 'rejected': return 'Rejected';
        default: return status;
    }
};

export const getTicketPriorityText = (priority: TicketPriority): string => {
    switch (priority) {
        case 'critical': return 'Critical';
        case 'high': return 'High';
        case 'medium': return 'Medium';
        case 'low': return 'Low';
        default: return priority;
    }
};