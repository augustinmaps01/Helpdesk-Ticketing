import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { type Ticket, type ITPersonnel } from '@/types/ticket';

export const useTicketOperations = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [ticketToAssign, setTicketToAssign] = useState<Ticket | null>(null);
    const [ticketToUpdateStatus, setTicketToUpdateStatus] = useState<Ticket | null>(null);
    const [selectedPersonnel, setSelectedPersonnel] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');

    const { post, processing } = useForm();

    const viewTicketDetails = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsViewModalOpen(true);
    };

    const handleAssignTicket = (ticket: Ticket) => {
        setTicketToAssign(ticket);
        setSelectedPersonnel(ticket.assigned_to?.toString() || '');
        setIsAssignModalOpen(true);
    };

    const handleStatusUpdate = (ticket: Ticket) => {
        setTicketToUpdateStatus(ticket);
        setSelectedStatus(ticket.status);
        setIsStatusModalOpen(true);
    };

    const confirmAssignment = (itPersonnel: ITPersonnel[]) => {
        if (!ticketToAssign || !selectedPersonnel) return;

        const personnel = itPersonnel.find(p => p.id.toString() === selectedPersonnel);
        if (!personnel) return;

        const isReassignment = ticketToAssign.assigned_to !== null;
        const action = isReassignment ? 'reassign' : 'assign';
        const title = isReassignment ? 'Reassign Ticket?' : 'Assign Ticket?';
        const message = isReassignment 
            ? `Are you sure you want to reassign this ticket to ${personnel.name}?`
            : `Are you sure you want to assign this ticket to ${personnel.name}?`;

        showConfirmAlert(
            title,
            message,
            () => {
                post(`/tickets/${ticketToAssign.id}/${action}`, {
                    data: { assigned_to: selectedPersonnel },
                    onSuccess: () => {
                        setIsAssignModalOpen(false);
                        setTicketToAssign(null);
                        setSelectedPersonnel('');
                        showSuccessAlert(
                            'Success!',
                            `Ticket ${isReassignment ? 'reassigned' : 'assigned'} successfully.`
                        );
                    },
                    onError: () => {
                        showErrorAlert('Error!', `Failed to ${action} ticket.`);
                    }
                });
            }
        );
    };

    const confirmStatusUpdate = () => {
        if (!ticketToUpdateStatus || !selectedStatus) return;

        showConfirmAlert(
            'Update Status?',
            `Are you sure you want to change the status to ${selectedStatus}?`,
            () => {
                post(`/tickets/${ticketToUpdateStatus.id}/status`, {
                    data: { status: selectedStatus },
                    onSuccess: () => {
                        setIsStatusModalOpen(false);
                        setTicketToUpdateStatus(null);
                        setSelectedStatus('');
                        showSuccessAlert('Success!', 'Ticket status updated successfully.');
                    },
                    onError: () => {
                        showErrorAlert('Error!', 'Failed to update ticket status.');
                    }
                });
            }
        );
    };

    return {
        // State
        selectedTicket,
        isViewModalOpen,
        isAssignModalOpen,
        isStatusModalOpen,
        ticketToAssign,
        ticketToUpdateStatus,
        selectedPersonnel,
        selectedStatus,
        processing,
        
        // State setters
        setSelectedTicket,
        setIsViewModalOpen,
        setIsAssignModalOpen,
        setIsStatusModalOpen,
        setSelectedPersonnel,
        setSelectedStatus,
        
        // Actions
        viewTicketDetails,
        handleAssignTicket,
        handleStatusUpdate,
        confirmAssignment,
        confirmStatusUpdate
    };
};