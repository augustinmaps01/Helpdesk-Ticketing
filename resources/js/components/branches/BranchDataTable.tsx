import React from 'react';
import { motion } from 'framer-motion';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Branch } from '@/types/branch';

interface BranchDataTableProps {
    branches: Branch[];
    columns: any[];
    onCreateBranch: () => void;
}

export const BranchDataTable: React.FC<BranchDataTableProps> = React.memo(({
    branches,
    columns,
    onCreateBranch,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataTable
                data={branches}
                columns={columns}
                title="Branch Management"
                subtitle="Manage your organization branches and locations"
                searchPlaceholder="Search branches..."
                emptyMessage="No branches found"
                actions={
                    <Button
                        onClick={onCreateBranch}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Branch
                    </Button>
                }
            />
        </motion.div>
    );
});