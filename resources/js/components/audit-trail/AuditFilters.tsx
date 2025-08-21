import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FilterState } from '@/types/audit-trail';
import { 
    Filter, 
    Search, 
    Calendar, 
    Zap, 
    Settings,
    XCircle,
    AlertTriangle,
    Info
} from 'lucide-react';

interface AuditFiltersProps {
    filters: FilterState;
    onFiltersChange: (filters: Partial<FilterState>) => void;
    onClearFilters: () => void;
}

export const AuditFilters: React.FC<AuditFiltersProps> = ({
    filters,
    onFiltersChange,
    onClearFilters
}) => {
    const hasActiveFilters = filters.searchTerm || 
                           filters.severityFilter !== 'all' || 
                           filters.actionFilter !== 'all' || 
                           filters.dateFilter !== 'all';

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-blue-500" />
                        Advanced Filters & Search
                    </CardTitle>
                    <CardDescription>
                        Use filters to narrow down audit logs and find specific activities
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div className="lg:col-span-2 xl:col-span-1">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <Input
                                    placeholder="Search activities, users, details..."
                                    value={filters.searchTerm}
                                    onChange={(e) => onFiltersChange({ searchTerm: e.target.value })}
                                    className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Date Range</label>
                            <Select 
                                value={filters.dateFilter} 
                                onValueChange={(value) => onFiltersChange({ dateFilter: value })}
                            >
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Date Range" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="week">Last 7 Days</SelectItem>
                                    <SelectItem value="month">Last 30 Days</SelectItem>
                                    <SelectItem value="quarter">Last 3 Months</SelectItem>
                                    <SelectItem value="year">Last Year</SelectItem>
                                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50 dark:bg-gray-800">
                                        Current Year Months
                                    </div>
                                    <SelectItem value="january">January 2025</SelectItem>
                                    <SelectItem value="february">February 2025</SelectItem>
                                    <SelectItem value="march">March 2025</SelectItem>
                                    <SelectItem value="april">April 2025</SelectItem>
                                    <SelectItem value="may">May 2025</SelectItem>
                                    <SelectItem value="june">June 2025</SelectItem>
                                    <SelectItem value="july">July 2025</SelectItem>
                                    <SelectItem value="august">August 2025</SelectItem>
                                    <SelectItem value="september">September 2025</SelectItem>
                                    <SelectItem value="october">October 2025</SelectItem>
                                    <SelectItem value="november">November 2025</SelectItem>
                                    <SelectItem value="december">December 2025</SelectItem>
                                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-50 dark:bg-gray-800">
                                        Custom Range
                                    </div>
                                    <SelectItem value="custom">Custom Date Range</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Severity</label>
                            <Select 
                                value={filters.severityFilter} 
                                onValueChange={(value) => onFiltersChange({ severityFilter: value })}
                            >
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                    <Zap className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severity</SelectItem>
                                    <SelectItem value="error">
                                        <div className="flex items-center gap-2">
                                            <XCircle className="w-4 h-4 text-red-500" />
                                            Error
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="warning">
                                        <div className="flex items-center gap-2">
                                            <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                            Warning
                                        </div>
                                    </SelectItem>
                                    <SelectItem value="info">
                                        <div className="flex items-center gap-2">
                                            <Info className="w-4 h-4 text-blue-500" />
                                            Info
                                        </div>
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Action Type</label>
                            <Select 
                                value={filters.actionFilter} 
                                onValueChange={(value) => onFiltersChange({ actionFilter: value })}
                            >
                                <SelectTrigger className="bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-600">
                                    <Settings className="w-4 h-4 mr-2" />
                                    <SelectValue placeholder="Action Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="ticket created">Ticket Creation</SelectItem>
                                    <SelectItem value="ticket assigned">Ticket Assignment</SelectItem>
                                    <SelectItem value="ticket status">Status Changes</SelectItem>
                                    <SelectItem value="ticket priority">Priority Changes</SelectItem>
                                    <SelectItem value="ticket closed">Ticket Closure</SelectItem>
                                    <SelectItem value="ticket reopened">Ticket Reopened</SelectItem>
                                    <SelectItem value="approval">Approval Process</SelectItem>
                                    <SelectItem value="comment">Comments & Notes</SelectItem>
                                    <SelectItem value="emergency">Emergency Tickets</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Custom Date Range Inputs */}
                    {filters.dateFilter === 'custom' && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Custom Date Range</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">Start Date</label>
                                    <Input
                                        type="date"
                                        value={filters.customDateStart}
                                        onChange={(e) => onFiltersChange({ customDateStart: e.target.value })}
                                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">End Date</label>
                                    <Input
                                        type="date"
                                        value={filters.customDateEnd}
                                        onChange={(e) => onFiltersChange({ customDateEnd: e.target.value })}
                                        className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                                    />
                                </div>
                            </div>
                            {filters.customDateStart && filters.customDateEnd && (
                                <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                                    Filtering from {new Date(filters.customDateStart).toLocaleDateString()} to {new Date(filters.customDateEnd).toLocaleDateString()}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Active filters:</span>
                                {filters.searchTerm && (
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                                        Search: {filters.searchTerm}
                                    </Badge>
                                )}
                                {filters.severityFilter !== 'all' && (
                                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300">
                                        Severity: {filters.severityFilter}
                                    </Badge>
                                )}
                                {filters.actionFilter !== 'all' && (
                                    <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300">
                                        Action: {filters.actionFilter}
                                    </Badge>
                                )}
                                {filters.dateFilter !== 'all' && (
                                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300">
                                        Date: {filters.dateFilter === 'custom' && filters.customDateStart && filters.customDateEnd 
                                            ? `${new Date(filters.customDateStart).toLocaleDateString()} - ${new Date(filters.customDateEnd).toLocaleDateString()}`
                                            : filters.dateFilter.charAt(0).toUpperCase() + filters.dateFilter.slice(1)}
                                    </Badge>
                                )}
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={onClearFilters}
                                    className="text-xs h-6"
                                >
                                    Clear all
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};