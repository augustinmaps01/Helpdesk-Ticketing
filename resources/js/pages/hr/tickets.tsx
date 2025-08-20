import React, { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import {
  Eye,
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
  Plus,
  Users,
} from 'lucide-react';
import { motion } from 'framer-motion';

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

interface HRTicketsProps {
  tickets?: Ticket[] | any;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'HR Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Tickets',
    href: '/tickets',
  },
];

// Mock data for HR view
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

export default function HRTickets({ tickets = mockTickets }: HRTicketsProps) {
  const ticketsArray = Array.isArray(tickets) ? tickets : mockTickets;
  
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter tickets
  const filteredTickets = ticketsArray.filter(ticket => {
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
    return matchesStatus && matchesPriority;
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
              <User className="w-4 h-4 text-green-600" />
              <div>
                <div className="font-medium text-sm">{ticket.assignee.name}</div>
                <div className="text-xs text-gray-500">IT Support</div>
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
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => viewTicketDetails(ticket)}
            className="h-8 w-8 p-0"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="HR - Ticket Monitoring" />

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
              <Users className="w-8 h-8 text-blue-600" />
              HR Ticket Monitoring
            </h1>
            <p className="text-muted-foreground">Monitor and track support tickets across your organization</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => window.location.href = '/create-ticket'}>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </motion.div>

        {/* HR Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          {[
            { title: 'Total Tickets', value: ticketsArray.length, color: 'text-blue-600', bg: 'bg-blue-100' },
            { title: 'Open Tickets', value: ticketsArray.filter(t => ['pending', 'approved', 'in_progress'].includes(t.status)).length, color: 'text-orange-600', bg: 'bg-orange-100' },
            { title: 'High Priority', value: ticketsArray.filter(t => t.priority === 'high' || t.priority === 'critical').length, color: 'text-red-600', bg: 'bg-red-100' },
            { title: 'Resolved', value: ticketsArray.filter(t => t.status === 'resolved' || t.status === 'closed').length, color: 'text-green-600', bg: 'bg-green-100' },
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
            <Label className="text-sm font-medium">HR Filters:</Label>
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
            title="Support Tickets (HR View)"
            subtitle="Monitor ticket progress and employee support requests"
            searchPlaceholder="Search tickets by number, subject, or submitter..."
            emptyMessage="No tickets found matching your criteria"
          />
        </motion.div>

        {/* Ticket Details Modal - HR View (Read-only) */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent size="lg" className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                HR View - {selectedTicket?.ticket_no}
              </DialogTitle>
            </DialogHeader>

            {selectedTicket && (
              <div className="space-y-6">
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="status">Status & Progress</TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
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
                          `${selectedTicket.assignee.name} (IT Support)` : 
                          'Awaiting assignment'
                        }
                      </p>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                        HR Information
                      </h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        This ticket is being monitored for progress tracking and employee support metrics.
                        For technical details or changes, please contact IT administration.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="summary">
                    <div className="space-y-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Ticket Summary</h4>
                        <ul className="space-y-2 text-sm">
                          <li><strong>Employee:</strong> {selectedTicket.submitter?.name}</li>
                          <li><strong>Issue Type:</strong> {selectedTicket.category?.name}</li>
                          <li><strong>Priority Level:</strong> {selectedTicket.priority.toUpperCase()}</li>
                          <li><strong>Current Status:</strong> {selectedTicket.status.replace('_', ' ').toUpperCase()}</li>
                          <li><strong>Support Agent:</strong> {selectedTicket.assignee?.name || 'Not assigned'}</li>
                        </ul>
                      </div>
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