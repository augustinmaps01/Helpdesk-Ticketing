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
import { Settings } from 'lucide-react';
import { type Ticket, type TicketStatus } from '@/types/ticket';
import { getStatusBadge } from '@/utils/ticketUtils';

interface TicketStatusDialogProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
    selectedStatus: string;
    onStatusChange: (value: string) => void;
    onConfirm: () => void;
    processing: boolean;
}

const statusOptions: { value: TicketStatus; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' },
    { value: 'rejected', label: 'Rejected' },
];

export const TicketStatusDialog: React.FC<TicketStatusDialogProps> = ({
    isOpen,
    onClose,
    ticket,
    selectedStatus,
    onStatusChange,
    onConfirm,
    processing
}) => {
    if (!ticket) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-600" />
                        Update Ticket Status
                    </DialogTitle>
                    <DialogDescription>
                        Change the status of this ticket to track its progress
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <div className="text-sm">
                            <div className="font-medium">Ticket: {ticket.ticket_no}</div>
                            <div className="text-gray-600 dark:text-gray-400">{ticket.subject}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-gray-500">Current status:</span>
                                {getStatusBadge(ticket.status)}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status-select">New Status</Label>
                        <Select value={selectedStatus} onValueChange={onStatusChange}>
                            <SelectTrigger id="status-select">
                                <SelectValue placeholder="Select new status..." />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((status) => (
                                    <SelectItem key={status.value} value={status.value}>
                                        <div className="flex items-center gap-2">
                                            {getStatusBadge(status.value)}
                                            <span>{status.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {selectedStatus && selectedStatus !== ticket.status && (
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-blue-700 dark:text-blue-300">Preview:</span>
                                {getStatusBadge(selectedStatus as TicketStatus)}
                            </div>
                        </div>
                    )}
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
                        onClick={onConfirm}
                        disabled={!selectedStatus || selectedStatus === ticket.status || processing}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                Updating...
                            </>
                        ) : (
                            'Update Status'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};