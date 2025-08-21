import { useState, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { Branch, BranchFormData } from '@/types/branch';

const INITIAL_FORM_DATA: BranchFormData = {
    branch_name: '',
    brak: '',
    brcode: '',
};

export const useBranchOperations = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const { data, setData, post, put, processing, reset } = useForm<BranchFormData>(INITIAL_FORM_DATA);

    const handleCreate = useCallback(() => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    }, [reset]);

    const handleEdit = useCallback((branch: Branch) => {
        setData({
            branch_name: branch.branch_name,
            brak: branch.brak,
            brcode: branch.brcode,
        });
        setEditingId(branch.id);
        setIsDialogOpen(true);
    }, [setData]);

    const handleSave = useCallback(() => {
        if (editingId !== null) {
            put(route('branches.update', editingId), {
                onSuccess: () => {
                    router.visit(route('branches.index'));
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
                    router.visit(route('branches.index'));
                    setIsDialogOpen(false);
                    reset();
                    showSuccessAlert('Created!', 'New branch has been created successfully.');
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to create branch. Please check your input and try again.');
                }
            });
        }
    }, [editingId, put, post, reset, router]);

    const handleDelete = useCallback(async (id: number) => {
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
                    setTimeout(() => {
                        window.location.href = route('branches.index');
                    }, 1000);
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to delete branch. Please try again.');
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