import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Eye,
    UserCheck,
    Ticket as TicketIcon,
    User,
    Calendar,
    Tag,
    CheckCircle2,
    Settings,
} from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { getStatusBadge, getPriorityBadge } from '@/utils/ticketBadges';

interface TicketColumnsProps {
    onViewDetails: (ticket: Ticket) => void;
    onAssignTicket: (ticket: Ticket) => void;
    onStatusUpdate: (ticket: Ticket) => void;
}

export const useTicketColumns = ({ onViewDetails, onAssignTicket, onStatusUpdate }: TicketColumnsProps) => {
    return useMemo(() => [
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
                        onClick={() => onViewDetails(ticket)}
                        className="h-8 w-8 p-0 hover:bg-blue-50 dark:hover:bg-blue-900"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </Button>

                    {!ticket.assigned_to ? (
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onAssignTicket(ticket)}
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
                            onClick={() => onAssignTicket(ticket)}
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
                            onClick={() => onStatusUpdate(ticket)}
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
                            onClick={() => onStatusUpdate(ticket)}
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
    ], [onViewDetails, onAssignTicket, onStatusUpdate]);
};