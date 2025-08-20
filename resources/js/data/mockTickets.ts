import { type Ticket } from '@/types/ticket';

export const mockTickets: Ticket[] = [
    {
        id: 1,
        ticket_no: 'TKT-2024-001',
        subject: 'Computer won\'t start',
        description: 'My computer is not turning on at all. I tried pressing the power button multiple times.',
        status: 'pending',
        priority: 'high',
        requires_approval: true,
        category_id: 1,
        category: { id: 1, name: 'Hardware' },
        assigned_to: null,
        submitted_by: 5,
        submitter: {
            id: 5,
            name: 'John Doe',
            email: 'john@company.com',
            mobile_no: '+639123456789',
            position: 'Marketing Specialist',
            department: { id: 1, name: 'Marketing' },
            branch: { id: 1, name: 'Main Office' }
        },
        created_at: '2024-08-17 09:00:00',
        updated_at: '2024-08-17 09:00:00',
    },
    {
        id: 2,
        ticket_no: 'TKT-2024-002',
        subject: 'Email not working',
        description: 'I cannot send or receive emails. Getting connection timeout errors.',
        status: 'in_progress',
        priority: 'medium',
        requires_approval: false,
        category_id: 2,
        category: { id: 2, name: 'Software' },
        assigned_to: 3,
        assignee: { id: 3, name: 'Mike IT', email: 'mike@company.com' },
        submitted_by: 6,
        submitter: {
            id: 6,
            name: 'Jane Smith',
            email: 'jane@company.com',
            mobile_no: '+639987654321',
            position: 'HR Manager',
            department: { id: 2, name: 'Human Resources' },
            branch: { id: 1, name: 'Main Office' }
        },
        created_at: '2024-08-16 14:30:00',
        updated_at: '2024-08-17 10:15:00',
    },
    {
        id: 3,
        ticket_no: 'TKT-2024-003',
        subject: 'Printer jam issue',
        description: 'The office printer keeps jamming. Papers are getting stuck frequently.',
        status: 'resolved',
        priority: 'low',
        requires_approval: false,
        category_id: 1,
        category: { id: 1, name: 'Hardware' },
        assigned_to: 4,
        assignee: { id: 4, name: 'Sarah Tech', email: 'sarah@company.com' },
        submitted_by: 7,
        submitter: {
            id: 7,
            name: 'Bob Wilson',
            email: 'bob@company.com',
            position: 'Accountant',
            department: { id: 3, name: 'Finance' },
            branch: { id: 2, name: 'Branch Office' }
        },
        created_at: '2024-08-15 11:20:00',
        updated_at: '2024-08-16 16:45:00',
    },
];

export const mockITPersonnel = [
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', role: 'IT Support' },
    { id: 4, name: 'Sarah Connor', email: 'sarah@company.com', role: 'System Admin' },
    { id: 5, name: 'Alex Rodriguez', email: 'alex@company.com', role: 'Network Engineer' },
];

export const mockCategories = [
    { id: 1, name: 'Hardware' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Account' },
];