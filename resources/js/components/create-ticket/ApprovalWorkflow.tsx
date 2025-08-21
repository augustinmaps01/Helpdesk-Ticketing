import React from 'react';
import { AlertCircle } from 'lucide-react';
import { APPROVAL_REQUIREMENTS } from '@/utils/createTicketConstants';

interface ApprovalWorkflowProps {
    priority: string;
}

export const ApprovalWorkflow: React.FC<ApprovalWorkflowProps> = React.memo(({ priority }) => {
    if (!priority) return null;

    const approvalConfig = APPROVAL_REQUIREMENTS[priority as keyof typeof APPROVAL_REQUIREMENTS];

    return (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Approval Workflow for {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
            </h4>

            <div className="space-y-4">
                {/* Step 1: Submission */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        ✓
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-sm">1. Ticket Submission</div>
                        <div className="text-xs text-muted-foreground">Your ticket will be submitted to the system</div>
                    </div>
                </div>

                {/* Step 2: Approval */}
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                        priority === 'high' ? 'border-red-500 text-red-600' :
                        priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                        'border-green-500 text-green-600'
                    }`}>
                        2
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-sm">
                            2. Approval Required - {approvalConfig.approver}
                        </div>
                        <div className="text-xs text-muted-foreground">
                            {priority === 'high' && 'Requires executive-level approval due to business critical impact'}
                            {priority === 'medium' && 'Requires managerial approval for operational impact'}
                            {priority === 'low' && 'Requires departmental approval for standard requests'}
                        </div>
                    </div>
                </div>

                {/* Step 3: Processing */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                        3
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-sm text-gray-500">3. IT Team Assignment</div>
                        <div className="text-xs text-muted-foreground">Once approved, ticket will be assigned to IT team</div>
                    </div>
                </div>

                {/* Step 4: Resolution */}
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                        4
                    </div>
                    <div className="flex-1">
                        <div className="font-medium text-sm text-gray-500">4. Issue Resolution</div>
                        <div className="text-xs text-muted-foreground">IT team will work on resolving your issue</div>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <div className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                    💡 Estimated Timeline: {approvalConfig.timeline}
                </div>
            </div>
        </div>
    );
});