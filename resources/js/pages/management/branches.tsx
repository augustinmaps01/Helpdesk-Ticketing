import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Branch } from '@/types/branch';
import { useBranchOperations } from '@/hooks/useBranchOperations';
import { useBranchColumns } from '@/components/branches/BranchColumns';
import { BranchDataTable } from '@/components/branches/BranchDataTable';
import { BranchDialog } from '@/components/branches/BranchDialog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Branch',
    href: '/branches',
  },
];

export default function Branches({ branches }: { branches: Branch[] }) {
  const branchOperations = useBranchOperations();
  
  const columns = useBranchColumns({
    onEdit: branchOperations.handleEdit,
    onDelete: branchOperations.handleDelete,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Branch Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        <BranchDataTable
          branches={branches}
          columns={columns}
          onCreateBranch={branchOperations.handleCreate}
        />

        <BranchDialog
          isOpen={branchOperations.isDialogOpen}
          onOpenChange={branchOperations.setIsDialogOpen}
          onSave={branchOperations.handleSave}
          onCancel={branchOperations.handleCancel}
          data={branchOperations.data}
          setData={branchOperations.setData}
          processing={branchOperations.processing}
          editingId={branchOperations.editingId}
        />
      </div>
    </AppLayout>
  );
}
