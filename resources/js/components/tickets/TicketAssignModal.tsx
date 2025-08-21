import React from 'react';
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
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UserCheck, User } from 'lucide-react';
import { Ticket, ITPersonnel } from '@/types/ticket';

interface TicketAssignModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
    itPersonnel: ITPersonnel[];
    assignedTo: string;
    status: string;
    processing: boolean;
    onAssignedToChange: (value: string) => void;
    onStatusChange: (value: string) => void;
    onSubmit: () => void;
}

export const TicketAssignModal: React.FC<TicketAssignModalProps> = React.memo(({
    isOpen,
    onClose,
    ticket,
    itPersonnel,
    assignedTo,
    status,
    processing,
    onAssignedToChange,
    onStatusChange,
    onSubmit,
}) => {
    if (!ticket) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                        {ticket.assigned_to ? 'Reassign Ticket' : 'Assign Ticket'}
                    </DialogTitle>
                    <DialogDescription>
                        {ticket.assigned_to
                            ? 'Reassign this ticket to a different IT personnel'
                            : 'Assign this ticket to an IT personnel to handle the request'
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.ticket_no}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.subject}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Assign to IT Personnel</Label>
                        <Select value={assignedTo} onValueChange={onAssignedToChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select IT personnel" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unassigned">Unassigned</SelectItem>
                                {itPersonnel.map(person => (
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
                        <Select value={status} onValueChange={onStatusChange}>
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

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={processing}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {processing ? 'Processing...' : (ticket.assigned_to ? 'Reassign' : 'Assign')} Ticket
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});