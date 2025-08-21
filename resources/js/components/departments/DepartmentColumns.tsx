import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Building2 } from 'lucide-react';
import { Department } from '@/types/department';

interface DepartmentColumnsProps {
    onEdit: (department: Department) => void;
    onDelete: (id: number) => void;
}

export const useDepartmentColumns = ({ onEdit, onDelete }: DepartmentColumnsProps) => {
    return React.useMemo(() => [
        {
            id: 'id',
            header: 'ID',
            cell: (department: Department) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{department.id}</span>
                </div>
            ),
        },
        {
            id: 'name',
            header: 'Department Name',
            cell: (department: Department) => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center">
                        <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                        <div className="font-normal text-gray-900 dark:text-white">{department.name}</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (department: Department) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(department)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(department.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ], [onEdit, onDelete]);
};