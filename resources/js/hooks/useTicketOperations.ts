import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { type Ticket, type ITPersonnel } from '@/types/ticket';

export const useTicketOperations = (itPersonnelArray: ITPersonnel[]) => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [ticketToAssign, setTicketToAssign] = useState<Ticket | null>(null);
    const [ticketToUpdateStatus, setTicketToUpdateStatus] = useState<Ticket | null>(null);

    const { data, setData, post, processing } = useForm({
        assigned_to: '',
        status: '',
    });

    const viewTicketDetails = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsDetailModalOpen(true);
    };

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

    const handleStatusUpdate = (ticket: Ticket) => {
        console.log('handleStatusUpdate called with ticket:', ticket);
        setTicketToUpdateStatus(ticket);
        setData({
            assigned_to: ticket.assigned_to?.toString() || 'unassigned',
            status: ticket.status,
        });
        setIsStatusModalOpen(true);
    };

    const submitAssignment = async () => {
        if (!ticketToAssign) return;

        if (!data.status) {
            showErrorAlert('Validation Error', 'Please select a status for the ticket.');
            return;
        }

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

        try {
            console.log('Submitting assignment:', {
                ticket_id: ticketToAssign.id,
                assigned_to: data.assigned_to === 'unassigned' ? null : data.assigned_to,
                status: data.status,
                assigned_at: new Date().toISOString(),
            });

            setIsAssignModalOpen(false);
            setTicketToAssign(null);
            const successMessage = assignedPerson
                ? `Ticket successfully assigned to ${assignedPerson.name}!`
                : 'Ticket assignment removed successfully!';
            showSuccessAlert('Assignment Updated', successMessage);
        } catch (error) {
            console.error('Assignment error:', error);
            showErrorAlert('Assignment Failed', 'Failed to update ticket assignment. Please try again.');
        }
    };

    const submitStatusUpdate = async () => {
        if (!ticketToUpdateStatus) return;

        if (!data.status) {
            showErrorAlert('Validation Error', 'Please select a status for the ticket.');
            return;
        }

        const result = await showConfirmAlert(
            'Update Status',
            `Are you sure you want to change the ticket status to ${data.status}?`
        );

        if (!result.isConfirmed) return;

        try {
            console.log('Submitting status update:', {
                ticket_id: ticketToUpdateStatus.id,
                status: data.status,
                updated_at: new Date().toISOString(),
            });

            setIsStatusModalOpen(false);
            setTicketToUpdateStatus(null);
            showSuccessAlert('Status Updated', `Ticket status successfully updated to ${data.status}!`);
        } catch (error) {
            console.error('Status update error:', error);
            showErrorAlert('Update Failed', 'Failed to update ticket status. Please try again.');
        }
    };

    const closeDetailModal = () => setIsDetailModalOpen(false);
    const closeAssignModal = () => setIsAssignModalOpen(false);
    const closeStatusModal = () => setIsStatusModalOpen(false);

    return {
        // State
        selectedTicket,
        isDetailModalOpen,
        isAssignModalOpen,
        isStatusModalOpen,
        ticketToAssign,
        ticketToUpdateStatus,
        data,
        processing,
        // Actions
        viewTicketDetails,
        handleAssignTicket,
        handleStatusUpdate,
        submitAssignment,
        submitStatusUpdate,
        closeDetailModal,
        closeAssignModal,
        closeStatusModal,
        setData,
    };
};