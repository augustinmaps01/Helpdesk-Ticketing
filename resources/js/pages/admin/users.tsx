import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import DataTable from '@/components/data-table';
import * as React from 'react';
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
import { router } from '@inertiajs/react';
import { Plus, Edit, Trash2, User, Mail, Hash, LoaderCircle, Eye, EyeOff, Check, X, Shield, Key, RotateCcw, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import { showSuccessAlert, showConfirmAlert, showErrorAlert } from '@/utils/sweetAlert';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  created_at: string;
};

type UserForm = {
  name: string;
  email: string;
  role: string;
  password: string;
  password_confirmation: string;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Users',
    href: '/users',
  },
];

export default function Users({ users }: { users: User[] }) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<number | null>(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

  const {
    data,
    setData,
    post,
    put,
    processing,
    errors,
    reset,
  } = useForm<Required<UserForm>>({
    name: '',
    email: '',
    role: '',
    password: '',
    password_confirmation: '',
  });

  // Password validation checker (moved after useForm)
  const checkPasswordRequirements = (password: string) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[@$!%*?&]/.test(password),
    };
  };

  const passwordChecks = checkPasswordRequirements(data.password);
  const passwordStrength = Object.values(passwordChecks).filter(Boolean).length;
  const passwordComplete = passwordStrength === 5;

  const handleSave = () => {
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
  };

  const handleEdit = (user: User) => {
    setData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
      password_confirmation: '',
    });
    setEditingId(user.id);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await showConfirmAlert(
      'Delete User?',
      'Are you sure you want to delete this user account? This action cannot be undone.',
      'Yes, delete it!',
             {
            // This is the new options object you're passing
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
  };

  const handlePasswordReset = async (user: User) => {
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
  };

  const columns = [
    {
      id: 'id',
      header: 'ID',
      cell: (user: User) => (
        <span className="font-medium text-gray-900 dark:text-white">{user.id}</span>
      ),
    },
    {
      id: 'name',
      header: 'Name',
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800 rounded-lg flex items-center justify-center">
            <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">User Account</div>
          </div>
        </div>
      ),
    },
    {
      id: 'email',
      header: 'Email Address',
      cell: (user: User) => (
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-400" />
          <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {user.email}
          </span>
        </div>
      ),
    },
    {
      id: 'role',
      header: 'Role',
      cell: (user: User) => (
        <div className="flex items-center gap-2">
          {user.role === 'admin' ? (
            <Crown className="w-4 h-4 text-yellow-500" />
          ) : (
            <User className="w-4 h-4 text-blue-500" />
          )}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.role === 'admin'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
          }`}>
            {user.role.toUpperCase()}
          </span>
        </div>
      ),
    },
    {
      id: 'created_at',
      header: 'Created Date',
      cell: (user: User) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
          {new Date(user.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: (user: User) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(user)}
            className="h-8 w-8 p-0"
            title="Edit User"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => handlePasswordReset(user)}
            className="h-8 w-8 p-0 bg-blue-100 hover:bg-blue-200 text-blue-600 border-blue-200"
            title="Reset Password"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleDelete(user.id)}
            className="h-8 w-8 p-0"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="User Management" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">

        {/* Enhanced DataTable */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <DataTable
            data={users}
            columns={columns}
            title="User Management"
            subtitle="Manage system users and administrator accounts"
            searchPlaceholder="Search users..."
            emptyMessage="No users found"
            actions={
              <Button
                onClick={() => {
                  reset();
                  setEditingId(null);
                  setShowPassword(false);
                  setShowPasswordConfirmation(false);
                  setIsDialogOpen(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            }
          />
        </motion.div>

        {/* Enhanced Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent size="md" className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-xl">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
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
                    <SelectItem value="hr">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-blue-500" />
                        HR
                      </div>
                    </SelectItem>
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
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mt-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900">
                        <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {editingId ? 'New Password Requirements' : 'Password Requirements'}
                      </span>
                    </div>

                    {/* Edit Mode Info */}
                    {editingId && (
                      <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/30 rounded-md border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 text-white">
                            <Key className="w-2 h-2" />
                          </div>
                          <span className="text-xs text-blue-700 dark:text-blue-300">
                            Leave password blank to keep current password, or enter a new one to change it.
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Password Strength Bar */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-1">
                        <Key className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">
                          Strength: {passwordStrength}/5
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            passwordStrength === 0 ? 'bg-slate-300 dark:bg-slate-600' :
                            passwordStrength <= 2 ? 'bg-red-400' :
                            passwordStrength <= 3 ? 'bg-yellow-400' :
                            passwordStrength <= 4 ? 'bg-blue-400' :
                            'bg-green-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    </div>

                    {/* Requirements List */}
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { key: 'length', label: 'At least 8 characters', icon: Hash },
                        { key: 'uppercase', label: 'One uppercase letter (A-Z)', icon: User },
                        { key: 'lowercase', label: 'One lowercase letter (a-z)', icon: User },
                        { key: 'number', label: 'One number (0-9)', icon: Hash },
                        { key: 'symbol', label: 'One symbol (@$!%*?&)', icon: Key },
                      ].map((requirement) => {
                        const isValid = passwordChecks[requirement.key as keyof typeof passwordChecks];
                        const IconComponent = requirement.icon;

                        return (
                          <motion.div
                            key={requirement.key}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className={`flex items-center gap-2 p-2 rounded-md transition-all duration-300 ${
                              isValid
                                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                              className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors duration-300 ${
                                isValid
                                  ? 'bg-green-500 text-white'
                                  : 'bg-slate-300 dark:bg-slate-600 text-slate-500'
                              }`}
                            >
                              {isValid ? (
                                <Check className="w-3 h-3" />
                              ) : (
                                <X className="w-3 h-3" />
                              )}
                            </motion.div>
                            <IconComponent className="w-3 h-3" />
                            <span className="text-xs font-medium">{requirement.label}</span>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Password Match Indicator */}
                    {data.password && data.password_confirmation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mt-3 p-2 rounded-md flex items-center gap-2 transition-all duration-300 ${
                          data.password === data.password_confirmation
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                        }`}
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            data.password === data.password_confirmation
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {data.password === data.password_confirmation ? (
                            <Check className="w-3 h-3" />
                          ) : (
                            <X className="w-3 h-3" />
                          )}
                        </motion.div>
                        <span className="text-xs font-medium">
                          {data.password === data.password_confirmation
                            ? 'Passwords match'
                            : 'Passwords do not match'
                          }
                        </span>
                      </motion.div>
                    )}

                    {/* Success Message */}
                    {passwordComplete && data.password === data.password_confirmation && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="mt-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800"
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 text-white"
                          >
                            <Check className="w-3 h-3" />
                          </motion.div>
                          <span className="text-xs font-medium text-green-700 dark:text-green-300">
                            🎉 Perfect! {editingId ? 'The new password' : 'Your password'} is strong and secure.
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
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
                  onClick={() => {
                    reset();
                    setEditingId(null);
                    setShowPassword(false);
                    setShowPasswordConfirmation(false);
                    setIsDialogOpen(false);
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={handleSave}
                disabled={processing}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                {editingId ? 'Update User' : 'Create Account'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
