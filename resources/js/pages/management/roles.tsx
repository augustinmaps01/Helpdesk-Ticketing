import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
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
import { router } from '@inertiajs/react';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

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
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);

  const {
    data,
    setData,
    post,
    put,
    processing,
    reset,
  } = useForm({
    name: '',
  });


  const handleSave = () => {
    if (editingId !== null) {
      put(route('roles.update', editingId), {
        onSuccess: () => {
          router.visit(route('roles.index')); // Reload page to fetch fresh data
          setIsDialogOpen(false);
          reset();
          setEditingId(null);
          showSuccessAlert('Updated!', 'Role has been updated successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to update role. Please check your input and try again.');
        }
      });
    } else {
      post(route('roles.store'), {
        onSuccess: () => {
          router.visit(route('roles.index')); // Reload page to fetch fresh data
          setIsDialogOpen(false);
          reset();
          showSuccessAlert('Created!', 'New role has been created successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to create role. Please check your input and try again.');
        }
      });
    }
  };

  const handleEdit = (role: Role) => {
    setData({
      name: role.name,
    });
    setEditingId(role.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (role: Role) => {
    const result = await showConfirmAlert(
      'Delete Role',
      `Are you sure you want to delete the role "${role.name}"? This action cannot be undone.`,
      'Yes, delete it!',
      {},
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    );

    if (result.isConfirmed) {
      router.delete(route('roles.destroy', role.id), {
        onSuccess: () => {
          showSuccessAlert('Deleted!', 'Role has been deleted successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to delete role. Please try again.');
        }
      });
    }
  };

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
            onClick={() => handleEdit(role)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(role)}
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
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Role
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                </div>
                {editingId ? 'Edit Role' : 'Create New Role'}
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
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}

              />
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-4">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => {
                    reset();
                    setEditingId(null);
                    setIsDialogOpen(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                disabled={processing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {editingId ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  editingId ? 'Update Role' : 'Create Role'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
