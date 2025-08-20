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
import { Plus, Edit, Trash2, Building } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

type Branch = {
  id: number;
  branch_name: string;
  brak: string;
  brcode: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Branch',
    href: '/branches',
  },
];

export default function Branch({ branches }: { branches: Branch[] }) {
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
    branch_name: '',
    brak: '',
    brcode: '',
  });

    const handleSave = () => {
    if (editingId !== null) {
        put(route('branches.update', editingId), {
        onSuccess: () => {
            router.visit(route('branches.index')); // Reload page to fetch fresh data
            setIsDialogOpen(false);
            reset();
            setEditingId(null);
            showSuccessAlert('Updated!', 'Branch has been updated successfully.');
        },
        onError: () => {
            showErrorAlert('Error!', 'Failed to update branch. Please check your input and try again.');
        }
        });
    } else {
        post(route('branches.store'), {
        onSuccess: () => {
            router.visit(route('branches.index')); // Reload page to fetch fresh data
            setIsDialogOpen(false);
            reset();
            showSuccessAlert('Created!', 'New branch has been created successfully.');
        },
        onError: () => {
            showErrorAlert('Error!', 'Failed to create branch. Please check your input and try again.');
        }
        });
    }
    };

  const handleEdit = (branch: Branch) => {
    setData({
      branch_name: branch.branch_name,
      brak: branch.brak,
      brcode: branch.brcode,
    });
    setEditingId(branch.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmAlert(
      'Delete Branch',
      'Are you sure you want to delete this branch? This action cannot be undone.',
      'Yes, delete it!',
      {},
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    );
    
    if (result.isConfirmed) {
      router.delete(route('branches.destroy', id), {
        onSuccess: () => {
          showSuccessAlert('Deleted!', 'Branch has been deleted successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to delete branch. Please try again.');
        }
      });
    }
  };

  const columns = [
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
            onClick={() => handleEdit(branch)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(branch.id)}
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
      <Head title="Branch Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">

        {/* Enhanced DataTable */}
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
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Branch
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                {editingId ? 'Edit Branch' : 'Create New Branch'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <FormInputGroup
                id="branch_name"
                name="branch_name"
                label="Branch Name"
                type="text"
                placeholder="e.g., Main Office, North Branch"
                required
                value={data.branch_name}
                onChange={(e) => setData('branch_name', e.target.value)}

              />

              <FormInputGroup
                id="brak"
                name="brak"
                label="BR/AR Number"
                type="text"
                placeholder="e.g., BR001, AR002"
                required
                value={data.brak}
                onChange={(e) => setData('brak', e.target.value)}
              />

              <FormInputGroup
                id="brcode"
                name="brcode"
                label="Branch Code"
                type="text"
                placeholder="e.g., MN, NB, SB"
                required
                value={data.brcode}
                onChange={(e) => setData('brcode', e.target.value)}
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
                  editingId ? 'Update Branch' : 'Create Branch'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
