import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryColumnsProps {
    onEdit: (category: Category) => void;
    onDelete: (id: number) => void;
}

export const useCategoryColumns = ({ onEdit, onDelete }: CategoryColumnsProps) => {
    return React.useMemo(() => [
        {
            id: 'id',
            header: 'ID',
            cell: (category: Category) => (
                <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">{category.id}</span>
                </div>
            ),
        },
        {
            id: 'name',
            header: 'Category Name',
            cell: (category: Category) => (
                <div className="flex items-center gap-3">
                    <div>
                        <div className="font-semibold text-gray-900 dark:text-white">{category.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{category.description || 'No description'}</div>
                    </div>
                </div>
            ),
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: (category: Category) => (
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(category)}
                        className="h-8 w-8 p-0"
                    >
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(category.id)}
                        className="h-8 w-8 p-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ], [onEdit, onDelete]);
};