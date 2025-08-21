export type TicketStatus = 'pending' | 'approved' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export interface Department {
    id: number;
    name: string;
}

export interface Branch {
    id: number;
    name: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    mobile_no?: string;
    position?: string;
    role?: string;
    department?: Department;
    branch?: Branch;
}

export interface ITPersonnel {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Ticket {
    id: number;
    ticket_no: string;
    subject: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    image?: string;
    requires_approval: boolean;
    category_id: number;
    category?: Category;
    assigned_to?: number | null;
    assignee?: User;
    submitted_by: number;
    submitter?: User;
    approved_by?: number | null;
    approver?: User;
    approved_at?: string | null;
    created_at: string;
    updated_at: string;
}

export interface TicketsProps {
    tickets?: Ticket[];
    itPersonnel?: ITPersonnel[];
    categories?: Category[];
}

export interface AssignmentFormData {
    assigned_to: string;
    notes: string;
}

export interface StatusUpdateFormData {
    status: TicketStatus;
    notes: string;
}

export interface TicketFilterState {
    status: TicketStatus | 'all';
    priority: TicketPriority | 'all';
    assignee: string;
    category: string;
    dateRange: string;
}

export interface TicketModalState {
    showAssignModal: boolean;
    showStatusModal: boolean;
    showDetailModal: boolean;
    selectedTicket: Ticket | null;
}