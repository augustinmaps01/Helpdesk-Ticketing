import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import { motion } from 'framer-motion';

// Types
import { type TicketsProps } from '@/types/ticket';

// Hooks
import { useTicketOperations } from '@/hooks/useTicketOperations';

// Components
import { TicketDetailsDialog } from '@/components/tickets/TicketDetailsDialog';
import { TicketAssignmentDialog } from '@/components/tickets/TicketAssignmentDialog';
import { TicketStatusDialog } from '@/components/tickets/TicketStatusDialog';
import { useTicketTableColumns } from '@/components/tickets/TicketTableColumns';

// Mock data (remove this when integrating with real data)
import { mockTickets, mockITPersonnel, mockCategories } from '@/data/mockTickets';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tickets',
        href: '/tickets',
    },
];

export default function TicketsPage({ 
    tickets = mockTickets, 
    itPersonnel = mockITPersonnel, 
    categories = mockCategories 
}: TicketsProps) {
    const {
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
    } = useTicketOperations();

    // Get table columns with handlers
    const columns = useTicketTableColumns({
        viewTicketDetails,
        handleAssignTicket,
        handleStatusUpdate
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tickets" />
            
            <div className="space-y-6">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
                        <p className="text-muted-foreground">
                            Manage and track all IT support tickets
                        </p>
                    </div>
                </motion.div>

                {/* Tickets Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    <DataTable
                        data={tickets}
                        columns={columns}
                        searchKey="subject"
                        searchPlaceholder="Search tickets..."
                    />
                </motion.div>
            </div>

            {/* Ticket Details Modal */}
            <TicketDetailsDialog
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                ticket={selectedTicket}
            />

            {/* Assignment Modal */}
            <TicketAssignmentDialog
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                ticket={ticketToAssign}
                itPersonnel={itPersonnel}
                selectedPersonnel={selectedPersonnel}
                onPersonnelChange={setSelectedPersonnel}
                onConfirm={() => confirmAssignment(itPersonnel)}
                processing={processing}
            />

            {/* Status Update Modal */}
            <TicketStatusDialog
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                ticket={ticketToUpdateStatus}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                onConfirm={confirmStatusUpdate}
                processing={processing}
            />
        </AppLayout>
    );
}