import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Building } from 'lucide-react';
import { Branch } from '@/types/branch';

interface BranchColumnsProps {
    onEdit: (branch: Branch) => void;
    onDelete: (id: number) => void;
}

export const useBranchColumns = ({ onEdit, onDelete }: BranchColumnsProps) => {
    return React.useMemo(() => [
        {
            id: 'id',
            header: 'ID',
            cell: (branch: Branch) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{branch.id}</span>
                </div>
            ),
        },
        {
            id: 'branch_name',
            header: 'Branch Name',
            cell: (branch: Branch) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{branch.branch_name}</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'brak',
            header: 'BR/AR Number',
            cell: (branch: Branch) => (
                <div className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        {branch.brak}
                    </span>
                </div>
            ),
        },
        {
            id: 'brcode',
            header: 'Branch Code',
            cell: (branch: Branch) => (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {branch.brcode}
                </span>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (branch: Branch) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(branch)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(branch.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ], [onEdit, onDelete]);
};