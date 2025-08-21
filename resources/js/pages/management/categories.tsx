import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Category } from '@/types/category';
import { useCategoryOperations } from '@/hooks/useCategoryOperations';
import { useCategoryColumns } from '@/components/categories/CategoryColumns';
import { CategoryDataTable } from '@/components/categories/CategoryDataTable';
import { CategoryDialog } from '@/components/categories/CategoryDialog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Categories',
    href: '/categories',
  },
];

export default function Categories({ categories = [] }: { categories?: Category[] }) {
  const categoryOperations = useCategoryOperations();
  
  const columns = useCategoryColumns({
    onEdit: categoryOperations.handleEdit,
    onDelete: categoryOperations.handleDelete,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Category Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        <CategoryDataTable
          categories={categories}
          columns={columns}
          onCreateCategory={categoryOperations.handleCreate}
        />

        <CategoryDialog
          isOpen={categoryOperations.isDialogOpen}
          onOpenChange={categoryOperations.setIsDialogOpen}
          onSave={categoryOperations.handleSave}
          onCancel={categoryOperations.handleCancel}
          data={categoryOperations.data}
          setData={categoryOperations.setData}
          processing={categoryOperations.processing}
          editingId={categoryOperations.editingId}
        />
      </div>
    </AppLayout>
  );
}
