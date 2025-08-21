import { useState, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { Department, DepartmentFormData } from '@/types/department';

const INITIAL_FORM_DATA: DepartmentFormData = {
    name: '',
};

export const useDepartmentOperations = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const { data, setData, post, put, processing, reset } = useForm<DepartmentFormData>(INITIAL_FORM_DATA);

    const handleCreate = useCallback(() => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    }, [reset]);

    const handleEdit = useCallback((department: Department) => {
        setData({
            name: department.name,
        });
        setEditingId(department.id);
        setIsDialogOpen(true);
    }, [setData]);

    const handleSave = useCallback(() => {
        if (editingId !== null) {
            put(route('departments.update', editingId), {
                onSuccess: () => {
                    router.visit(route('departments.index'));
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
                    router.visit(route('departments.index'));
                    setIsDialogOpen(false);
                    reset();
                    showSuccessAlert('Created!', 'New department has been created successfully.');
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to create department. Please check your input and try again.');
                }
            });
        }
    }, [editingId, put, post, reset, router]);

    const handleDelete = useCallback(async (id: number) => {
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
                    setTimeout(() => {
                        window.location.href = route('departments.index');
                    }, 1000);
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to delete department. Please try again.');
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