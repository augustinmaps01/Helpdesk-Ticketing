import { useState, useCallback } from 'react';
import { useForm, router } from '@inertiajs/react';
import { showSuccessAlert, showErrorAlert, showConfirmAlert } from '@/utils/sweetAlert';
import { User, UserFormData } from '@/types/user';

const INITIAL_FORM_DATA: UserFormData = {
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
};

export const useUserOperations = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    
    const { data, setData, post, put, processing, errors, reset } = useForm<UserFormData>(INITIAL_FORM_DATA);

    const handleCreate = useCallback(() => {
        reset();
        setEditingId(null);
        setShowPassword(false);
        setShowPasswordConfirmation(false);
        setIsDialogOpen(true);
    }, [reset]);

    const handleEdit = useCallback((user: User) => {
        setData({
            name: user.name,
            email: user.email,
            role: user.role,
            password: '',
            password_confirmation: '',
        });
        setEditingId(user.id);
        setIsDialogOpen(true);
    }, [setData]);

    const handleSave = useCallback(() => {
        if (editingId !== null) {
            put(route('users.update', editingId), {
                onSuccess: () => {
                    showSuccessAlert('User Updated!', 'User account has been updated successfully.');
                    router.visit(route('users.index'));
                    setIsDialogOpen(false);
                    reset();
                    setEditingId(null);
                },
                onError: () => {
                    showErrorAlert('Update Failed', 'There was an error updating the user account. Please check the form and try again.');
                },
                onFinish: () => reset('password', 'password_confirmation'),
            });
        } else {
            post(route('users.store'), {
                onSuccess: () => {
                    showSuccessAlert('Account Created!', 'User account has been created successfully.');
                    router.visit(route('users.index'));
                    setIsDialogOpen(false);
                    reset();
                },
                onError: () => {
                    showErrorAlert('Creation Failed', 'There was an error creating the user account. Please check the form and try again.');
                },
                onFinish: () => reset('password', 'password_confirmation'),
            });
        }
    }, [editingId, put, post, reset, router]);

    const handleDelete = useCallback(async (id: number) => {
        const result = await showConfirmAlert(
            'Delete User?',
            'Are you sure you want to delete this user account? This action cannot be undone.',
            'Yes, delete it!',
            {
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
            }
        );

        if (result.isConfirmed) {
            router.delete(route('users.destroy', id), {
                onSuccess: () => {
                    showSuccessAlert('User Deleted!', 'User account has been deleted successfully.');
                },
                onError: () => {
                    showErrorAlert('Delete Failed', 'There was an error deleting the user account.');
                },
            });
        }
    }, [router]);

    const handlePasswordReset = useCallback(async (user: User) => {
        const result = await showConfirmAlert(
            'Reset Password?',
            `Send a password reset email to ${user.email}? The user will receive instructions to create a new password.`,
            'Yes, send reset email!',
            {},
            'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        );

        if (result.isConfirmed) {
            router.post(route('admin.password.reset'), {
                email: user.email,
                user_id: user.id,
            }, {
                onSuccess: () => {
                    showSuccessAlert('Reset Email Sent!', `Password reset email has been sent to ${user.email} successfully.`);
                },
                onError: () => {
                    showErrorAlert('Reset Failed', 'There was an error sending the password reset email.');
                },
            });
        }
    }, [router]);

    const handleCancel = useCallback(() => {
        reset();
        setEditingId(null);
        setShowPassword(false);
        setShowPasswordConfirmation(false);
        setIsDialogOpen(false);
    }, [reset]);

    return {
        // State
        isDialogOpen,
        editingId,
        data,
        processing,
        errors,
        showPassword,
        showPasswordConfirmation,
        
        // Actions
        handleCreate,
        handleEdit,
        handleSave,
        handleDelete,
        handlePasswordReset,
        handleCancel,
        setData,
        setShowPassword,
        setShowPasswordConfirmation,
        
        // Dialog controls
        setIsDialogOpen,
    };
};