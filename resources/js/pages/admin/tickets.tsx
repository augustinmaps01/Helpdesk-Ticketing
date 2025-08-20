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
  XCircle,
  User,
  Calendar,
  Tag,
  Filter,
  Download,
  RefreshCw,
  Settings,
  Trash2,
  Edit,
  Shield,
  Archive,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

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
  };
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

interface AdminTicketsProps {
  tickets?: Ticket[] | any;
  itPersonnel?: ITPersonnel[] | any;
  categories?: Category[] | any;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Admin',
    href: '/admin',
  },
  {
    title: 'Tickets',
    href: '/admin/tickets',
  },
];

// Mock data for demonstration
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
    submitter: { id: 5, name: 'John Doe', email: 'john@company.com' },
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
    submitter: { id: 6, name: 'Jane Smith', email: 'jane@company.com' },
    created_at: '2024-08-17 10:30:00',
    updated_at: '2024-08-17 11:00:00',
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

export default function AdminTickets({
  tickets = mockTickets,
  itPersonnel = mockITPersonnel,
  categories = mockCategories
}: AdminTicketsProps) {
  const ticketsArray = Array.isArray(tickets) ? tickets : mockTickets;
  const itPersonnelArray = Array.isArray(itPersonnel) ? itPersonnel : mockITPersonnel;
  const categoriesArray = Array.isArray(categories) ? categories : mockCategories;

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [ticketToAssign, setTicketToAssign] = useState<Ticket | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const { data, setData, patch, processing } = useForm({
    assigned_to: '',
    status: '',
    priority: '',
    admin_notes: '',
  });

  // Filter tickets
  const filteredTickets = ticketsArray.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || ticket.category_id.toString() === categoryFilter;
    return matchesStatus && matchesPriority && matchesCategory;
  });

  // Status badges
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

  // Admin functions
  const handleAssignTicket = (ticket: Ticket) => {
    setTicketToAssign(ticket);
    setData({
      assigned_to: ticket.assigned_to?.toString() || '',
      status: ticket.status,
      priority: ticket.priority,
      admin_notes: '',
    });
    setIsAssignModalOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setData({
      assigned_to: ticket.assigned_to?.toString() || '',
      status: ticket.status,
      priority: ticket.priority,
      admin_notes: '',
    });
    setIsEditModalOpen(true);
  };

  const deleteTicket = async (ticketId: number) => {
    const result = await showConfirmAlert(
      'Delete Ticket?',
      'Are you sure you want to permanently delete this ticket? This action cannot be undone.',
      'Yes, delete it!',
      {},
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    );

    if (result.isConfirmed) {
      router.delete(route('admin.tickets.destroy', ticketId), {
        onSuccess: () => {
          showSuccessAlert('Ticket Deleted!', 'Ticket has been permanently deleted.');
        },
        onError: () => {
          showErrorAlert('Delete Failed', 'There was an error deleting the ticket.');
        },
      });
    }
  };

  const submitAssignment = async () => {
    if (!ticketToAssign) return;

    const assignedPerson = itPersonnelArray.find(person => person.id.toString() === data.assigned_to);
    const assignmentText = assignedPerson
      ? `assign this ticket to ${assignedPerson.name}`
      : 'unassign this ticket';

    const result = await showConfirmAlert(
      'Confirm Assignment',
      `Are you sure you want to ${assignmentText} and update the ticket settings?`
    );

    if (!result.isConfirmed) return;

    patch(route('admin.tickets.update', ticketToAssign.id), {
      data: {
        assigned_to: data.assigned_to || null,
        status: data.status,
        priority: data.priority,
        admin_notes: data.admin_notes,
      },
      onSuccess: () => {
        setIsAssignModalOpen(false);
        setTicketToAssign(null);
        showSuccessAlert('Ticket Updated', 'Ticket has been updated successfully!');
      },
      onError: (errors) => {
        console.error('Update error:', errors);
        showErrorAlert('Update Failed', 'Failed to update ticket. Please try again.');
      }
    });
  };

  const viewTicketDetails = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsDetailModalOpen(true);
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
          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{ticket.description}</div>
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
      header: 'Admin Actions',
      cell: (ticket: Ticket) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => viewTicketDetails(ticket)}
            className="h-8 w-8 p-0"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleAssignTicket(ticket)}
            className="h-8 w-8 p-0"
            title="Manage Ticket"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEditTicket(ticket)}
            className="h-8 w-8 p-0"
            title="Edit Ticket"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => deleteTicket(ticket.id)}
            className="h-8 w-8 p-0"
            title="Delete Ticket"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin - Ticket Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-2">
              <Shield className="w-8 h-8 text-blue-600" />
              Admin Ticket Management
            </h1>
            <p className="text-muted-foreground">Full administrative control over all support tickets</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export All
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* Admin Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { title: 'Total Tickets', value: ticketsArray.length, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'Pending Approval', value: ticketsArray.filter(t => t.status === 'pending').length, color: 'text-yellow-600', bg: 'bg-yellow-100' },
            { title: 'In Progress', value: ticketsArray.filter(t => t.status === 'in_progress').length, color: 'text-purple-600', bg: 'bg-purple-100' },
            { title: 'Resolved', value: ticketsArray.filter(t => t.status === 'resolved').length, color: 'text-green-600', bg: 'bg-green-100' },
          ].map((stat, index) => (
            <Card key={stat.title}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${stat.bg}`}>
                    <TicketIcon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap items-center gap-4 p-4 bg-card rounded-lg border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Label className="text-sm font-medium">Admin Filters:</Label>
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoriesArray.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-sm text-gray-500">
            Showing {filteredTickets.length} of {ticketsArray.length} tickets
          </div>
        </motion.div>

        {/* Tickets Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <DataTable
            data={filteredTickets}
            columns={columns}
            title="Support Tickets (Admin View)"
            subtitle="Complete administrative control over all support requests"
            searchPlaceholder="Search tickets by number, subject, or submitter..."
            emptyMessage="No tickets found matching your criteria"
          />
        </motion.div>

        {/* Assignment/Management Modal */}
        <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
          <DialogContent size="md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-600" />
                Manage Ticket - {ticketToAssign?.ticket_no}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="assigned_to">Assign to IT Personnel</Label>
                <Select value={data.assigned_to} onValueChange={(value) => setData('assigned_to', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IT Personnel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {itPersonnelArray.map(person => (
                      <SelectItem key={person.id} value={person.id.toString()}>
                        {person.name} - {person.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Update Status</Label>
                <Select value={data.status} onValueChange={(value) => setData('status', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Update Priority</Label>
                <Select value={data.priority} onValueChange={(value) => setData('priority', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="admin_notes">Admin Notes</Label>
                <Textarea
                  id="admin_notes"
                  value={data.admin_notes}
                  onChange={(e) => setData('admin_notes', e.target.value)}
                  placeholder="Add admin notes or comments..."
                  rows={3}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={submitAssignment} disabled={processing}>
                {processing ? 'Updating...' : 'Update Ticket'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Ticket Details Modal */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent size="lg" className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Admin View - {selectedTicket?.ticket_no}
              </DialogTitle>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="status">Status & Assignment</TabsTrigger>
                    <TabsTrigger value="admin">Admin Controls</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Subject</Label>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedTicket.subject}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Category</Label>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{selectedTicket.category?.name}</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        {selectedTicket.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Submitted By</Label>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {selectedTicket.submitter?.name} ({selectedTicket.submitter?.email})
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Created At</Label>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {new Date(selectedTicket.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="status" className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Current Status</Label>
                        <div className="mt-1">{getStatusBadge(selectedTicket.status)}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Priority</Label>
                        <div className="mt-1">{getPriorityBadge(selectedTicket.priority)}</div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Assigned To</Label>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedTicket.assignee ?
                          `${selectedTicket.assignee.name} (${selectedTicket.assignee.email})` :
                          'Unassigned'
                        }
                      </p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Requires Approval</Label>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {selectedTicket.requires_approval ? 'Yes' : 'No'}
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="admin" className="space-y-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        Administrative Controls
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                        As an admin, you have full control over this ticket.
                      </p>

                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" onClick={() => handleAssignTicket(selectedTicket)}>
                          <Settings className="w-4 h-4 mr-2" />
                          Manage Ticket
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleEditTicket(selectedTicket)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Details
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteTicket(selectedTicket.id)}>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="history">
                    <div className="text-sm text-gray-500">
                      Ticket history and admin activity log would be displayed here.
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
