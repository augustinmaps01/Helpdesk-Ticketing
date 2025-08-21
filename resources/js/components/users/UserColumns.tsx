import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, User as UserIcon, Mail, Crown, RotateCcw } from 'lucide-react';
import { User } from '@/types/user';

interface UserColumnsProps {
    onEdit: (user: User) => void;
    onDelete: (id: number) => void;
    onPasswordReset: (user: User) => void;
}

export const useUserColumns = ({ onEdit, onDelete, onPasswordReset }: UserColumnsProps) => {
    return React.useMemo(() => [
        {
            id: 'id',
            header: 'ID',
            cell: (user: User) => (
                <span className="font-medium text-gray-900 dark:text-white">{user.id}</span>
            ),
        },
        {
            id: 'name',
            header: 'Name',
            cell: (user: User) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg flex items-center justify-center">
                        <UserIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">User Account</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'email',
            header: 'Email Address',
            cell: (user: User) => (
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {user.email}
                    </span>
                </div>
            ),
        },
        {
            id: 'role',
            header: 'Role',
            cell: (user: User) => (
                <div className="flex items-center gap-2">
                    {user.role === 'admin' ? (
                        <Crown className="w-4 h-4 text-yellow-500" />
                    ) : (
                        <UserIcon className="w-4 h-4 text-blue-500" />
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                        {user.role.toUpperCase()}
                    </span>
                </div>
            ),
        },
        {
            id: 'created_at',
            header: 'Created Date',
            cell: (user: User) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    {new Date(user.created_at).toLocaleDateString()}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (user: User) => (
                <div className="flex items-center gap-1">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(user)}
                        className="h-8 w-8 p-0"
                        title="Edit User"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onPasswordReset(user)}
                        className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200 text-blue-600 border-blue-200"
                        title="Reset Password"
                    >
                        <RotateCcw className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(user.id)}
                        className="h-8 w-8 p-0"
                        title="Delete User"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ], [onEdit, onDelete, onPasswordReset]);
};