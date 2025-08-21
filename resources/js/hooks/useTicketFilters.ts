import { useState, useMemo } from 'react';
import { Ticket } from '@/types/ticket';

export const useTicketFilters = (tickets: Ticket[]) => {
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [categoryFilter, setCategoryFilter] = useState<string>('all');

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
            const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
            const matchesCategory = categoryFilter === 'all' || ticket.category_id.toString() === categoryFilter;
            return matchesStatus && matchesPriority && matchesCategory;
        });
    }, [tickets, statusFilter, priorityFilter, categoryFilter]);

    const clearFilters = () => {
        setStatusFilter('all');
        setPriorityFilter('all');
        setCategoryFilter('all');
    };

    return {
        statusFilter,
        priorityFilter,
        categoryFilter,
        filteredTickets,
        setStatusFilter,
        setPriorityFilter,
        setCategoryFilter,
        clearFilters,
    };
};