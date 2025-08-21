/**
 * Global authentication guard that prevents cached page access after logout
 */

declare global {
    interface Window {
        authGuardInitialized?: boolean;
    }
}

export function initializeAuthGuard() {
    // Prevent multiple initializations
    if (window.authGuardInitialized) {
        return;
    }
    
    window.authGuardInitialized = true;

    // Check if we're on a protected page
    const protectedPaths = ['/dashboard', '/tickets', '/users', '/categories', '/roles', '/departments', '/branches', '/audit-trails', '/settings'];
    const currentPath = window.location.pathname;
    
    const isProtectedPage = protectedPaths.some(path => currentPath.startsWith(path));
    
    if (isProtectedPage) {
        // Make an AJAX request to check authentication status
        fetch('/dashboard', {
            method: 'HEAD',
            credentials: 'same-origin',
            cache: 'no-cache'
        })
        .then(response => {
            if (response.status === 401 || response.status === 403 || response.redirected) {
                // User is not authenticated, redirect to login
                window.location.replace('/login');
            }
        })
        .catch(() => {
            // Network error or unauthorized, redirect to login
            window.location.replace('/login');
        });
    }

    // Prevent back button navigation to protected pages
    const handlePopState = (event: PopStateEvent) => {
        const currentPath = window.location.pathname;
        const isProtectedPage = protectedPaths.some(path => currentPath.startsWith(path));
        
        if (isProtectedPage) {
            // Check authentication status
            fetch('/dashboard', {
                method: 'HEAD',
                credentials: 'same-origin',
                cache: 'no-cache'
            })
            .then(response => {
                if (response.status === 401 || response.status === 403 || response.redirected) {
                    // Prevent the navigation and redirect to login
                    event.preventDefault();
                    window.location.replace('/login');
                }
            })
            .catch(() => {
                // Network error or unauthorized, redirect to login
                event.preventDefault();
                window.location.replace('/login');
            });
        }
    };

    // Handle page visibility change (tab becomes active)
    const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible' && isProtectedPage) {
            // When tab becomes visible, check auth status
            fetch('/dashboard', {
                method: 'HEAD',
                credentials: 'same-origin',
                cache: 'no-cache'
            })
            .then(response => {
                if (response.status === 401 || response.status === 403 || response.redirected) {
                    window.location.replace('/login');
                }
            })
            .catch(() => {
                window.location.replace('/login');
            });
        }
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Also check on page focus
    window.addEventListener('focus', handleVisibilityChange);
}

// Auto-initialize when script loads
if (typeof window !== 'undefined') {
    // Initialize immediately
    initializeAuthGuard();
    
    // Also initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeAuthGuard);
    }
}