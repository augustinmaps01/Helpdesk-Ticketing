// Common types used across pages

// Base Entity Types
export interface BaseEntity {
  id: number;
  created_at?: string;
  updated_at?: string;
}

// Branch Related Types
export interface Branch extends BaseEntity {
  branch_name: string;
  brak: string;
  brcode: string;
}

// Department Related Types
export interface Department extends BaseEntity {
  name: string;
  description?: string;
  branch_id?: number;
  branch?: Branch;
}

// Category Related Types
export interface Category extends BaseEntity {
  name: string;
  description?: string;
  color?: string;
}

// Role Related Types
export interface Role extends BaseEntity {
  name: string;
  permissions?: string[];
}

// User Related Types
export interface User extends BaseEntity {
  name: string;
  email: string;
  role_id?: number;
  role?: Role;
  department_id?: number;
  department?: Department;
  branch_id?: number;
  branch?: Branch;
}

// Ticket Related Types
export interface Ticket extends BaseEntity {
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Pending' | 'Closed';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  category_id?: number;
  category?: Category;
  assigned_to?: number;
  assignee?: User;
  created_by: number;
  creator?: User;
}

// Audit Trail Types
export interface AuditTrail extends BaseEntity {
  user_id: number;
  user?: User;
  action: string;
  entity_type: string;
  entity_id: number;
  old_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
}

// Form Data Types
export interface BranchFormData {
  branch_name: string;
  brak: string;
  brcode: string;
}

export interface DepartmentFormData {
  name: string;
  description?: string;
  branch_id?: number;
}

export interface CategoryFormData {
  name: string;
  description?: string;
  color?: string;
}

export interface RoleFormData {
  name: string;
  permissions?: string[];
}

export interface TicketFormData {
  title: string;
  description: string;
  priority: Ticket['priority'];
  category_id?: number;
}

// Page Props Types
export interface PageProps<T = {}> {
  auth?: {
    user: User;
  };
  flash?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
} & T

// Common List Page Props
export interface ListPageProps<T> extends PageProps {
  data: T[];
  meta?: {
    current_page: number;
    total: number;
    per_page: number;
    last_page: number;
  };
}

// Dashboard Props
export interface DashboardProps extends PageProps {
  stats?: {
    total_tickets: number;
    open_tickets: number;
    closed_tickets: number;
    pending_tickets: number;
  };
  recent_tickets?: Ticket[];
}