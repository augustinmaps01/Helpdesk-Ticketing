import { useState, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';

type Role = {
    id: number;
    name: string;
};

type RoleFormData = {
    name: string;
};

const INITIAL_FORM_DATA: RoleFormData = {
    name: '',
};

export const useRoleOperations = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const { data, setData, post, put, processing, reset } = useForm<RoleFormData>(INITIAL_FORM_DATA);

    const handleCreate = useCallback(() => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    }, [reset]);

    const handleEdit = useCallback((role: Role) => {
        setData({
            name: role.name,
        });
        setEditingId(role.id);
        setIsDialogOpen(true);
    }, [setData]);

    const handleSave = useCallback(() => {
        if (editingId !== null) {
            put(route('roles.update', editingId), {
                onSuccess: () => {
                    router.visit(route('roles.index'));
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
                    router.visit(route('roles.index'));
                    setIsDialogOpen(false);
                    reset();
                    showSuccessAlert('Created!', 'New role has been created successfully.');
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to create role. Please check your input and try again.');
                }
            });
        }
    }, [editingId, put, post, reset, router]);

    const handleDelete = useCallback(async (id: number) => {
        const result = await showConfirmAlert(
            'Delete Role',
            'Are you sure you want to delete this role? This action cannot be undone.',
            'Yes, delete it!',
            {},
            'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        );
        
        if (result.isConfirmed) {
            router.delete(route('roles.destroy', id), {
                onSuccess: (response) => {
                    console.log('Delete success response:', response);
                    showSuccessAlert('Deleted!', 'Role has been deleted successfully.');
                    setTimeout(() => {
                        window.location.href = route('roles.index');
                    }, 1000);
                },
                onError: (errors) => {
                    console.error('Delete error response:', errors);
                    let errorMessage = 'Failed to delete role. Please try again.';
                    
                    // Handle validation errors or specific error messages
                    if (errors && typeof errors === 'object') {
                        if (errors.message) {
                            errorMessage = errors.message;
                        } else if (errors.error) {
                            errorMessage = errors.error;
                        } else {
                            // Handle Laravel validation errors
                            const firstError = Object.values(errors)[0];
                            if (Array.isArray(firstError) && firstError[0]) {
                                errorMessage = firstError[0];
                            }
                        }
                    }
                    
                    showErrorAlert('Error!', errorMessage);
                }
            });
        }
    }, [router]);

    const handleCancel = useCallback(() => {
        reset();
        setEditingId(null);
        setIsDialogOpen(false);
    }, [reset]);

    return {
        // State
        isDialogOpen,
        editingId,
        data,
        processing,
        
        // Actions
        handleCreate,
        handleEdit,
        handleSave,
        handleDelete,
        handleCancel,
        setData,
        
        // Dialog controls
        setIsDialogOpen,
    };
};