import { useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';

/**
 * Hook to guard protected pages and handle browser navigation after logout
 */
export function useAuthGuard() {
    const { auth } = usePage().props as any;

    useEffect(() => {
        // Check if user is authenticated
        if (!auth?.user) {
            // User is not authenticated, redirect to login
            router.get('/login', {}, {
                replace: true,
                preserveState: false,
                preserveScroll: false,
            });
            return;
        }

        // Prevent back navigation to cached pages after logout
        const handleBeforeUnload = () => {
            // Clear any cached data
            if ('caches' in window) {
                caches.keys().then(names => {
                    names.forEach(name => {
                        caches.delete(name);
                    });
                });
            }
        };

        // Handle browser back/forward navigation
        const handlePopState = (event: PopStateEvent) => {
            // If user navigated back and they're not authenticated, redirect to login
            if (!auth?.user) {
                event.preventDefault();
                router.get('/login', {}, {
                    replace: true,
                    preserveState: false,
                    preserveScroll: false,
                });
            }
        };

        // Handle visibility change (tab becomes visible)
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                // When tab becomes visible, check auth status
                if (!auth?.user) {
                    router.get('/login', {}, {
                        replace: true,
                        preserveState: false,
                        preserveScroll: false,
                    });
                }
            }
        };

        // Add event listeners
        window.addEventListener('beforeunload', handleBeforeUnload);
        window.addEventListener('popstate', handlePopState);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handlePopState);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [auth?.user]);
}