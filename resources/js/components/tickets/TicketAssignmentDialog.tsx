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
import { UserCheck } from 'lucide-react';
import { type Ticket, type ITPersonnel } from '@/types/ticket';

interface TicketAssignmentDialogProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
    itPersonnel: ITPersonnel[];
    selectedPersonnel: string;
    onPersonnelChange: (value: string) => void;
    onConfirm: () => void;
    processing: boolean;
}

export const TicketAssignmentDialog: React.FC<TicketAssignmentDialogProps> = ({
    isOpen,
    onClose,
    ticket,
    itPersonnel,
    selectedPersonnel,
    onPersonnelChange,
    onConfirm,
    processing
}) => {
    if (!ticket) return null;

    const isReassignment = ticket.assigned_to !== null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserCheck className="w-5 h-5 text-blue-600" />
                        {isReassignment ? 'Reassign Ticket' : 'Assign Ticket'}
                    </DialogTitle>
                    <DialogDescription>
                        {isReassignment
                            ? 'Reassign this ticket to a different IT personnel'
                            : 'Assign this ticket to an IT personnel to handle the request'
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded-lg">
                        <div className="text-sm">
                            <div className="font-medium">Ticket: {ticket.ticket_no}</div>
                            <div className="text-gray-600 dark:text-gray-400">{ticket.subject}</div>
                            {isReassignment && ticket.assignee && (
                                <div className="text-blue-600 dark:text-blue-400 text-xs mt-1">
                                    Currently assigned to: {ticket.assignee.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="personnel-select">
                            {isReassignment ? 'Reassign to' : 'Assign to'}
                        </Label>
                        <Select value={selectedPersonnel} onValueChange={onPersonnelChange}>
                            <SelectTrigger id="personnel-select">
                                <SelectValue placeholder="Select IT personnel..." />
                            </SelectTrigger>
                            <SelectContent>
                                {itPersonnel.map((person) => (
                                    <SelectItem key={person.id} value={person.id.toString()}>
                                        <div>
                                            <div className="font-medium">{person.name}</div>
                                            <div className="text-sm text-gray-500">{person.email}</div>
                                        </div>
                                    </SelectItem>
                                ))}
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
                        onClick={onConfirm}
                        disabled={!selectedPersonnel || processing}
                        className="bg-blue-600 hover:bg-blue-700"
                    >
                        {processing ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                                {isReassignment ? 'Reassigning...' : 'Assigning...'}
                            </>
                        ) : (
                            <>{isReassignment ? 'Reassign' : 'Assign'}</>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};