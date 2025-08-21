import React, { useMemo, useCallback } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import { motion } from 'framer-motion';
import { TicketDetailModal } from '@/components/tickets/TicketDetailModal';
import { TicketAssignModal } from '@/components/tickets/TicketAssignModal';
import { TicketStatusModal } from '@/components/tickets/TicketStatusModal';
import { TicketFilters } from '@/components/tickets/TicketFilters';
import { useTicketColumns } from '@/components/tickets/TicketColumns';
import { useTicketOperations } from '@/hooks/useTicketOperations';
import { useTicketFilters } from '@/hooks/useTicketFilters';
import { exportTicketToPDF } from '@/utils/pdfExport';
import { printTicket } from '@/utils/printTicket';
import { mockTickets, mockITPersonnel, mockCategories } from '@/data/mockTickets';

import { Ticket, ITPersonnel, Category } from '@/types/ticket';

interface TicketsProps {
    tickets?: Ticket[];
    itPersonnel?: ITPersonnel[];
    categories?: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tickets',
        href: '/tickets',
    },
];

export default function Tickets({
    tickets = mockTickets,
    itPersonnel = mockITPersonnel,
    categories = mockCategories
}: TicketsProps) {
    // Ensure all data is always an array
    const ticketsArray = useMemo(() => Array.isArray(tickets) ? tickets : mockTickets, [tickets]);
    const itPersonnelArray = useMemo(() => Array.isArray(itPersonnel) ? itPersonnel : mockITPersonnel, [itPersonnel]);
    const categoriesArray = useMemo(() => Array.isArray(categories) ? categories : mockCategories, [categories]);

    // Custom hooks for ticket operations and filtering
    const ticketOperations = useTicketOperations(itPersonnelArray);
    const { filteredTickets, ...filterProps } = useTicketFilters(ticketsArray);

    // Table columns configuration
    const columns = useTicketColumns({
        onViewDetails: ticketOperations.viewTicketDetails,
        onAssignTicket: ticketOperations.handleAssignTicket,
        onStatusUpdate: ticketOperations.handleStatusUpdate,
    });

    // Handle PDF export and print - memoized callbacks
    const handleExportPDF = useCallback((ticket: Ticket) => exportTicketToPDF(ticket), []);
    const handlePrint = useCallback((ticket: Ticket) => printTicket(ticket), []);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ticket Management" />

            <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                </motion.div>



                {/* Tickets Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <DataTable
                        data={filteredTickets}
                        columns={columns}
                        title="Support Ticket"
                        subtitle="Manage and track all support tickets"
                        searchPlaceholder="Search tickets by number, subject, or submitter..."
                        emptyMessage="No tickets found matching your criteria"
                        filters={
                            <TicketFilters
                                statusFilter={filterProps.statusFilter}
                                priorityFilter={filterProps.priorityFilter}
                                categoryFilter={filterProps.categoryFilter}
                                categories={categoriesArray}
                                onStatusFilterChange={filterProps.setStatusFilter}
                                onPriorityFilterChange={filterProps.setPriorityFilter}
                                onCategoryFilterChange={filterProps.setCategoryFilter}
                                onClearFilters={filterProps.clearFilters}
                            />
                        }
                    />
                </motion.div>

                {/* Modals */}
                <TicketDetailModal
                    isOpen={ticketOperations.isDetailModalOpen}
                    onClose={ticketOperations.closeDetailModal}
                    ticket={ticketOperations.selectedTicket}
                    onExportPDF={handleExportPDF}
                    onPrint={handlePrint}
                />

                <TicketAssignModal
                    isOpen={ticketOperations.isAssignModalOpen}
                    onClose={ticketOperations.closeAssignModal}
                    ticket={ticketOperations.ticketToAssign}
                    itPersonnel={itPersonnelArray}
                    assignedTo={ticketOperations.data?.assigned_to || ''}
                    status={ticketOperations.data?.status || ''}
                    processing={ticketOperations.processing}
                    onAssignedToChange={(value) => ticketOperations.setData('assigned_to', value)}
                    onStatusChange={(value) => ticketOperations.setData('status', value)}
                    onSubmit={ticketOperations.submitAssignment}
                />

                <TicketStatusModal
                    isOpen={ticketOperations.isStatusModalOpen}
                    onClose={ticketOperations.closeStatusModal}
                    ticket={ticketOperations.ticketToUpdateStatus}
                    status={ticketOperations.data?.status || ''}
                    processing={ticketOperations.processing}
                    onStatusChange={(value) => ticketOperations.setData('status', value)}
                    onSubmit={ticketOperations.submitStatusUpdate}
                />
            </div>
        </AppLayout>
    );
}
