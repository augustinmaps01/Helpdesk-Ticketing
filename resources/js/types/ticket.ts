export type TicketStatus = 'pending' | 'approved' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type Ticket = {
    id: number;
    ticket_no: string;
    subject: string;
    description: string;
    status: TicketStatus;
    priority: TicketPriority;
    image?: string;
    requires_approval: boolean;
    category_id: number;
    category?: {
        id: number;
        name: string;
    };
    assigned_to?: number | null;
    assignee?: {
        id: number;
        name: string;
        email: string;
    };
    submitted_by: number;
    submitter?: {
        id: number;
        name: string;
        email: string;
        mobile_no?: string;
        position?: string;
        department?: {
            id: number;
            name: string;
        };
        branch?: {
            id: number;
            name: string;
        };
    };
    created_at: string;
    updated_at: string;
};

export type ITPersonnel = {
    id: number;
    name: string;
    email: string;
    role: string;
};

export type Category = {
    id: number;
    name: string;
};

export interface TicketsProps {
    tickets?: Ticket[];
    itPersonnel?: ITPersonnel[];
    categories?: Category[];
}