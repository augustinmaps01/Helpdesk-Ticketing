import {
    Clock,
    UserCheck,
    CheckCircle,
    CheckCircle2,
    XCircle,
    RefreshCw,
    AlertTriangle,
} from 'lucide-react';

export const STATUS_CONFIG = {
    pending: { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200', 
        icon: Clock,
        rgb: { r: 251, g: 191, b: 36 }
    },
    approved: { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200', 
        icon: CheckCircle,
        rgb: { r: 59, g: 130, b: 246 }
    },
    in_progress: { 
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200', 
        icon: RefreshCw,
        rgb: { r: 59, g: 130, b: 246 }
    },
    resolved: { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200', 
        icon: CheckCircle,
        rgb: { r: 34, g: 197, b: 94 }
    },
    closed: { 
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200', 
        icon: XCircle,
        rgb: { r: 107, g: 114, b: 128 }
    },
    rejected: { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200', 
        icon: XCircle,
        rgb: { r: 239, g: 68, b: 68 }
    },
} as const;

export const PRIORITY_CONFIG = {
    low: {
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        rgb: { r: 34, g: 197, b: 94 }
    },
    medium: {
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        rgb: { r: 251, g: 191, b: 36 }
    },
    high: {
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        rgb: { r: 239, g: 68, b: 68 }
    },
} as const;

export type TicketStatus = keyof typeof STATUS_CONFIG;
export type TicketPriority = keyof typeof PRIORITY_CONFIG;