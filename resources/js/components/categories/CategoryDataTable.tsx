import React from 'react';
import { motion } from 'framer-motion';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Category } from '@/types/category';

interface CategoryDataTableProps {
    categories: Category[];
    columns: any[];
    onCreateCategory: () => void;
}

export const CategoryDataTable: React.FC<CategoryDataTableProps> = React.memo(({
    categories,
    columns,
    onCreateCategory,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataTable
                data={categories}
                columns={columns}
                title="Category Management"
                subtitle="Organize and manage your ticket categories"
                searchPlaceholder="Search categories..."
                emptyMessage="No categories found"
                actions={
                    <Button
                        onClick={onCreateCategory}
                        className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Category
                    </Button>
                }
            />
        </motion.div>
    );
});