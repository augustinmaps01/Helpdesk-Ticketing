import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, router } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Eye,
    UserCheck,
    Ticket as TicketIcon,
    Clock,
    AlertTriangle,
    CheckCircle,
    CheckCircle2,
    XCircle,
    User,
    Calendar,
    Tag,
    Download,
    Printer,
    RefreshCw,
    Building,
    Users,
    MapPin,
    Settings,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Types
type Ticket = {
    id: number;
    ticket_no: string;
    subject: string;
    description: string;
    status: 'pending' | 'approved' | 'in_progress' | 'resolved' | 'closed' | 'rejected';
    priority: 'low' | 'medium' | 'high' | 'critical';
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
    approved_by?: number | null;
    approver?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    approved_at?: string | null;
    created_at: string;
    updated_at: string;
};

type ITPersonnel = {
    id: number;
    name: string;
    email: string;
    role: string;
};

type Category = {
    id: number;
    name: string;
};

interface TicketsProps {
    tickets?: Ticket[];
    itPersonnel?: ITPersonnel[];
    categories?: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tickets',
        href: '/tickets',
    },
];

// Utility functions for PDF and Print
const exportTicketToPDF = async (ticket: Ticket) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setTextColor(59, 130, 246); // Blue color
    doc.text('IT Helpdesk Support Ticket', 20, 30);
    
    // Ticket number
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Ticket #: ${ticket.ticket_no}`, 20, 50);
    
    // Status badge
    doc.setFontSize(12);
    const statusColor = getStatusColor(ticket.status);
    doc.setTextColor(statusColor.r, statusColor.g, statusColor.b);
    doc.text(`Status: ${ticket.status.toUpperCase()}`, 20, 65);
    
    // Priority
    const priorityColor = getPriorityColor(ticket.priority);
    doc.setTextColor(priorityColor.r, priorityColor.g, priorityColor.b);
    doc.text(`Priority: ${ticket.priority.toUpperCase()}`, 120, 65);
    
    // Reset color
    doc.setTextColor(0, 0, 0);
    
    // Subject
    doc.setFontSize(14);
    doc.text('Subject:', 20, 85);
    doc.setFontSize(12);
    const subjectLines = doc.splitTextToSize(ticket.subject, 160);
    doc.text(subjectLines, 20, 95);
    
    // Description
    let currentY = 110 + (subjectLines.length * 6);
    doc.setFontSize(14);
    doc.text('Description:', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);
    const descLines = doc.splitTextToSize(ticket.description, 160);
    doc.text(descLines, 20, currentY);
    
    // Submitter info
    currentY += (descLines.length * 6) + 15;
    doc.setFontSize(14);
    doc.text('Submitted By:', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Name: ${ticket.submitter?.name}`, 20, currentY);
    currentY += 8;
    doc.text(`Email: ${ticket.submitter?.email}`, 20, currentY);
    currentY += 8;
    if (ticket.submitter?.mobile_no) {
        doc.text(`Mobile: ${ticket.submitter.mobile_no}`, 20, currentY);
        currentY += 8;
    }
    doc.text(`Position: ${ticket.submitter?.position}`, 20, currentY);
    currentY += 8;
    doc.text(`Department: ${ticket.submitter?.department?.name}`, 20, currentY);
    
    // Assigned to
    currentY += 15;
    doc.setFontSize(14);
    doc.text('Assigned To:', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);
    if (ticket.assignee) {
        doc.text(`Name: ${ticket.assignee.name}`, 20, currentY);
        currentY += 8;
        doc.text(`Email: ${ticket.assignee.email}`, 20, currentY);
    } else {
        doc.text('Not assigned yet', 20, currentY);
    }
    
    // Approval information
    if (ticket.approver) {
        currentY += 15;
        doc.setFontSize(14);
        doc.text('Approval Information:', 20, currentY);
        currentY += 10;
        doc.setFontSize(12);
        doc.text(`Approved by: ${ticket.approver.name}`, 20, currentY);
        currentY += 8;
        doc.text(`Role: ${ticket.approver.role}`, 20, currentY);
        currentY += 8;
        if (ticket.approved_at) {
            doc.text(`Approved at: ${new Date(ticket.approved_at).toLocaleString()}`, 20, currentY);
        }
    }
    
    // Timestamps
    currentY += 15;
    doc.setFontSize(14);
    doc.text('Timeline:', 20, currentY);
    currentY += 10;
    doc.setFontSize(12);
    doc.text(`Created: ${new Date(ticket.created_at).toLocaleString()}`, 20, currentY);
    currentY += 8;
    doc.text(`Updated: ${new Date(ticket.updated_at).toLocaleString()}`, 20, currentY);
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Generated by IT Helpdesk System', 20, 280);
    doc.text(`Export Date: ${new Date().toLocaleString()}`, 20, 285);
    
    // Save the PDF
    doc.save(`ticket-${ticket.ticket_no}.pdf`);
};

const printTicket = (ticket: Ticket) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    
    const statusBadgeColor = getStatusBadgeClasses(ticket.status);
    const priorityBadgeColor = getPriorityBadgeClasses(ticket.priority);
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Ticket ${ticket.ticket_no}</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    color: #333; 
                }
                .header { 
                    text-align: center; 
                    border-bottom: 2px solid #3b82f6; 
                    padding-bottom: 20px; 
                    margin-bottom: 30px; 
                }
                .ticket-title { 
                    color: #3b82f6; 
                    font-size: 24px; 
                    margin: 0; 
                }
                .ticket-number { 
                    font-size: 18px; 
                    margin: 10px 0; 
                }
                .badge { 
                    padding: 4px 12px; 
                    border-radius: 20px; 
                    font-size: 12px; 
                    font-weight: bold; 
                    margin: 0 5px; 
                }
                .status-badge { ${statusBadgeColor.replace('bg-', 'background-color: ').replace('text-', 'color: ')} }
                .priority-badge { ${priorityBadgeColor.replace('bg-', 'background-color: ').replace('text-', 'color: ')} }
                .section { 
                    margin: 20px 0; 
                    padding: 15px; 
                    border-left: 4px solid #3b82f6; 
                    background-color: #f8fafc; 
                }
                .section-title { 
                    font-weight: bold; 
                    font-size: 16px; 
                    margin-bottom: 10px; 
                    color: #1e40af; 
                }
                .field { 
                    margin: 8px 0; 
                }
                .field-label { 
                    font-weight: bold; 
                    display: inline-block; 
                    width: 120px; 
                }
                .footer { 
                    margin-top: 40px; 
                    text-align: center; 
                    font-size: 12px; 
                    color: #666; 
                    border-top: 1px solid #e5e7eb; 
                    padding-top: 20px; 
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1 class="ticket-title">IT Helpdesk Support Ticket</h1>
                <div class="ticket-number">Ticket #: ${ticket.ticket_no}</div>
                <div>
                    <span class="badge status-badge">${ticket.status.toUpperCase()}</span>
                    <span class="badge priority-badge">${ticket.priority.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Ticket Information</div>
                <div class="field">
                    <span class="field-label">Subject:</span>
                    ${ticket.subject}
                </div>
                <div class="field">
                    <span class="field-label">Category:</span>
                    ${ticket.category?.name || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Description:</span>
                    <div style="margin-top: 5px; white-space: pre-wrap;">${ticket.description}</div>
                </div>
                <div class="field">
                    <span class="field-label">Approval Required:</span>
                    ${ticket.requires_approval ? 'Yes' : 'No'}
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Submitted By</div>
                <div class="field">
                    <span class="field-label">Name:</span>
                    ${ticket.submitter?.name || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Email:</span>
                    ${ticket.submitter?.email || 'N/A'}
                </div>
                ${ticket.submitter?.mobile_no ? `
                <div class="field">
                    <span class="field-label">Mobile:</span>
                    ${ticket.submitter.mobile_no}
                </div>
                ` : ''}
                <div class="field">
                    <span class="field-label">Position:</span>
                    ${ticket.submitter?.position || 'N/A'}
                </div>
                <div class="field">
                    <span class="field-label">Department:</span>
                    ${ticket.submitter?.department?.name || 'N/A'}
                </div>
            </div>
            
            <div class="section">
                <div class="section-title">Assignment</div>
                ${ticket.assignee ? `
                <div class="field">
                    <span class="field-label">Assigned To:</span>
                    ${ticket.assignee.name}
                </div>
                <div class="field">
                    <span class="field-label">Email:</span>
                    ${ticket.assignee.email}
                </div>
                ` : `
                <div class="field">Not assigned yet</div>
                `}
            </div>
            
            ${ticket.approver ? `
            <div class="section">
                <div class="section-title">Approval Information</div>
                <div class="field">
                    <span class="field-label">Approved By:</span>
                    ${ticket.approver.name}
                </div>
                <div class="field">
                    <span class="field-label">Role:</span>
                    ${ticket.approver.role}
                </div>
                ${ticket.approved_at ? `
                <div class="field">
                    <span class="field-label">Approved At:</span>
                    ${new Date(ticket.approved_at).toLocaleString()}
                </div>
                ` : ''}
            </div>
            ` : ''}
            
            <div class="section">
                <div class="section-title">Timeline</div>
                <div class="field">
                    <span class="field-label">Created:</span>
                    ${new Date(ticket.created_at).toLocaleString()}
                </div>
                <div class="field">
                    <span class="field-label">Last Updated:</span>
                    ${new Date(ticket.updated_at).toLocaleString()}
                </div>
            </div>
            
            <div class="footer">
                <p>Generated by IT Helpdesk System</p>
                <p>Export Date: ${new Date().toLocaleString()}</p>
            </div>
            
            <script>
                window.onload = function() {
                    window.print();
                    window.onafterprint = function() {
                        window.close();
                    };
                };
            </script>
        </body>
        </html>
    `);
    
    printWindow.document.close();
};

// Helper functions for colors
const getStatusColor = (status: string) => {
    switch (status) {
        case 'pending': return { r: 251, g: 191, b: 36 }; // yellow-500
        case 'in_progress': return { r: 59, g: 130, b: 246 }; // blue-500
        case 'resolved': return { r: 34, g: 197, b: 94 }; // green-500
        case 'cancelled': return { r: 239, g: 68, b: 68 }; // red-500
        default: return { r: 107, g: 114, b: 128 }; // gray-500
    }
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high': return { r: 239, g: 68, b: 68 }; // red-500
        case 'medium': return { r: 251, g: 191, b: 36 }; // yellow-500
        case 'low': return { r: 34, g: 197, b: 94 }; // green-500
        default: return { r: 107, g: 114, b: 128 }; // gray-500
    }
};

const getStatusBadgeClasses = (status: string) => {
    switch (status) {
        case 'pending':
            return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
        case 'in_progress':
            return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
        case 'resolved':
            return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
        case 'cancelled':
            return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
        default:
            return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
};

const getPriorityBadgeClasses = (priority: string) => {
    switch (priority) {
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

// Mock data for demonstration (you can remove this when you have real data)
const mockTickets: Ticket[] = [
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
        approved_by: null,
        approver: null,
        approved_at: null,
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
            position: 'Sales Manager',
            department: { id: 2, name: 'Sales' },
            branch: { id: 2, name: 'Branch Office' }
        },
        approved_by: null,
        approver: null,
        approved_at: null,
        created_at: '2024-08-17 10:30:00',
        updated_at: '2024-08-17 11:00:00',
    },
    {
        id: 3,
        ticket_no: 'TKT-2024-003',
        subject: 'Software installation request',
        description: 'Need Adobe Photoshop installed for design work.',
        status: 'approved',
        priority: 'low',
        requires_approval: true,
        category_id: 2,
        category: { id: 2, name: 'Software' },
        assigned_to: 4,
        assignee: { id: 4, name: 'Sarah IT', email: 'sarah@company.com' },
        submitted_by: 7,
        submitter: {
            id: 7,
            name: 'Bob Wilson',
            email: 'bob@company.com',
            mobile_no: '+639555123456',
            position: 'Graphic Designer',
            department: { id: 3, name: 'Creative' },
            branch: { id: 1, name: 'Main Office' }
        },
        approved_by: 9,
        approver: {
            id: 9,
            name: 'Manager Thompson',
            email: 'manager@company.com',
            role: 'IT Manager'
        },
        approved_at: '2024-08-16 15:30:00',
        image: 'https://via.placeholder.com/800x400/e2e8f0/475569?text=Photoshop+Installation+Request',
        created_at: '2024-08-16 14:00:00',
        updated_at: '2024-08-17 08:30:00',
    },
];

const mockITPersonnel: ITPersonnel[] = [
    { id: 3, name: 'Mike IT', email: 'mike@company.com', role: 'IT Support' },
    { id: 4, name: 'Sarah IT', email: 'sarah@company.com', role: 'Senior IT' },
    { id: 8, name: 'Alex Tech', email: 'alex@company.com', role: 'IT Specialist' },
];

const mockCategories: Category[] = [
    { id: 1, name: 'Hardware' },
    { id: 2, name: 'Software' },
    { id: 3, name: 'Network' },
    { id: 4, name: 'Access' },
];

export default function Tickets({
    tickets = mockTickets,
    itPersonnel = mockITPersonnel,
    categories = mockCategories
}: TicketsProps) {
    // Ensure all data is always an array
    const ticketsArray = Array.isArray(tickets) ? tickets : mockTickets;
    const itPersonnelArray = Array.isArray(itPersonnel) ? itPersonnel : mockITPersonnel;
    const categoriesArray = Array.isArray(categories) ? categories : mockCategories;
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [ticketToAssign, setTicketToAssign] = useState<Ticket | null>(null);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [ticketToUpdateStatus, setTicketToUpdateStatus] = useState<Ticket | null>(null);
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const { data, setData, patch, processing } = useForm({
        assigned_to: '',
        status: '',
    });

    // Filter tickets based on selected filters
    const filteredTickets = ticketsArray.filter(ticket => {
        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
        const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
        const matchesCategory = categoryFilter === 'all' || ticket.category_id.toString() === categoryFilter;
        return matchesStatus && matchesPriority && matchesCategory;
    });

    // Status configuration
    const getStatusBadge = (status: string) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', icon: Clock },
            approved: { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', icon: CheckCircle },
            in_progress: { color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', icon: RefreshCw },
            resolved: { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', icon: CheckCircle },
            closed: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', icon: XCircle },
            rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', icon: XCircle },
        };

        const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
        const IconComponent = config.icon;

        return (
            <Badge className={`${config.color} flex items-center gap-1`}>
                <IconComponent className="w-3 h-3" />
                {status.replace('_', ' ').toUpperCase()}
            </Badge>
        );
    };

    const getPriorityBadge = (priority: string) => {
        const priorityConfig = {
            low: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
            medium: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            high: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
            critical: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        };

        return (
            <Badge className={priorityConfig[priority as keyof typeof priorityConfig]}>
                <AlertTriangle className="w-3 h-3 mr-1" />
                {priority.toUpperCase()}
            </Badge>
        );
    };

    // Handle ticket assignment
    const handleAssignTicket = (ticket: Ticket) => {
        console.log('handleAssignTicket called with ticket:', ticket);
        setTicketToAssign(ticket);
        setData({
            assigned_to: ticket.assigned_to?.toString() || 'unassigned',
            status: ticket.status,
        });
        setIsAssignModalOpen(true);
        console.log('Modal should be opening now');
    };

    const submitAssignment = async () => {
        if (!ticketToAssign) return;

        // Validation
        if (!data.status) {
            showErrorAlert('Validation Error', 'Please select a status for the ticket.');
            return;
        }

        // Confirm assignment change
        const assignedPerson = data.assigned_to !== 'unassigned'
            ? itPersonnelArray.find(person => person.id.toString() === data.assigned_to)
            : null;
        const assignmentText = assignedPerson
            ? `assign this ticket to ${assignedPerson.name}`
            : 'unassign this ticket';

        const result = await showConfirmAlert(
            'Confirm Assignment',
            `Are you sure you want to ${assignmentText} and change the status to ${data.status}?`
        );

        if (!result.isConfirmed) return;

        // Submit the assignment
        try {
            // For now, let's simulate the assignment since route might not be set up
            console.log('Submitting assignment:', {
                ticket_id: ticketToAssign.id,
                assigned_to: data.assigned_to === 'unassigned' ? null : data.assigned_to,
                status: data.status,
                assigned_at: new Date().toISOString(),
            });

            // Simulate success for now
            setIsAssignModalOpen(false);
            setTicketToAssign(null);
            const successMessage = assignedPerson
                ? `Ticket successfully assigned to ${assignedPerson.name}!`
                : 'Ticket assignment removed successfully!';
            showSuccessAlert('Assignment Updated', successMessage);

            // TODO: Uncomment this when the route is properly set up
            /*
            patch(route('tickets.update', ticketToAssign.id), {
                data: {
                    assigned_to: data.assigned_to === 'unassigned' ? null : data.assigned_to,
                    status: data.status,
                    assigned_at: new Date().toISOString(),
                    assigned_by: 'current_user_id', // This should come from auth context
                },
                onSuccess: () => {
                    setIsAssignModalOpen(false);
                    setTicketToAssign(null);
                    const successMessage = assignedPerson
                        ? `Ticket successfully assigned to ${assignedPerson.name}!`
                        : 'Ticket assignment removed successfully!';
                    showSuccessAlert('Assignment Updated', successMessage);
                },
                onError: (errors) => {
                    console.error('Assignment error:', errors);
                    showErrorAlert('Assignment Failed', 'Failed to update ticket assignment. Please try again.');
                }
            });
            */
        } catch (error) {
            console.error('Assignment error:', error);
            showErrorAlert('Assignment Failed', 'Failed to update ticket assignment. Please try again.');
        }
    };

    // View ticket details
    const viewTicketDetails = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsDetailModalOpen(true);
    };

    // Handle status update
    const handleStatusUpdate = (ticket: Ticket) => {
        console.log('handleStatusUpdate called with ticket:', ticket);
        setTicketToUpdateStatus(ticket);
        setData({
            assigned_to: ticket.assigned_to?.toString() || 'unassigned',
            status: ticket.status,
        });
        setIsStatusModalOpen(true);
    };

    const submitStatusUpdate = async () => {
        if (!ticketToUpdateStatus) return;

        // Validation
        if (!data.status) {
            showErrorAlert('Validation Error', 'Please select a status for the ticket.');
            return;
        }

        // Confirm status change
        const result = await showConfirmAlert(
            'Update Status',
            `Are you sure you want to change the ticket status to ${data.status}?`
        );

        if (!result.isConfirmed) return;

        // Submit the status update
        try {
            console.log('Submitting status update:', {
                ticket_id: ticketToUpdateStatus.id,
                status: data.status,
                updated_at: new Date().toISOString(),
            });

            // Simulate success for now
            setIsStatusModalOpen(false);
            setTicketToUpdateStatus(null);
            showSuccessAlert('Status Updated', `Ticket status successfully updated to ${data.status}!`);

            // TODO: Uncomment this when the route is properly set up
            /*
            patch(route('tickets.update', ticketToUpdateStatus.id), {
                data: {
                    status: data.status,
                    updated_at: new Date().toISOString(),
                },
                onSuccess: () => {
                    setIsStatusModalOpen(false);
                    setTicketToUpdateStatus(null);
                    showSuccessAlert('Status Updated', `Ticket status successfully updated to ${data.status}!`);
                },
                onError: (errors) => {
                    console.error('Status update error:', errors);
                    showErrorAlert('Update Failed', 'Failed to update ticket status. Please try again.');
                }
            });
            */
        } catch (error) {
            console.error('Status update error:', error);
            showErrorAlert('Update Failed', 'Failed to update ticket status. Please try again.');
        }
    };

    // Update ticket status
    const updateTicketStatus = async (ticketId: number, newStatus: string) => {
        const result = await showConfirmAlert(
            'Update Status',
            `Are you sure you want to change the ticket status to ${newStatus}?`
        );

        if (result.isConfirmed) {
            router.patch(route('tickets.update', ticketId),
                { status: newStatus },
                {
                    onSuccess: () => {
                        showSuccessAlert('Success!', 'Ticket status updated successfully.');
                    },
                    onError: () => {
                        showErrorAlert('Error!', 'Failed to update ticket status.');
                    }
                }
            );
        }
    };

    const columns = [
        {
            id: 'ticket_no',
            header: 'Ticket #',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-2">
                    <TicketIcon className="w-4 h-4 text-blue-600" />
                    <span className="font-mono text-sm font-medium">{ticket.ticket_no}</span>
                </div>
            ),
        },
        {
            id: 'subject',
            header: 'Subject',
            cell: (ticket: Ticket) => (
                <div className="max-w-xs">
                    <div className="font-semibold text-gray-900 dark:text-white truncate">{ticket.subject}</div>
                </div>
            ),
        },
        {
            id: 'submitter',
            header: 'Submitted By',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                        <div className="font-medium text-sm">{ticket.submitter?.name}</div>
                        <div className="text-xs text-gray-500">{ticket.submitter?.email}</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'mobile_no',
            header: 'Mobile Number',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-2">
                    {ticket.submitter?.mobile_no ? (
                        <div className="flex items-center gap-1">
                            📱
                            <span className="text-sm font-medium">{ticket.submitter.mobile_no}</span>
                        </div>
                    ) : (
                        <span className="text-gray-400 text-sm">No mobile</span>
                    )}
                </div>
            ),
        },
        {
            id: 'category',
            header: 'Category',
            cell: (ticket: Ticket) => (
                <Badge variant="outline" className="flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    {ticket.category?.name}
                </Badge>
            ),
        },
        {
            id: 'priority',
            header: 'Priority',
            cell: (ticket: Ticket) => getPriorityBadge(ticket.priority),
        },
        {
            id: 'status',
            header: 'Status',
            cell: (ticket: Ticket) => getStatusBadge(ticket.status),
        },
        {
            id: 'assigned_to',
            header: 'Assigned To',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-2">
                    {ticket.assignee ? (
                        <>
                            <UserCheck className="w-4 h-4 text-green-600" />
                            <div>
                                <div className="font-medium text-sm">{ticket.assignee.name}</div>
                                <div className="text-xs text-gray-500">{ticket.assignee.email}</div>
                            </div>
                        </>
                    ) : (
                        <span className="text-gray-400 text-sm">Unassigned</span>
                    )}
                </div>
            ),
        },
        {
            id: 'created_at',
            header: 'Created',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(ticket.created_at).toLocaleDateString()}
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (ticket: Ticket) => (
                <div className="flex items-center gap-1">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => viewTicketDetails(ticket)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>

                    {!ticket.assigned_to ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignTicket(ticket)}
                            className="h-8 px-2 hover:bg-green-50 dark:hover:bg-green-900 hover:border-green-300"
                            title="Assign to IT Personnel"
                        >
                            <UserCheck className="w-4 h-4 mr-1" />
                            <span className="text-xs">Assign</span>
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAssignTicket(ticket)}
                            className="h-8 px-2 hover:bg-orange-50 dark:hover:bg-orange-900 hover:border-orange-300"
                            title="Reassign to Different IT Personnel"
                        >
                            <User className="w-4 h-4 mr-1" />
                            <span className="text-xs">Reassign</span>
                        </Button>
                    )}

                    {/* Status Update Button */}
                    {ticket.status !== 'resolved' && ticket.status !== 'closed' ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(ticket)}
                            className="h-8 px-2 hover:bg-emerald-50 dark:hover:bg-emerald-900 hover:border-emerald-300"
                            title="Update Status (Mark as Resolved/Done)"
                        >
                            <CheckCircle2 className="w-4 h-4 mr-1" />
                            <span className="text-xs">Status</span>
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(ticket)}
                            className="h-8 px-2 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300"
                            title="Update Status"
                        >
                            <Settings className="w-4 h-4 mr-1" />
                            <span className="text-xs">Status</span>
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ticket Management" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                </motion.div>



                {/* Tickets Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <DataTable
                        data={filteredTickets}
                        columns={columns}
                        title="Support Ticket"
                        subtitle="Manage and track all support tickets"
                        searchPlaceholder="Search tickets by number, subject, or submitter..."
                        emptyMessage="No tickets found matching your criteria"
                        filters={
                            <div className="flex flex-wrap gap-2 items-center">
                                {/* Status Filter */}
                                <Select value={statusFilter} onValueChange={setStatusFilter}>
                                    <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        <SelectValue placeholder="Status" />
                                    </SelectTrigger>
                                    <SelectContent className="z-50">
                                        <SelectItem value="all">All Status</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="approved">Approved</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="resolved">Resolved</SelectItem>
                                        <SelectItem value="closed">Closed</SelectItem>
                                        <SelectItem value="rejected">Rejected</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Priority Filter */}
                                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                    <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        <SelectValue placeholder="Priority" />
                                    </SelectTrigger>
                                    <SelectContent className="z-50">
                                        <SelectItem value="all">All Priority</SelectItem>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                        <SelectItem value="critical">Critical</SelectItem>
                                    </SelectContent>
                                </Select>

                                {/* Category Filter */}
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                                        <SelectValue placeholder="Category" />
                                    </SelectTrigger>
                                    <SelectContent className="z-50 max-h-60">
                                        <SelectItem value="all">All Categories</SelectItem>
                                        {categoriesArray.map(category => (
                                            <SelectItem key={category.id} value={category.id.toString()}>
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>

                                {/* Divider */}
                                <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

                                {/* Action Buttons */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <Download className="w-3 h-3 mr-1" />
                                    Export
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <RefreshCw className="w-3 h-3 mr-1" />
                                    Refresh
                                </Button>

                                {/* Clear Filters Button */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setStatusFilter('all');
                                        setPriorityFilter('all');
                                        setCategoryFilter('all');
                                    }}
                                    className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Clear
                                </Button>
                            </div>
                        }
                    />
                </motion.div>

                {/* Ticket Details Modal */}
                <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
                    <DialogContent size="xl" className="max-w-6xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <DialogTitle className="flex items-center gap-2">
                                        <TicketIcon className="w-5 h-5 text-blue-600" />
                                        Ticket Details - {selectedTicket?.ticket_no}
                                    </DialogTitle>
                                    <DialogDescription>
                                        View detailed information about this support ticket
                                    </DialogDescription>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => selectedTicket && exportTicketToPDF(selectedTicket)}
                                        className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export PDF
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => selectedTicket && printTicket(selectedTicket)}
                                        className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-700"
                                    >
                                        <Printer className="w-4 h-4" />
                                        Print
                                    </Button>
                                </div>
                            </div>
                        </DialogHeader>

                        {selectedTicket && (
                            <div className="space-y-6">
                                        {/* Header Section with Ticket Number and Status */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div>
                                                    <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Ticket Number</Label>
                                                    <p className="text-lg font-mono font-bold text-blue-900 dark:text-blue-100">{selectedTicket.ticket_no}</p>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Status</Label>
                                                    <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                                                </div>
                                                <div>
                                                    <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Priority Level</Label>
                                                    <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Basic Information */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold">Ticket Information</CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium flex items-center gap-2">
                                                            <Tag className="w-4 h-4" />
                                                            Subject
                                                        </Label>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-medium">
                                                            {selectedTicket.subject}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium flex items-center gap-2">
                                                            <Tag className="w-4 h-4" />
                                                            Description
                                                        </Label>
                                                        <Textarea
                                                            className="mt-1"
                                                            value={selectedTicket.description}
                                                            readOnly
                                                            placeholder="No description provided."
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium flex items-center gap-2">
                                                            <Tag className="w-4 h-4" />
                                                            Category
                                                        </Label>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{selectedTicket.category?.name}</p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium">Requires Approval</Label>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${selectedTicket.requires_approval
                                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                    : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                }`}>
                                                                {selectedTicket.requires_approval ? 'Yes' : 'No'}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <div className="space-y-4">
                                                <div>
                                                    <Label className="text-sm font-medium flex items-center gap-2">
                                                        <User className="w-4 h-4" />
                                                        Submitted By
                                                    </Label>
                                                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {selectedTicket.submitter?.name}
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                {selectedTicket.submitter?.email}
                                                            </p>
                                                            {selectedTicket.submitter?.mobile_no && (
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                                    📱 {selectedTicket.submitter.mobile_no}
                                                                </p>
                                                            )}
                                                        </div>
                                                        {selectedTicket.submitter?.position && (
                                                            <div className="flex items-center gap-1">
                                                                <Users className="w-3 h-3 text-blue-500" />
                                                                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                                                    {selectedTicket.submitter.position}
                                                                </span>
                                                            </div>
                                                        )}
                                                        {selectedTicket.submitter?.department && (
                                                            <div className="flex items-center gap-1">
                                                                <Building className="w-3 h-3 text-green-500" />
                                                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                                                    {selectedTicket.submitter.department.name} Department
                                                                </span>
                                                            </div>
                                                        )}
                                                        {selectedTicket.submitter?.branch && (
                                                            <div className="flex items-center gap-1">
                                                                <MapPin className="w-3 h-3 text-purple-500" />
                                                                <span className="text-xs text-gray-600 dark:text-gray-300">
                                                                    {selectedTicket.submitter.branch.name}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Assignment & Status Section */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                        <UserCheck className="w-5 h-5" />
                                                        Assignment Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium">Assigned To</Label>
                                                        <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                            {selectedTicket.assignee ? (
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                        {selectedTicket.assignee.name}
                                                                    </p>
                                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                        {selectedTicket.assignee.email}
                                                                    </p>
                                                                </div>
                                                            ) : (
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">Not assigned yet</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Approval Information Card */}
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                        <CheckCircle className="w-5 h-5" />
                                                        Approval Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium">Approval Status</Label>
                                                        <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                            {selectedTicket.status === 'approved' ? (
                                                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                    <span className="font-medium">Approved</span>
                                                                </div>
                                                            ) : selectedTicket.requires_approval ? (
                                                                <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                                                                    <Clock className="w-4 h-4" />
                                                                    <span className="font-medium">Pending Approval</span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                                    <CheckCircle className="w-4 h-4" />
                                                                    <span className="font-medium">No Approval Required</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {selectedTicket.approver && (
                                                        <div>
                                                            <Label className="text-sm font-medium flex items-center gap-2">
                                                                <User className="w-4 h-4" />
                                                                Approved By
                                                            </Label>
                                                            <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                                                <div className="flex items-start gap-3">
                                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
                                                                        {selectedTicket.approver.name.charAt(0)}
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                                            {selectedTicket.approver.name}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                            {selectedTicket.approver.email}
                                                                        </p>
                                                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                                            {selectedTicket.approver.role}
                                                                        </p>
                                                                        {selectedTicket.approved_at && (
                                                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                                                Approved on {new Date(selectedTicket.approved_at).toLocaleString()}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                        <Clock className="w-5 h-5" />
                                                        Timeline & Dates
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div>
                                                        <Label className="text-sm font-medium flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            Created Date
                                                        </Label>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                            {new Date(selectedTicket.created_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <Label className="text-sm font-medium flex items-center gap-2">
                                                            <RefreshCw className="w-4 h-4" />
                                                            Last Updated
                                                        </Label>
                                                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                                            {new Date(selectedTicket.updated_at).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Image Section */}
                                        {selectedTicket.image && (
                                            <Card>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                                        <Eye className="w-5 h-5" />
                                                        Screenshot/Attachment
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                                        <img 
                                                            src={selectedTicket.image} 
                                                            alt="Ticket attachment"
                                                            className="max-w-full h-auto rounded-lg shadow-sm"
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                            </div>
                        )}
                    </DialogContent>
                </Dialog>

                {/* Assignment Modal */}
                <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-blue-600" />
                                {ticketToAssign?.assigned_to ? 'Reassign Ticket' : 'Assign Ticket'}
                            </DialogTitle>
                            <DialogDescription>
                                {ticketToAssign?.assigned_to
                                    ? 'Reassign this ticket to a different IT personnel'
                                    : 'Assign this ticket to an IT personnel to handle the request'
                                }
                            </DialogDescription>
                        </DialogHeader>

                        {ticketToAssign && (
                            <div className="space-y-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {ticketToAssign.ticket_no}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {ticketToAssign.subject}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Assign to IT Personnel</Label>
                                    <Select value={data.assigned_to} onValueChange={(value) => setData('assigned_to', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select IT personnel" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="unassigned">Unassigned</SelectItem>
                                            {itPersonnelArray.map(person => (
                                                <SelectItem key={person.id} value={person.id.toString()}>
                                                    <div className="flex items-center gap-2">
                                                        <User className="w-3 h-3" />
                                                        <div>
                                                            <div className="font-medium">{person.name}</div>
                                                            <div className="text-xs text-gray-500">{person.role}</div>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Update Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">Pending</SelectItem>
                                            <SelectItem value="approved">Approved</SelectItem>
                                            <SelectItem value="in_progress">In Progress</SelectItem>
                                            <SelectItem value="resolved">Resolved</SelectItem>
                                            <SelectItem value="closed">Closed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAssignModalOpen(false)}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={submitAssignment}
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Processing...' : (ticketToAssign?.assigned_to ? 'Reassign' : 'Assign')} Ticket
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Status Update Modal */}
                <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                                Update Ticket Status
                            </DialogTitle>
                            <DialogDescription>
                                Change the status of this ticket to reflect its current progress
                            </DialogDescription>
                        </DialogHeader>

                        {ticketToUpdateStatus && (
                            <div className="space-y-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {ticketToUpdateStatus.ticket_no}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {ticketToUpdateStatus.subject}
                                    </p>
                                    <div className="mt-2">
                                        <span className="text-xs text-gray-500">Current Status: </span>
                                        {getStatusBadge(ticketToUpdateStatus.status)}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Update Status</Label>
                                    <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select new status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-3 h-3 text-yellow-500" />
                                                    Pending
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="approved">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle className="w-3 h-3 text-blue-500" />
                                                    Approved
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="in_progress">
                                                <div className="flex items-center gap-2">
                                                    <RefreshCw className="w-3 h-3 text-purple-500" />
                                                    In Progress
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="resolved">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                                                    Resolved
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="closed">
                                                <div className="flex items-center gap-2">
                                                    <XCircle className="w-3 h-3 text-gray-500" />
                                                    Closed
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="rejected">
                                                <div className="flex items-center gap-2">
                                                    <XCircle className="w-3 h-3 text-red-500" />
                                                    Rejected
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Quick Action Buttons */}
                                <div className="space-y-2">
                                    <Label className="text-sm font-medium">Quick Actions</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setData('status', 'resolved')}
                                            className="flex-1 h-9 hover:bg-green-50 dark:hover:bg-green-900 hover:border-green-300"
                                        >
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Mark Resolved
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setData('status', 'closed')}
                                            className="flex-1 h-9 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300"
                                        >
                                            <XCircle className="w-3 h-3 mr-1" />
                                            Mark Closed
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsStatusModalOpen(false)}
                                disabled={processing}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={submitStatusUpdate}
                                disabled={processing || !data.status}
                                className="bg-emerald-600 hover:bg-emerald-700"
                            >
                                {processing ? 'Updating...' : 'Update Status'}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
