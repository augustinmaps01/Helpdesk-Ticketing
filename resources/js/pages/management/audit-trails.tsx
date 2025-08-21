import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Filter, RefreshCw, User, Settings, Shield, Database, AlertTriangle, Info, CheckCircle, XCircle, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Audit Trails',
        href: '/audit-trail',
    },
];

// Mock audit data for demonstration
const mockAuditLogs = [
    {
        id: 1,
        action: 'User Created',
        entity: 'User',
        entity_id: '15',
        user: 'Admin User',
        user_id: 1,
        details: 'Created new HR user: Jane Smith (jane@example.com)',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'info',
        timestamp: '2025-08-17 14:30:25',
        changes: {
            name: { old: null, new: 'Jane Smith' },
            email: { old: null, new: 'jane@example.com' },
            role: { old: null, new: 'admin' }
        }
    },
    {
        id: 2,
        action: 'User Updated',
        entity: 'User',
        entity_id: '12',
        user: 'Admin User',
        user_id: 1,
        details: 'Updated user role to Admin for John Doe',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'warning',
        timestamp: '2025-08-17 13:15:10',
        changes: {
            role: { old: 'user', new: 'admin' }
        }
    },
    {
        id: 3,
        action: 'Login Attempt',
        entity: 'Authentication',
        entity_id: null,
        user: 'HR User',
        user_id: 5,
        details: 'Successful login from HR User',
        ip_address: '192.168.1.105',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        severity: 'info',
        timestamp: '2025-08-17 12:45:30',
        changes: {}
    },
    {
        id: 4,
        action: 'Password Reset',
        entity: 'User',
        entity_id: '8',
        user: 'Admin User',
        user_id: 1,
        details: 'Password reset initiated for user: mike@example.com',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'warning',
        timestamp: '2025-08-17 11:20:15',
        changes: {
            password_reset_sent: { old: false, new: true }
        }
    },
    {
        id: 5,
        action: 'Failed Login',
        entity: 'Authentication',
        entity_id: null,
        user: 'Unknown',
        user_id: null,
        details: 'Failed login attempt for email: admin@fake.com',
        ip_address: '203.0.113.42',
        user_agent: 'curl/7.68.0',
        severity: 'error',
        timestamp: '2025-08-17 10:55:45',
        changes: {}
    },
    {
        id: 6,
        action: 'User Deleted',
        entity: 'User',
        entity_id: '22',
        user: 'Admin User',
        user_id: 1,
        details: 'Deleted user account: temp-user@example.com',
        ip_address: '192.168.1.100',
        user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        severity: 'error',
        timestamp: '2025-08-17 09:30:20',
        changes: {
            deleted: { old: false, new: true }
        }
    },
    {
        id: 7,
        action: 'Category Created',
        entity: 'Category',
        entity_id: '8',
        user: 'HR User',
        user_id: 5,
        details: 'Created new category: Hardware Issues',
        ip_address: '192.168.1.105',
        user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        severity: 'info',
        timestamp: '2025-08-17 08:15:30',
        changes: {
            name: { old: null, new: 'Hardware Issues' },
            description: { old: null, new: 'Issues related to hardware components' }
        }
    }
];

const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'error':
            return <XCircle className="w-4 h-4 text-red-500" />;
        case 'warning':
            return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
        case 'info':
            return <Info className="w-4 h-4 text-blue-500" />;
        default:
            return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
};

const getSeverityBadgeVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
        case 'error':
            return 'destructive';
        case 'warning':
            return 'secondary';
        case 'info':
            return 'default';
        default:
            return 'outline';
    }
};

const getActionIcon = (action: string) => {
    if (action.toLowerCase().includes('user')) return <User className="w-4 h-4" />;
    if (action.toLowerCase().includes('login') || action.toLowerCase().includes('auth')) return <Shield className="w-4 h-4" />;
    if (action.toLowerCase().includes('setting')) return <Settings className="w-4 h-4" />;
    return <Database className="w-4 h-4" />;
};

export default function AuditTrails() {
    const [searchTerm, setSearchTerm] = useState('');
    const [severityFilter, setSeverityFilter] = useState('all');
    const [actionFilter, setActionFilter] = useState('all');

    const filteredLogs = mockAuditLogs.filter(log => {
        const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            log.user.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSeverity = severityFilter === 'all' || log.severity.toLowerCase() === severityFilter;
        const matchesAction = actionFilter === 'all' || log.action.toLowerCase().includes(actionFilter.toLowerCase());
        
        return matchesSearch && matchesSeverity && matchesAction;
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Audit Trails" />
            
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Audit Trails
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Monitor system activities and user actions
                        </p>
                    </div>
                    <Button variant="outline" size="sm">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{mockAuditLogs.length}</div>
                            <p className="text-xs text-muted-foreground">Last 24 hours</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Errors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                {mockAuditLogs.filter(log => log.severity === 'error').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Needs attention</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-yellow-600">
                                {mockAuditLogs.filter(log => log.severity === 'warning').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Monitor closely</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium">Info Events</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                {mockAuditLogs.filter(log => log.severity === 'info').length}
                            </div>
                            <p className="text-xs text-muted-foreground">Normal activities</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filters & Search
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <Input
                                        placeholder="Search activities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>
                            <Select value={severityFilter} onValueChange={setSeverityFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Severity" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Severity</SelectItem>
                                    <SelectItem value="error">Error</SelectItem>
                                    <SelectItem value="warning">Warning</SelectItem>
                                    <SelectItem value="info">Info</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={actionFilter} onValueChange={setActionFilter}>
                                <SelectTrigger className="w-full sm:w-[180px]">
                                    <SelectValue placeholder="Action Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Actions</SelectItem>
                                    <SelectItem value="user">User Actions</SelectItem>
                                    <SelectItem value="login">Authentication</SelectItem>
                                    <SelectItem value="created">Created</SelectItem>
                                    <SelectItem value="updated">Updated</SelectItem>
                                    <SelectItem value="deleted">Deleted</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Audit Logs Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Activity Log</CardTitle>
                        <CardDescription>
                            Showing {filteredLogs.length} of {mockAuditLogs.length} activities
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Timestamp</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Details</TableHead>
                                        <TableHead>Severity</TableHead>
                                        <TableHead>IP Address</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredLogs.map((log) => (
                                        <TableRow key={log.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-4 h-4 text-gray-400" />
                                                    <div className="text-sm">
                                                        <div className="font-medium">{log.timestamp.split(' ')[1]}</div>
                                                        <div className="text-gray-500">{log.timestamp.split(' ')[0]}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getActionIcon(log.action)}
                                                    <span className="font-medium">{log.action}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <User className="w-4 h-4 text-gray-400" />
                                                    <span>{log.user}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="max-w-[300px] truncate" title={log.details}>
                                                    {log.details}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {getSeverityIcon(log.severity)}
                                                    <Badge variant={getSeverityBadgeVariant(log.severity)}>
                                                        {log.severity.toUpperCase()}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                                    {log.ip_address}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        
                        {filteredLogs.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-gray-500">No audit logs found matching your criteria.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
