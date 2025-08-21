import { User, FileText, CheckCircle2 } from 'lucide-react';
import { PriorityOption, StepConfig, CreateTicketFormData } from '@/utils/createTicketTypes';

export const INITIAL_FORM_DATA: CreateTicketFormData = {
    // Step 1 - Personal Info
    submitted_by: '',
    mobile_no: '',
    branch: '',
    department: '',
    position: '',
    // Step 2 - Ticket Details
    subject: '',
    category: '',
    priority: '',
    description: '',
    requires_approval: false,
    screenshot: null
};

export const STEPS_CONFIG: StepConfig[] = [
    { id: 1, title: "Personal Info", icon: User },
    { id: 2, title: "Ticket Details", icon: FileText },
    { id: 3, title: "Review & Submit", icon: CheckCircle2 }
];

export const PRIORITY_OPTIONS: PriorityOption[] = [
    { label: "Low", value: "low", color: "green", desc: "Not urgent" },
    { label: "Medium", value: "medium", color: "yellow", desc: "Moderate impact" },
    { label: "High", value: "high", color: "red", desc: "Business critical" },
];

export const APPROVAL_REQUIREMENTS = {
    low: {
        approver: 'Manager/BLU Head',
        description: 'Requires approval by Manager/BLU Head',
        timeline: '1-2 business days (after approval)'
    },
    medium: {
        approver: 'Manager',
        description: 'Requires approval by Manager',
        timeline: '4-8 hours (after approval)'
    },
    high: {
        approver: 'President',
        description: 'Requires approval by President',
        timeline: '1-2 hours (after approval)'
    }
};