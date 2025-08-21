import React from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';
import { User as UserIcon, Eye, EyeOff, Crown, LoaderCircle } from 'lucide-react';
import { UserFormData } from '@/types/user';
import { PasswordValidation } from './PasswordValidation';

interface UserDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    data: UserFormData;
    setData: (field: string, value: string) => void;
    processing: boolean;
    errors: Record<string, string>;
    editingId: number | null;
    showPassword: boolean;
    setShowPassword: (show: boolean) => void;
    showPasswordConfirmation: boolean;
    setShowPasswordConfirmation: (show: boolean) => void;
}

export const UserDialog: React.FC<UserDialogProps> = React.memo(({
    isOpen,
    onOpenChange,
    onSave,
    onCancel,
    data,
    setData,
    processing,
    errors,
    editingId,
    showPassword,
    setShowPassword,
    showPasswordConfirmation,
    setShowPasswordConfirmation,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent size="md" className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <UserIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        {editingId ? 'Edit User' : 'Create New User'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email address</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Role</Label>
                        <Select value={data.role} onValueChange={(value) => setData('role', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">
                                    <div className="flex items-center gap-2">
                                        <Crown className="w-4 h-4 text-yellow-500" />
                                        Admin
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.role} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">
                            Password {!editingId && <span className="text-red-500">*</span>}
                        </Label>
                        <div className="relative group">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required={!editingId}
                                autoComplete="new-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder={editingId ? "Leave blank to keep current password" : "Password"}
                                className="pr-12 transition-all duration-200 group-hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary focus:outline-none transition-colors duration-200"
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                                tabIndex={-1}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: showPassword ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </motion.div>
                            </motion.button>
                        </div>
                        <InputError message={errors.password} />
                        
                        {(!editingId || (editingId && data.password)) && (
                            <PasswordValidation
                                password={data.password}
                                passwordConfirmation={data.password_confirmation}
                                editingId={editingId}
                            />
                        )}
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirm password {!editingId && <span className="text-red-500">*</span>}
                        </Label>
                        <div className="relative group">
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirmation ? 'text' : 'password'}
                                required={!editingId}
                                autoComplete="new-password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder={editingId ? "Confirm new password" : "Confirm password"}
                                className="pr-12 transition-all duration-200 group-hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <motion.button
                                type="button"
                                onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-primary focus:outline-none transition-colors duration-200"
                                aria-label={showPasswordConfirmation ? 'Hide password' : 'Show password'}
                                tabIndex={-1}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <motion.div
                                    initial={false}
                                    animate={{ rotate: showPasswordConfirmation ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {showPasswordConfirmation ? (
                                        <EyeOff className="h-5 w-5" />
                                    ) : (
                                        <Eye className="h-5 w-5" />
                                    )}
                                </motion.div>
                            </motion.button>
                        </div>
                        <InputError message={errors.password_confirmation} />
                    </div>
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-4">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSave}
                        disabled={processing}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        {editingId ? 'Update User' : 'Create Account'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});