import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AuditLogEntry, PaginationState, SortState } from '@/types/audit-trail';
import { getActionIcon, getSeverityIcon, getSeverityBadgeVariant, getDeviceIcon } from '@/utils/audit-utils';
import { 
    Clock, 
    Settings, 
    User, 
    Zap, 
    ArrowUpDown, 
    FileText, 
    Eye,
    ChevronLeft,
    ChevronRight,
    Search
} from 'lucide-react';

interface AuditTableProps {
    logs: AuditLogEntry[];
    pagination: PaginationState;
    sort: SortState;
    onSort: (field: string) => void;
    onPageChange: (page: number) => void;
    onItemsPerPageChange: (items: number) => void;
    onViewDetails: (log: AuditLogEntry) => void;
}

export const AuditTable: React.FC<AuditTableProps> = ({
    logs,
    pagination,
    sort,
    onSort,
    onPageChange,
    onItemsPerPageChange,
    onViewDetails
}) => {
    const { currentPage, itemsPerPage, totalPages } = pagination;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(currentPage * itemsPerPage, logs.length);

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="shadow-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-500" />
                                Activity Log
                            </CardTitle>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {startIndex + 1}-{endIndex} of {logs.length} activities
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400">Items per page:</span>
                            <Select 
                                value={itemsPerPage.toString()} 
                                onValueChange={(value) => onItemsPerPageChange(Number(value))}
                            >
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5">5</SelectItem>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => onSort('timestamp')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4" />
                                            Timestamp
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => onSort('action')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Settings className="w-4 h-4" />
                                            Action
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => onSort('user')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            User
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead>Details</TableHead>
                                    <TableHead 
                                        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() => onSort('severity')}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            Severity
                                            <ArrowUpDown className="w-3 h-3" />
                                        </div>
                                    </TableHead>
                                    <TableHead>Device/IP</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <AnimatePresence>
                                    {logs.slice(startIndex, endIndex).map((log, index) => (
                                        <motion.tr
                                            key={log.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                        >
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                                    <div className="text-sm">
                                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                                            {log.timestamp.split(' ')[1]}
                                                        </div>
                                                        <div className="text-gray-500 text-xs">
                                                            {log.timestamp.split(' ')[0]}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                        {getActionIcon(log.action)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                                            {log.action}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {log.ticket_no || log.entity}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                        {log.user.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900 dark:text-gray-100">
                                                            {log.user}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {log.user_role} • {log.user_department}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px]">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100 truncate" title={log.details}>
                                                        {log.details}
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        {log.assigned_to && (
                                                            <div className="text-xs">
                                                                <span className="font-medium text-blue-600">Assigned to:</span>
                                                                <span className="ml-1 text-gray-600">{log.assigned_to}</span>
                                                            </div>
                                                        )}
                                                        {Object.keys(log.changes).length > 0 && (
                                                            <div className="text-xs text-blue-600 dark:text-blue-400">
                                                                {Object.keys(log.changes).length} field(s) changed
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getSeverityIcon(log.severity)}
                                                    <Badge 
                                                        variant={getSeverityBadgeVariant(log.severity)}
                                                        className="font-medium"
                                                    >
                                                        {log.severity.toUpperCase()}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        {getDeviceIcon(log.user_agent)}
                                                        <span className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                            {log.ip_address}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs text-gray-500 truncate max-w-[120px]" title={log.user_agent}>
                                                        {log.user_agent.split(' ')[0]}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => onViewDetails(log)}
                                                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20"
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </Button>
                                            </TableCell>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </TableBody>
                        </Table>
                    </div>
                    
                    {logs.length === 0 && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No audit logs found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search criteria or filters</p>
                        </motion.div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Page {currentPage} of {totalPages}
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Previous
                                </Button>
                                
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                        const pageNumber = Math.max(1, Math.min(totalPages, currentPage - 2 + i));
                                        return (
                                            <Button
                                                key={pageNumber}
                                                variant={currentPage === pageNumber ? "default" : "outline"}
                                                size="sm"
                                                onClick={() => onPageChange(pageNumber)}
                                                className="w-8 h-8 p-0"
                                            >
                                                {pageNumber}
                                            </Button>
                                        );
                                    })}
                                </div>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </motion.div>
    );
};