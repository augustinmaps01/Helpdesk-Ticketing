import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, XCircle } from 'lucide-react';
import { Category } from '@/types/ticket';

interface TicketFiltersProps {
    statusFilter: string;
    priorityFilter: string;
    categoryFilter: string;
    categories: Category[];
    onStatusFilterChange: (value: string) => void;
    onPriorityFilterChange: (value: string) => void;
    onCategoryFilterChange: (value: string) => void;
    onClearFilters: () => void;
}

export const TicketFilters: React.FC<TicketFiltersProps> = React.memo(({
    statusFilter,
    priorityFilter,
    categoryFilter,
    categories,
    onStatusFilterChange,
    onPriorityFilterChange,
    onCategoryFilterChange,
    onClearFilters,
}) => {
    return (
        <div className="flex flex-wrap gap-2 items-center">
            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
                <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                    <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent className="z-50">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={priorityFilter} onValueChange={onPriorityFilterChange}>
                <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                    <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="z-50">
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
                <SelectTrigger className="w-40 h-9 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="z-50 max-h-60">
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(category => (
                        <SelectItem key={category.id} value={category.id.toString()}>
                            {category.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1"></div>

            {/* Action Buttons */}
            <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <Download className="w-3 h-3 mr-1" />
                Export
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <RefreshCw className="w-3 h-3 mr-1" />
                Refresh
            </Button>

            {/* Clear Filters Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="h-9 px-3 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
                <XCircle className="w-3 h-3 mr-1" />
                Clear
            </Button>
        </div>
    );
});