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
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

type Department = {
  id: number;
  name: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    href: '/departments',
  },
];

export default function Department({ departments = [] }: { departments?: Department[] }) {
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
      put(route('departments.update', editingId), {
        onSuccess: () => {
          router.visit(route('departments.index')); // Reload page to fetch fresh data
          setIsDialogOpen(false);
          reset();
          setEditingId(null);
          showSuccessAlert('Updated!', 'Department has been updated successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to update department. Please check your input and try again.');
        }
      });
    } else {
      post(route('departments.store'), {
        onSuccess: () => {
          router.visit(route('departments.index')); // Reload page to fetch fresh data
          setIsDialogOpen(false);
          reset();
          showSuccessAlert('Created!', 'New department has been created successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to create department. Please check your input and try again.');
        }
      });
    }
  };

  const handleEdit = (department: Department) => {
    setData({
      name: department.name,

    });
    setEditingId(department.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmAlert(
      'Delete Department',
      'Are you sure you want to delete this department? This action cannot be undone.',
      'Yes, delete it!',
      {},
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    );

    if (result.isConfirmed) {
      router.delete(route('departments.destroy', id), {
        onSuccess: () => {
          showSuccessAlert('Deleted!', 'Department has been deleted successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to delete department. Please try again.');
        }
      });
    }
  };

  const columns = [
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
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-b;ue-200 dark:from-blue-900 dark:to-blue-800 rounded-lg flex items-center justify-center">
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
            onClick={() => handleEdit(department)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(department.id)}
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
      <Head title="Department/Section Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">

        {/* Enhanced DataTable */}
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
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Department
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                {editingId ? 'Edit Department' : 'Create New Department'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <FormInputGroup
                id="name"
                name="name"
                label="Department Name"
                type="text"
                placeholder="e.g., Human Resources, IT Support"
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
                  editingId ? 'Update Department' : 'Create Department'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
