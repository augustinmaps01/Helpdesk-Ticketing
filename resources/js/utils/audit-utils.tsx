import React from 'react';
import { SeverityType, BadgeVariant, AuditLogEntry } from '@/types/audit-trail';
import { 
    Ticket, 
    User, 
    Settings, 
    TrendingUp, 
    CheckCircle, 
    RefreshCw, 
    Shield, 
    FileText, 
    AlertTriangle, 
    FolderKanban,
    XCircle,
    Info,
    Monitor,
    Smartphone
} from 'lucide-react';

export const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'error':
            return <XCircle className="w-4 h-4 text-red-500" />;
        case 'warning':
            return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        case 'info':
        default:
            return <Info className="w-4 h-4 text-blue-500" />;
    }
};

export const getSeverityBadgeVariant = (severity: string): BadgeVariant => {
    switch (severity.toLowerCase()) {
        case 'error':
            return 'destructive';
        case 'warning':
            return 'outline';
        case 'info':
        default:
            return 'outline';
    }
};

export const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('ticket created') || action.toLowerCase().includes('ticket submitted')) return <Ticket className="w-4 h-4 text-green-600" />;
    if (action.toLowerCase().includes('ticket assigned') || action.toLowerCase().includes('assignment')) return <User className="w-4 h-4 text-blue-600" />;
    if (action.toLowerCase().includes('ticket status') || action.toLowerCase().includes('status updated')) return <Settings className="w-4 h-4 text-orange-600" />;
    if (action.toLowerCase().includes('ticket priority') || action.toLowerCase().includes('priority')) return <TrendingUp className="w-4 h-4 text-red-600" />;
    if (action.toLowerCase().includes('ticket closed') || action.toLowerCase().includes('ticket resolved')) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (action.toLowerCase().includes('ticket reopened')) return <RefreshCw className="w-4 h-4 text-yellow-600" />;
    if (action.toLowerCase().includes('ticket approval') || action.toLowerCase().includes('approved')) return <Shield className="w-4 h-4 text-purple-600" />;
    if (action.toLowerCase().includes('comment') || action.toLowerCase().includes('note')) return <FileText className="w-4 h-4 text-gray-600" />;
    if (action.toLowerCase().includes('emergency') || action.toLowerCase().includes('urgent')) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    if (action.toLowerCase().includes('category') || action.toLowerCase().includes('classification')) return <FolderKanban className="w-4 h-4 text-indigo-600" />;
    return <Ticket className="w-4 h-4 text-gray-600" />;
};

export const getDeviceIcon = (userAgent: string) => {
    if (userAgent.includes('Mobile') || userAgent.includes('Android') || userAgent.includes('iPhone')) {
        return <Smartphone className="w-4 h-4" />;
    }
    return <Monitor className="w-4 h-4" />;
};

export const filterAuditLogs = (
    logs: AuditLogEntry[], 
    searchTerm: string, 
    severityFilter: string, 
    actionFilter: string, 
    dateFilter: string,
    customDateStart: string,
    customDateEnd: string
): AuditLogEntry[] => {
    return logs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = severityFilter === 'all' || log.severity.toLowerCase() === severityFilter;
        const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
        
        // Date filtering
        const logDate = new Date(log.timestamp);
        const now = new Date();
        let matchesDate = true;
        
        if (dateFilter === 'today') {
            matchesDate = logDate.toDateString() === now.toDateString();
        } else if (dateFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= weekAgo;
        } else if (dateFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= monthAgo;
        } else if (dateFilter === 'quarter') {
            const quarterAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= quarterAgo;
        } else if (dateFilter === 'year') {
            const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
            matchesDate = logDate >= yearAgo;
        } else if (dateFilter === 'january') {
            matchesDate = logDate.getMonth() === 0 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'february') {
            matchesDate = logDate.getMonth() === 1 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'march') {
            matchesDate = logDate.getMonth() === 2 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'april') {
            matchesDate = logDate.getMonth() === 3 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'may') {
            matchesDate = logDate.getMonth() === 4 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'june') {
            matchesDate = logDate.getMonth() === 5 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'july') {
            matchesDate = logDate.getMonth() === 6 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'august') {
            matchesDate = logDate.getMonth() === 7 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'september') {
            matchesDate = logDate.getMonth() === 8 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'october') {
            matchesDate = logDate.getMonth() === 9 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'november') {
            matchesDate = logDate.getMonth() === 10 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'december') {
            matchesDate = logDate.getMonth() === 11 && logDate.getFullYear() === now.getFullYear();
        } else if (dateFilter === 'custom' && customDateStart && customDateEnd) {
            const startDate = new Date(customDateStart);
            const endDate = new Date(customDateEnd);
            endDate.setHours(23, 59, 59, 999); // Include the entire end date
            matchesDate = logDate >= startDate && logDate <= endDate;
        }
        
        return matchesSearch && matchesSeverity && matchesAction && matchesDate;
    });
};

export const sortAuditLogs = (
    logs: AuditLogEntry[], 
    sortField: string, 
    sortDirection: 'asc' | 'desc'
): AuditLogEntry[] => {
    return [...logs].sort((a, b) => {
        let aValue = a[sortField as keyof AuditLogEntry];
        let bValue = b[sortField as keyof AuditLogEntry];
        
        if (sortField === 'timestamp') {
            aValue = new Date(a.timestamp).getTime();
            bValue = new Date(b.timestamp).getTime();
        }
        
        if (sortDirection === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
    });
};

export const paginateArray = <T,>(array: T[], page: number, itemsPerPage: number): T[] => {
    return array.slice((page - 1) * itemsPerPage, page * itemsPerPage);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number): number => {
    return Math.ceil(totalItems / itemsPerPage);
};