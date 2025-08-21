import { useState, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { Category, CategoryFormData } from '@/types/category';

const INITIAL_FORM_DATA: CategoryFormData = {
    name: '',
    description: '',
};

export const useCategoryOperations = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    
    const { data, setData, post, put, processing, reset } = useForm<CategoryFormData>(INITIAL_FORM_DATA);

    const handleCreate = useCallback(() => {
        reset();
        setEditingId(null);
        setIsDialogOpen(true);
    }, [reset]);

    const handleEdit = useCallback((category: Category) => {
        setData({
            name: category.name,
            description: category.description || '',
        });
        setEditingId(category.id);
        setIsDialogOpen(true);
    }, [setData]);

    const handleSave = useCallback(() => {
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
    }, [editingId, put, post, reset, router]);

    const handleDelete = useCallback(async (id: number) => {
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
                    setTimeout(() => {
                        window.location.href = route('categories.index');
                    }, 1000);
                },
                onError: () => {
                    showErrorAlert('Error!', 'Failed to delete category. Please try again.');
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