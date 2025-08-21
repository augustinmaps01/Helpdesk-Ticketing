export interface AuditLogChange {
    old: unknown;
    new: unknown;
}

export interface AuditLogEntry {
    id: number;
    action: string;
    entity: string;
    entity_id: string;
    ticket_no?: string;
    user: string;
    user_id: number;
    user_role?: string;
    user_department?: string;
    assigned_to?: string | null;
    details: string;
    ip_address: string;
    user_agent: string;
    severity: 'info' | 'warning' | 'error';
    timestamp: string;
    changes: Record<string, AuditLogChange>;
}

export interface FilterState {
    searchTerm: string;
    severityFilter: string;
    actionFilter: string;
    dateFilter: string;
    customDateStart: string;
    customDateEnd: string;
}

export interface PaginationState {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}

export interface SortState {
    field: keyof AuditLogEntry;
    direction: 'asc' | 'desc';
}

export type SeverityType = 'info' | 'warning' | 'error';
export type BadgeVariant = 'default' | 'outline' | 'destructive' | 'secondary';
