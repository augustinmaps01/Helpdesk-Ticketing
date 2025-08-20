import { SidebarInset } from '@/components/ui/sidebar';
import { useSidebarWidth } from '@/components/app-sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import AppFooter from '@/components/app-footer';
import * as React from 'react';

interface AppContentProps extends React.ComponentProps<'main'> {
    variant?: 'header' | 'sidebar';
}

export function AppContent({ variant = 'header', children, ...props }: AppContentProps) {
    const isMobile = useIsMobile();
    const { sidebarWidth } = useSidebarWidth();

    // Dynamic sidebar width based on expansion state
    const getMarginLeft = () => {
        if (isMobile) return '0rem'; // No margin on mobile
        return `${sidebarWidth}px`; // Dynamic margin based on sidebar width
    };

    // Calculate responsive width with dynamic sidebar
    const getContentWidth = () => {
        if (isMobile) return '100vw'; // Full width on mobile
        return `calc(100vw - ${sidebarWidth}px)`; // Dynamic calculation
    };

    if (variant === 'sidebar') {
        return (
            <SidebarInset 
                style={{
                    marginLeft: getMarginLeft(),
                    width: getContentWidth(),
                    transition: 'margin-left 300ms ease-in-out, width 300ms ease-in-out'
                }}
                className="flex flex-col min-h-screen max-h-screen overflow-hidden"
                {...props}
            >
                <div className="flex-1 overflow-y-auto overflow-x-hidden">
                    {children}
                </div>
                <AppFooter />
            </SidebarInset>
        );
    }

    return (
        <main className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl" {...props}>
            {children}
        </main>
    );
}
