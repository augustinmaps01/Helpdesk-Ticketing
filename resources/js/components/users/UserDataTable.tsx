import React from 'react';
import { motion } from 'framer-motion';
import DataTable from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { User } from '@/types/user';

interface UserDataTableProps {
    users: User[];
    columns: any[];
    onCreateUser: () => void;
}

export const UserDataTable: React.FC<UserDataTableProps> = React.memo(({
    users,
    columns,
    onCreateUser,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <DataTable
                data={users}
                columns={columns}
                title="User Management"
                subtitle="Manage system users and administrator accounts"
                searchPlaceholder="Search users..."
                emptyMessage="No users found"
                actions={
                    <Button
                        onClick={onCreateUser}
                        className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add User
                    </Button>
                }
            />
        </motion.div>
    );
});