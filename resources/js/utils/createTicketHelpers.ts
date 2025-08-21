import { Branch, Department, Category, Role } from '@/utils/createTicketTypes';

// Helper functions to get names by ID
export const getBranchName = (branchId: string, branches: Branch[]): string => {
    const branch = branches.find(b => b.id.toString() === branchId);
    return branch ? branch.branch_name : 'Not selected';
};

export const getDepartmentName = (departmentId: string, departments: Department[]): string => {
    const department = departments.find(d => d.id.toString() === departmentId);
    return department ? department.name : 'Not selected';
};

export const getCategoryName = (categoryId: string, categories: Category[]): string => {
    const category = categories.find(c => c.id.toString() === categoryId);
    return category ? category.name : 'Not selected';
};

export const getRoleName = (roleId: string, roles: Role[]): string => {
    const role = roles.find(r => r.id.toString() === roleId);
    return role ? role.name : 'Not selected';
};

// Helper function to get category icons
export const getCategoryIcon = (category: Category): string => {
    // Use the icon from database if available
    if (category.icon) {
        return category.icon;
    }

    // Fallback to hardcoded icons based on category name
    const iconMap: { [key: string]: string } = {
        'Hardware Issues': '🖥️',
        'Software Problems': '💻',
        'Network/Internet': '🌐',
        'Account/Access': '🔐',
        'Mobile/Phone': '📱',
        'Printer/Scanner': '🖨️',
        'Email Issues': '📧',
        'Other': '🆘'
    };
    return iconMap[category.name] || '📋';
};