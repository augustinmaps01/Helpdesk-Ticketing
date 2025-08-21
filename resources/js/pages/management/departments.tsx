import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Department } from '@/types/department';
import { useDepartmentOperations } from '@/hooks/useDepartmentOperations';
import { useDepartmentColumns } from '@/components/departments/DepartmentColumns';
import { DepartmentDataTable } from '@/components/departments/DepartmentDataTable';
import { DepartmentDialog } from '@/components/departments/DepartmentDialog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Departments',
    href: '/departments',
  },
];

export default function Departments({ departments = [] }: { departments?: Department[] }) {
  const departmentOperations = useDepartmentOperations();
  
  const columns = useDepartmentColumns({
    onEdit: departmentOperations.handleEdit,
    onDelete: departmentOperations.handleDelete,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Department/Section Management" />

      <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        <DepartmentDataTable
          departments={departments}
          columns={columns}
          onCreateDepartment={departmentOperations.handleCreate}
        />

        <DepartmentDialog
          isOpen={departmentOperations.isDialogOpen}
          onOpenChange={departmentOperations.setIsDialogOpen}
          onSave={departmentOperations.handleSave}
          onCancel={departmentOperations.handleCancel}
          data={departmentOperations.data}
          setData={departmentOperations.setData}
          processing={departmentOperations.processing}
          editingId={departmentOperations.editingId}
        />
      </div>
    </AppLayout>
  );
}
