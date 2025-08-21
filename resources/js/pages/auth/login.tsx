import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, Lock, Mail, AlertCircle, CheckCircle } from 'lucide-react';
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
    // State to manage display messages
    const [displayMessage, setDisplayMessage] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    // Get page props (including logout flag) at component level
    const pageProps = usePage().props as any;

    // Effect to handle displaying inline error messages
    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (errors.email || errors.password) {
            const errorMessage = errors.email || errors.password;
            setDisplayMessage({ message: errorMessage, type: 'error' });
            
            // Auto-clear error messages after 3 seconds
            timer = setTimeout(() => {
                setDisplayMessage(null);
            }, 3000);
        } else if (status) {
            // Define known success messages
            const knownSuccessMessages = [
                'You are logged in.',
                'Login successful.',
                'You have been successfully logged out.'
            ];

            if (knownSuccessMessages.includes(status)) {
                setDisplayMessage({ message: status, type: 'success' });
            } else {
                // Treat unknown status as error
                setDisplayMessage({ message: status, type: 'error' });
            }
            
            // Auto-clear all status messages after 3 seconds
            timer = setTimeout(() => {
                setDisplayMessage(null);
            }, 3000);
        } else {
            setDisplayMessage(null);
        }

        // Cleanup timer on unmount or re-run
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [errors.email, errors.password, status]);

    // Prevent browser back navigation to protected pages after logout
    useEffect(() => {
        // Check if user just logged out
        if (pageProps.logout || pageProps.clearCache) {
            // Clear all possible caches
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                    });
                });
            }
            
            // Clear sessionStorage and localStorage
            try {
                sessionStorage.clear();
                localStorage.removeItem('auth');
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            } catch (e) {
                // Ignore storage errors
            }
            
            // Replace current history entry to prevent back navigation
            window.history.replaceState(null, '', window.location.href);
            
            // Handle popstate event (back button)
            const handlePopState = (event: PopStateEvent) => {
                event.preventDefault();
                window.history.replaceState(null, '', window.location.href);
                // Force reload to ensure no cached content
                window.location.reload();
            };
            
            // Handle focus event (tab becomes active)
            const handleFocus = () => {
                // When tab becomes visible after logout, ensure we're on login page
                if (window.location.pathname !== '/login') {
                    window.location.href = '/login';
                }
            };
            
            window.addEventListener('popstate', handlePopState);
            window.addEventListener('focus', handleFocus);
            
            // Cleanup
            return () => {
                window.removeEventListener('popstate', handlePopState);
                window.removeEventListener('focus', handleFocus);
            };
        }
    }, [pageProps.logout, pageProps.clearCache]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Clear any existing messages before submission
        setDisplayMessage(null);
        post(route('login'), {
            onSuccess: () => {
                // Login successful - Inertia will handle the redirect automatically
                // Clear any form data
                reset('email', 'password');
            },
            onError: () => {
                // Login failed - reset form fields
                reset('email', 'password');
            },
            onFinish: () => {
                // This runs regardless of success or failure
                // The form handling is already done in onSuccess/onError
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

            {/* Simple inline error/success display */}
            {displayMessage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`mb-4 p-4 rounded-md border flex items-center gap-3 ${
                        displayMessage.type === 'error'
                            ? 'bg-red-50 border-red-200 text-red-700'
                            : 'bg-green-50 border-green-200 text-green-700'
                    }`}
                >
                    {displayMessage.type === 'error' ? (
                        <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    <span className="text-sm font-medium">{displayMessage.message}</span>
                </motion.div>
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
