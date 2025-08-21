import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { ApprovalWorkflow } from './ApprovalWorkflow';
import { CreateTicketFormData, Branch, Department, Category, Role } from '@/utils/createTicketTypes';
import { getBranchName, getDepartmentName, getCategoryName, getRoleName } from '@/utils/createTicketHelpers';

interface ReviewSubmitStepProps {
    formData: CreateTicketFormData;
    branches: Branch[];
    departments: Department[];
    categories: Category[];
    roles: Role[];
}

export const ReviewSubmitStep: React.FC<ReviewSubmitStepProps> = React.memo(({
    formData,
    branches,
    departments,
    categories,
    roles,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 w-full max-w-full overflow-x-hidden"
        >
            <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Review & Submit
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Please review your information before submitting</p>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                <h4 className="font-medium text-foreground">Ticket Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.submitted_by || 'Not provided'}</span></div>
                    <div><span className="text-muted-foreground">Mobile:</span> <span className="font-medium">{formData.mobile_no || 'Not provided'}</span></div>
                    <div><span className="text-muted-foreground">Branch:</span> <span className="font-medium">{getBranchName(formData.branch, branches)}</span></div>
                    <div><span className="text-muted-foreground">Department:</span> <span className="font-medium">{getDepartmentName(formData.department, departments)}</span></div>
                    <div><span className="text-muted-foreground">Position:</span> <span className="font-medium">{getRoleName(formData.position, roles)}</span></div>
                    <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{getCategoryName(formData.category, categories)}</span></div>
                    <div><span className="text-muted-foreground">Subject:</span> <span className="font-medium">{formData.subject || 'Not provided'}</span></div>
                    <div><span className="text-muted-foreground">Priority:</span> <span className={`font-medium ${
                        formData.priority === 'high' ? 'text-red-600' :
                        formData.priority === 'medium' ? 'text-yellow-600' :
                        formData.priority === 'low' ? 'text-green-600' : ''
                    }`}>{formData.priority ? formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1) : 'Not selected'}</span></div>
                </div>
            </div>

            {/* Approval Workflow Preview */}
            <ApprovalWorkflow priority={formData.priority} />

            <div className="flex items-center justify-center p-6 border-2 border-dashed border-primary/30 rounded-xl">
                <div className="text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Ready to submit your ticket</p>
                </div>
            </div>
        </motion.div>
    );
});