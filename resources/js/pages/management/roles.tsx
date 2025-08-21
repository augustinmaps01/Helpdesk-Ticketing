import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FormInputGroup from '@/components/FormInputGroup';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRoleOperations } from '@/hooks/useRoleOperations';

type Role = {
  id: number;
  name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Roles',
    href: '/roles',
  },
];

export default function Role({ roles = [] }: { roles?: Role[] }) {
  const roleOperations = useRoleOperations();



  const columns = [
    {
      id: 'id',
      header: 'ID',
      cell: (role: Role) => (
        <span className="text-gray-900 dark:text-white">{role.id}</span>
      ),
    },
    {
      id: 'name',
      header: 'Role Name',
      cell: (role: Role) => (
        <div className="text-gray-900 dark:text-white">{role.name}</div>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (role: Role) => (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => roleOperations.handleEdit(role)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => roleOperations.handleDelete(role.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Role Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Enhanced DataTable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DataTable
            data={roles}
            columns={columns}
            title="Role Management"
            subtitle="Manage user roles and permissions in your organization"
            searchPlaceholder="Search roles..."
            emptyMessage="No roles found"
            actions={
              <Button
                onClick={roleOperations.handleCreate}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={roleOperations.isDialogOpen} onOpenChange={roleOperations.setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                {roleOperations.editingId ? 'Edit Role' : 'Create New Role'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <FormInputGroup
                id="name"
                name="name"
                label="Role Name"
                type="text"
                placeholder="e.g., Administrator, Manager, Support"
                required
                value={roleOperations.data.name}
                onChange={(e) => roleOperations.setData('name', e.target.value)}

              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={roleOperations.handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={roleOperations.handleSave}
                disabled={roleOperations.processing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {roleOperations.processing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {roleOperations.editingId ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  roleOperations.editingId ? 'Update Role' : 'Create Role'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
