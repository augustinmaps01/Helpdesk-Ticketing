import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { User } from '@/types/user';
import { useUserOperations } from '@/hooks/useUserOperations';
import { useUserColumns } from '@/components/users/UserColumns';
import { UserDataTable } from '@/components/users/UserDataTable';
import { UserDialog } from '@/components/users/UserDialog';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

export default function Users({ users }: { users: User[] }) {
  const userOperations = useUserOperations();
  
  const columns = useUserColumns({
    onEdit: userOperations.handleEdit,
    onDelete: userOperations.handleDelete,
    onPasswordReset: userOperations.handlePasswordReset,
  });

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        <UserDataTable
          users={users}
          columns={columns}
          onCreateUser={userOperations.handleCreate}
        />

        <UserDialog
          isOpen={userOperations.isDialogOpen}
          onOpenChange={userOperations.setIsDialogOpen}
          onSave={userOperations.handleSave}
          onCancel={userOperations.handleCancel}
          data={userOperations.data}
          setData={userOperations.setData}
          processing={userOperations.processing}
          errors={userOperations.errors}
          editingId={userOperations.editingId}
          showPassword={userOperations.showPassword}
          setShowPassword={userOperations.setShowPassword}
          showPasswordConfirmation={userOperations.showPasswordConfirmation}
          setShowPasswordConfirmation={userOperations.setShowPasswordConfirmation}
        />
      </div>
    </AppLayout>
  );
}
