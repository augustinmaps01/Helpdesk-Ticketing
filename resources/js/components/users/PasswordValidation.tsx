import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Key, Hash, User, Check, X } from 'lucide-react';
import { checkPasswordRequirements, getPasswordStrength, isPasswordComplete } from '@/utils/userPasswordValidation';

interface PasswordValidationProps {
    password: string;
    passwordConfirmation: string;
    editingId: number | null;
}

export const PasswordValidation: React.FC<PasswordValidationProps> = React.memo(({
    password,
    passwordConfirmation,
    editingId,
}) => {
    const passwordChecks = checkPasswordRequirements(password);
    const passwordStrength = getPasswordStrength(password);
    const passwordComplete = isPasswordComplete(password);

    return (
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
            {password && passwordConfirmation && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-3 p-2 rounded-md flex items-center gap-2 transition-all duration-300 ${
                        password === passwordConfirmation
                            ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                            : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                    }`}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className={`flex items-center justify-center w-5 h-5 rounded-full ${
                            password === passwordConfirmation
                                ? 'bg-green-500 text-white'
                                : 'bg-red-500 text-white'
                        }`}
                    >
                        {password === passwordConfirmation ? (
                            <Check className="w-3 h-3" />
                        ) : (
                            <X className="w-3 h-3" />
                        )}
                    </motion.div>
                    <span className="text-xs font-medium">
                        {password === passwordConfirmation
                            ? 'Passwords match'
                            : 'Passwords do not match'
                        }
                    </span>
                </motion.div>
            )}

            {/* Success Message */}
            {passwordComplete && password === passwordConfirmation && (
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
    );
});