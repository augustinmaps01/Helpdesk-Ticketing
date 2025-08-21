// Create Ticket Types
export interface Category {
    id: number;
    name: string;
    description?: string;
    icon?: string;
}

export interface Branch {
    id: number;
    branch_name: string;
}

export interface Department {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface CreateTicketFormData {
    // Step 1 - Personal Info
    submitted_by: string;
    mobile_no: string;
    branch: string;
    department: string;
    position: string;
    // Step 2 - Ticket Details
    subject: string;
    category: string;
    priority: string;
    description: string;
    requires_approval: boolean;
    screenshot: File | null;
}

export interface CreateUserTicketProps {
    categories: Category[];
    branches: Branch[];
    departments: Department[];
    roles: Role[];
}

export interface PriorityOption {
    label: string;
    value: string;
    color: string;
    desc: string;
}

export interface StepConfig {
    id: number;
    title: string;
    icon: any;
}