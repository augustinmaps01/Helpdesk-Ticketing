import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { FormEventHandler, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Removed InputError import as it's no longer used for individual fields
// import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import AlertMessage from '@/components/AlertMessage'; // Import the AlertMessage component

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);
    // State to manage alert messages (success or error)
    const [alertMessage, setAlertMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    // Effect to handle displaying alert messages based on Inertia's errors or status prop
    useEffect(() => {
        if (errors.email) {
            setAlertMessage({ message: errors.email, type: 'error' });
        } else if (errors.password) {
            setAlertMessage({ message: errors.password, type: 'error' });
        } else if (status) {
            // Define known success messages. Any 'status' that is not a known success message
            // will be treated as an error message for general authentication failures.
            const knownSuccessMessages = [
                'You are logged in.', // Example success message
                'Login successful.',  // Another example success message
                // Add any other specific success messages your backend might return here
            ];

            if (knownSuccessMessages.includes(status)) {
                setAlertMessage({ message: status, type: 'success' });
            } else {
                // If status is present and not a known success message, treat it as an error.
                // This will catch messages like "These credentials do not match our records."
                setAlertMessage({ message: status, type: 'error' });
            }
        } else {
            // Clear alert message if no errors or status
            setAlertMessage(null);
        }

        // Optionally, clear the message after a few seconds
        const timer = setTimeout(() => {
            setAlertMessage(null);
        }, 2000); // Message disappears after 5 seconds

        return () => clearTimeout(timer); // Cleanup timer on unmount or re-run
    }, [errors.email, errors.password, status]); // Dependencies for the effect

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Clear any existing alerts before submission
        setAlertMessage(null);
        post(route('login'), {
            // Modified onFinish to reset both email and password on error
            onFinish: () => {
                // Always reset the password field
                // The `reset` function can take multiple field names
                // If there are errors (indicating a failed login attempt), reset both email and password
                if (Object.keys(errors).length > 0) {
                    reset('email', 'password'); // Resets both email and password to their initial empty states
                } else {
                    // If no errors, only reset password (for successful login, if desired)
                    reset('email', 'password');
                }
            },
        });
    };

    return (
        <AuthLayout
            title="Log in to your account"
            titleClassName="text-2xl font-bold"
            description="Enter your email and password below to log in"
            descriptionClassName="text-sm text-muted-foreground">
            <Head title="Log in" />

            {/* Use the new AlertMessage component */}
            {alertMessage && (
                <AlertMessage message={alertMessage.message} type={alertMessage.type} />
            )}

            <motion.form
                className="flex flex-col gap-6"
                onSubmit={submit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    className="grid gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <motion.div
                        className="grid gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                            <Mail className="size-4 text-muted-foreground" />
                            Email address
                        </Label>
                        <div className="relative group">
                            <Input
                                id="email"
                                type="email"
                                required
                                autoFocus
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="transition-all duration-200 group-hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        className="grid gap-2"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="flex items-center">
                            <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                                <Lock className="size-4 text-muted-foreground" />
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm hover:text-primary transition-colors" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <div className="relative group">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                required
                                tabIndex={2}
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
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
                    </motion.div>

                    <motion.div
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="transition-all duration-200 hover:border-primary"
                        />
                        <Label htmlFor="remember" className="text-sm cursor-pointer hover:text-primary transition-colors">Remember me</Label>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            className="mt-4 w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-300 shadow-lg hover:shadow-xl border-0"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                >
                                    <LoaderCircle className="h-4 w-4 mr-2" />
                                </motion.div>
                            ) : null}
                            {processing ? 'Signing in...' : 'Log in'}
                        </Button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="text-center text-sm text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                </motion.div>
            </motion.form>
        </AuthLayout>
    );
}
