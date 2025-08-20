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
import { Plus, Edit, Trash2, Tag, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

type Category = {
  id: number;
  name: string;
  description?: string;
  tickets_count?: number;
  created_at?: string;
  updated_at?: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

export default function Category({ categories = [] }: { categories?: Category[] }) {
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
    description: '',
  });

  const handleSave = () => {
    if (editingId !== null) {
      put(route('categories.update', editingId), {
        onSuccess: () => {
          router.visit(route('categories.index'));
          setIsDialogOpen(false);
          reset();
          setEditingId(null);
          showSuccessAlert('Updated!', 'Category has been updated successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to update category. Please check your input and try again.');
        }
      });
    } else {
      post(route('categories.store'), {
        onSuccess: () => {
          router.visit(route('categories.index'));
          setIsDialogOpen(false);
          reset();
          showSuccessAlert('Created!', 'New category has been created successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to create category. Please check your input and try again.');
        }
      });
    }
  };

  const handleEdit = (category: Category) => {
    setData({
      name: category.name,
      description: category.description || '',
    });
    setEditingId(category.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmAlert(
      'Delete Category',
      'Are you sure you want to delete this category? This action cannot be undone.',
      'Yes, delete it!',
      {},
      'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
    );

    if (result.isConfirmed) {
      router.delete(route('categories.destroy', id), {
        onSuccess: () => {
          showSuccessAlert('Deleted!', 'Category has been deleted successfully.');
        },
        onError: () => {
          showErrorAlert('Error!', 'Failed to delete category. Please try again.');
        }
      });
    }
  };

  const columns = [
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
            onClick={() => handleEdit(category)}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(category.id)}
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
      <Head title="Category Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Enhanced DataTable */}
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
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                  <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                {editingId ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <FormInputGroup
                id="name"
                name="name"
                label="Category Name"
                type="text"
                placeholder="e.g., Bug Report, Feature Request"
                required
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                icon={<Tag className="w-4 h-4" />}
              />

              <FormInputGroup
                id="description"
                name="description"
                label="Description"
                type="text"
                placeholder="Brief description of the category"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                icon={<List className="w-4 h-4" />}
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
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {editingId ? 'Updating...' : 'Creating...'}
                  </div>
                ) : (
                  editingId ? 'Update Category' : 'Create Category'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
