import React from 'react';
import { motion } from 'framer-motion';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Department } from '@/types/department';

interface DepartmentDataTableProps {
    departments: Department[];
    columns: any[];
    onCreateDepartment: () => void;
}

export const DepartmentDataTable: React.FC<DepartmentDataTableProps> = React.memo(({
    departments,
    columns,
    onCreateDepartment,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataTable
                data={departments}
                columns={columns}
                title="Department | Section Management"
                subtitle="Manage your organization departments and Sections"
                searchPlaceholder="Search departments..."
                emptyMessage="No departments found"
                actions={
                    <Button
                        onClick={onCreateDepartment}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Department
                    </Button>
                }
            />
        </motion.div>
    );
});