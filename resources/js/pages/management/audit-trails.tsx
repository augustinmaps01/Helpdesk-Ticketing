import React, { useState, useMemo } from 'react';
import { Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { AuditFilters } from '@/components/audit-trail/AuditFilters';
import { AuditTable } from '@/components/audit-trail/AuditTable';
import { AuditDetailModal } from '@/components/audit-trail/AuditDetailModal';
import { type BreadcrumbItem } from '@/types';
import { AuditLogEntry, FilterState, PaginationState, SortState } from '@/types/audit-trail';
import { mockAuditLogs } from '@/data/audit-log-data';
import { filterAuditLogs, sortAuditLogs, getTotalPages } from '@/utils/audit-utils';
import { Activity, Download, RefreshCw } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Audit Trails',
        href: '/audit-trails',
    },
];

export default function AuditTrails() {
    // Filter state
    const [filters, setFilters] = useState<FilterState>({
        searchTerm: '',
        severityFilter: 'all',
        actionFilter: 'all',
        dateFilter: 'all',
        customDateStart: '',
        customDateEnd: ''
    });

    // Pagination state
    const [pagination, setPagination] = useState<PaginationState>({
        currentPage: 1,
        itemsPerPage: 10,
        totalPages: 1
    });

    // Sort state
    const [sort, setSort] = useState<SortState>({
        field: 'timestamp' as keyof AuditLogEntry,
        direction: 'desc'
    });

    // Modal state
    const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    // Filtering and sorting logic
    const processedLogs = useMemo(() => {
        const filtered = filterAuditLogs(
            mockAuditLogs,
            filters.searchTerm,
            filters.severityFilter,
            filters.actionFilter,
            filters.dateFilter,
            filters.customDateStart,
            filters.customDateEnd
        );

        const sorted = sortAuditLogs(filtered, sort.field, sort.direction);
        const totalPages = getTotalPages(sorted.length, pagination.itemsPerPage);

        // Update pagination if current page exceeds total pages
        if (pagination.currentPage > totalPages && totalPages > 0) {
            setPagination(prev => ({ ...prev, currentPage: 1, totalPages }));
        } else {
            setPagination(prev => ({ ...prev, totalPages }));
        }

        return sorted;
    }, [filters, sort, pagination.itemsPerPage, pagination.currentPage]);

    // Event handlers
    const handleFiltersChange = (newFilters: Partial<FilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleClearFilters = () => {
        setFilters({
            searchTerm: '',
            severityFilter: 'all',
            actionFilter: 'all',
            dateFilter: 'all',
            customDateStart: '',
            customDateEnd: ''
        });
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleSort = (field: string) => {
        setSort(prev => ({
            field: field as keyof AuditLogEntry,
            direction: prev.field === field ? (prev.direction === 'asc' ? 'desc' : 'asc') : 'asc'
        }));
    };

    const handlePageChange = (page: number) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
    };

    const handleItemsPerPageChange = (items: number) => {
        setPagination(prev => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
    };

    const handleViewDetails = (log: AuditLogEntry) => {
        setSelectedLog(log);
        setShowDetailModal(true);
    };

    const handleCloseModal = () => {
        setShowDetailModal(false);
        setSelectedLog(null);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Audit Trails" />

            <div className="space-y-6 p-6">
                {/* Enhanced Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800/30"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                            <Activity className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Audit Trails
                            </h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Track all ticket activities, status changes, assignments, and user interactions in your IT helpdesk system
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </motion.div>

                {/* Filters Component */}
                <AuditFilters
                    filters={filters}
                    onFiltersChange={handleFiltersChange}
                    onClearFilters={handleClearFilters}
                />

                {/* Table Component */}
                <AuditTable
                    logs={processedLogs}
                    pagination={pagination}
                    sort={sort}
                    onSort={handleSort}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                    onViewDetails={handleViewDetails}
                />

                {/* Detail Modal Component */}
                <AuditDetailModal
                    isOpen={showDetailModal}
                    onClose={handleCloseModal}
                    log={selectedLog}
                />
            </div>
        </AppLayout>
    );
}
