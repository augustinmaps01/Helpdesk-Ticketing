import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    TicketIcon,
    Download,
    Printer,
    Tag,
    User,
    UserCheck,
    CheckCircle,
    Clock,
    Eye,
    Calendar,
    RefreshCw,
    Users,
    Building,
    MapPin,
} from 'lucide-react';
import { Ticket } from '@/types/ticket';
import { getStatusBadge, getPriorityBadge } from '@/utils/ticketBadges';

interface TicketDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: Ticket | null;
    onExportPDF: (ticket: Ticket) => void;
    onPrint: (ticket: Ticket) => void;
}

export const TicketDetailModal: React.FC<TicketDetailModalProps> = React.memo(({
    isOpen,
    onClose,
    ticket,
    onExportPDF,
    onPrint,
}) => {
    if (!ticket) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent size="xl" className="max-w-6xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <DialogTitle className="flex items-center gap-2">
                                <TicketIcon className="w-5 h-5 text-blue-600" />
                                Ticket Details - {ticket.ticket_no}
                            </DialogTitle>
                            <DialogDescription>
                                View detailed information about this support ticket
                            </DialogDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onExportPDF(ticket)}
                                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900"
                            >
                                <Download className="w-4 h-4" />
                                Export PDF
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPrint(ticket)}
                                className="flex items-center gap-2 hover:bg-gray-50 hover:border-gray-300 dark:hover:bg-gray-700"
                            >
                                <Printer className="w-4 h-4" />
                                Print
                            </Button>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Ticket Number</Label>
                                <p className="text-lg font-mono font-bold text-blue-900 dark:text-blue-100">{ticket.ticket_no}</p>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Current Status</Label>
                                <div className="mt-1">{getStatusBadge(ticket.status)}</div>
                            </div>
                            <div>
                                <Label className="text-sm font-medium text-blue-700 dark:text-blue-300">Priority Level</Label>
                                <div className="mt-1">{getPriorityBadge(ticket.priority)}</div>
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold">Ticket Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Subject
                                    </Label>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg font-medium">
                                        {ticket.subject}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Description
                                    </Label>
                                    <Textarea
                                        className="mt-1"
                                        value={ticket.description}
                                        readOnly
                                        placeholder="No description provided."
                                    />
                                </div>
                                <div>
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Tag className="w-4 h-4" />
                                        Category
                                    </Label>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{ticket.category?.name}</p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium">Requires Approval</Label>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${ticket.requires_approval
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            }`}>
                                            {ticket.requires_approval ? 'Yes' : 'No'}
                                        </span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Submitted By
                                </Label>
                                <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg space-y-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {ticket.submitter?.name}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {ticket.submitter?.email}
                                        </p>
                                        {ticket.submitter?.mobile_no && (
                                            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                                📱 {ticket.submitter.mobile_no}
                                            </p>
                                        )}
                                    </div>
                                    {ticket.submitter?.position && (
                                        <div className="flex items-center gap-1">
                                            <Users className="w-3 h-3 text-blue-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                                                {ticket.submitter.position}
                                            </span>
                                        </div>
                                    )}
                                    {ticket.submitter?.department && (
                                        <div className="flex items-center gap-1">
                                            <Building className="w-3 h-3 text-green-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-300">
                                                {ticket.submitter.department.name} Department
                                            </span>
                                        </div>
                                    )}
                                    {ticket.submitter?.branch && (
                                        <div className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3 text-purple-500" />
                                            <span className="text-xs text-gray-600 dark:text-gray-300">
                                                {ticket.submitter.branch.name}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Assignment & Status Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <UserCheck className="w-5 h-5" />
                                    Assignment Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Assigned To</Label>
                                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        {ticket.assignee ? (
                                            <div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {ticket.assignee.name}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {ticket.assignee.email}
                                                </p>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Not assigned yet</p>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Approval Information Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" />
                                    Approval Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium">Approval Status</Label>
                                    <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                        {ticket.status === 'approved' ? (
                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="font-medium">Approved</span>
                                            </div>
                                        ) : ticket.requires_approval ? (
                                            <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                                                <Clock className="w-4 h-4" />
                                                <span className="font-medium">Pending Approval</span>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="font-medium">No Approval Required</span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {ticket.approver && (
                                    <div>
                                        <Label className="text-sm font-medium flex items-center gap-2">
                                            <User className="w-4 h-4" />
                                            Approved By
                                        </Label>
                                        <div className="mt-1 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-medium">
                                                    {ticket.approver.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {ticket.approver.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {ticket.approver.email}
                                                    </p>
                                                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                                                        {ticket.approver.role}
                                                    </p>
                                                    {ticket.approved_at && (
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            Approved on {new Date(ticket.approved_at).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    Timeline & Dates
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Created Date
                                    </Label>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        {new Date(ticket.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm font-medium flex items-center gap-2">
                                        <RefreshCw className="w-4 h-4" />
                                        Last Updated
                                    </Label>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                                        {new Date(ticket.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Image Section */}
                    {ticket.image && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Screenshot/Attachment
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                                    <img
                                        src={ticket.image}
                                        alt="Ticket attachment"
                                        className="max-w-full h-auto rounded-lg shadow-sm"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
});