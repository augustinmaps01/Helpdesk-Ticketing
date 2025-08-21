import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AuditLogEntry } from '@/types/audit-trail';
import { getActionIcon, getSeverityIcon, getSeverityBadgeVariant, getDeviceIcon } from '@/utils/audit-utils';
import { 
    Activity, 
    Ticket, 
    Clock,
    FileText 
} from 'lucide-react';

interface AuditDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    log: AuditLogEntry | null;
}

export const AuditDetailModal: React.FC<AuditDetailModalProps> = ({
    isOpen,
    onClose,
    log
}) => {
    if (!log) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent size="xl" className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" />
                        Audit Log Details
                    </DialogTitle>
                    <DialogDescription>
                        Detailed information about this audit log entry
                    </DialogDescription>
                </DialogHeader>
                
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="changes">Changes</TabsTrigger>
                        <TabsTrigger value="technical">Technical</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Ticket Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Ticket className="w-5 h-5 text-blue-500" />
                                        <div>
                                            <div className="font-medium">{log.ticket_no || log.entity_id}</div>
                                            <div className="text-sm text-gray-500">{log.action}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getSeverityIcon(log.severity)}
                                        <Badge variant={getSeverityBadgeVariant(log.severity)}>
                                            {log.severity.toUpperCase()}
                                        </Badge>
                                    </div>
                                    {log.assigned_to && (
                                        <div className="text-sm">
                                            <div className="font-medium mb-1">Currently Assigned To</div>
                                            <div className="text-blue-600 font-medium">{log.assigned_to}</div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">User Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                            {log.user.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium">{log.user}</div>
                                            <div className="text-sm text-gray-500">{log.user_role}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-1">Department</div>
                                        <div className="text-gray-600">{log.user_department}</div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-1">User ID</div>
                                        <div className="text-gray-600">{log.user_id || 'N/A'}</div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Timestamp</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <div className="font-medium">{log.timestamp.split(' ')[1]}</div>
                                            <div className="text-sm text-gray-500">{log.timestamp.split(' ')[0]}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm">
                                        <div className="font-medium mb-1">Action Performed</div>
                                        <div className="text-gray-600">{new Date(log.timestamp).toLocaleString()}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">Activity Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{log.details}</p>
                                
                                {/* Show key status changes */}
                                {(log.changes.status || log.changes.priority || log.changes.assigned_to) && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Key Changes</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {log.changes.status && (
                                                <div className="text-sm">
                                                    <span className="font-medium">Status:</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-red-600">{log.changes.status.old || 'None'}</span>
                                                        <span>→</span>
                                                        <span className="text-green-600">{log.changes.status.new}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {log.changes.priority && (
                                                <div className="text-sm">
                                                    <span className="font-medium">Priority:</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-red-600">{log.changes.priority.old || 'None'}</span>
                                                        <span>→</span>
                                                        <span className="text-green-600">{log.changes.priority.new}</span>
                                                    </div>
                                                </div>
                                            )}
                                            {log.changes.assigned_to && (
                                                <div className="text-sm">
                                                    <span className="font-medium">Assignment:</span>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-red-600">{log.changes.assigned_to.old || 'Unassigned'}</span>
                                                        <span>→</span>
                                                        <span className="text-green-600">{log.changes.assigned_to.new}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                    
                    <TabsContent value="changes" className="space-y-4">
                        {Object.keys(log.changes).length > 0 ? (
                            <div className="space-y-3">
                                {Object.entries(log.changes).map(([field, change]: [string, any]) => (
                                    <Card key={field}>
                                        <CardContent className="pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="font-medium capitalize">{field.replace('_', ' ')}</span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <div className="text-sm font-medium text-red-600 mb-1">Before</div>
                                                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded border">
                                                        <code className="text-sm">{change.old || 'null'}</code>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-sm font-medium text-green-600 mb-1">After</div>
                                                    <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded border">
                                                        <code className="text-sm">{change.new}</code>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500">No changes recorded for this action</p>
                            </div>
                        )}
                    </TabsContent>
                    
                    <TabsContent value="technical" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">Network Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <div className="text-sm font-medium mb-1">IP Address</div>
                                        <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                            {log.ip_address}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium mb-1">Device Type</div>
                                        <div className="flex items-center gap-2">
                                            {getDeviceIcon(log.user_agent)}
                                            <span className="text-sm">
                                                {log.user_agent.includes('Mobile') ? 'Mobile Device' : 'Desktop'}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-sm">System Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <div className="text-sm font-medium mb-1">Log ID</div>
                                        <div className="font-mono text-sm">{log.id}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium mb-1">Entity ID</div>
                                        <div className="font-mono text-sm">{log.entity_id || 'N/A'}</div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                        
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-sm">User Agent</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="font-mono text-sm bg-gray-100 dark:bg-gray-700 p-3 rounded break-all">
                                    {log.user_agent}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};