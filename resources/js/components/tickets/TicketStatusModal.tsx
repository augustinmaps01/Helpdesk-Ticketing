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
import {
    CheckCircle2,
    Clock,
    CheckCircle,
    RefreshCw,
    XCircle,
} from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { getStatusBadge } from '@/utils/ticketBadges';

interface TicketStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
    status: string;
    processing: boolean;
    onStatusChange: (value: string) => void;
    onSubmit: () => void;
}

export const TicketStatusModal: React.FC<TicketStatusModalProps> = React.memo(({
    isOpen,
    onClose,
    ticket,
    status,
    processing,
    onStatusChange,
    onSubmit,
}) => {
    if (!ticket) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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

                <div className="space-y-4">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.ticket_no}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            {ticket.subject}
                        </p>
                        <div className="mt-2">
                            <span className="text-xs text-gray-500">Current Status: </span>
                            {getStatusBadge(ticket.status)}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Update Status</Label>
                        <Select value={status} onValueChange={onStatusChange}>
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
                                onClick={() => onStatusChange('resolved')}
                                className="flex-1 h-9 hover:bg-green-50 dark:hover:bg-green-900 hover:border-green-300"
                            >
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Mark Resolved
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onStatusChange('closed')}
                                className="flex-1 h-9 hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-gray-300"
                            >
                                <XCircle className="w-3 h-3 mr-1" />
                                Mark Closed
                            </Button>
                        </div>
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
                        disabled={processing || !status}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        {processing ? 'Updating...' : 'Update Status'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});