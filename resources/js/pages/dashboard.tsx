import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { useAuthGuard } from '@/hooks/useAuthGuard';

// Dashboard-specific components
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { MetricsGrid } from '@/components/dashboard/MetricsGrid';
import { DashboardAnalytics } from '@/components/dashboard/DashboardAnalytics';

// Dashboard-specific hooks
import { useDashboard } from '@/hooks/useDashboard';
import { useDashboardWelcome } from '@/hooks/useDashboardWelcome';

// Dashboard-specific types
import { DashboardProps } from '@/types/dashboard';

// Constants
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
    },
];

const DASHBOARD_CONFIG = {
    title: 'IT Helpdesk Overview',
    subtitle: 'Monitor your helpdesk performance and key metrics',
    pageTitle: 'IT Helpdesk Overview',
} as const;

export default function Dashboard({ dashboardData, tickets }: DashboardProps) {
    // Guard this protected page
    useAuthGuard();

    // Get page data
    const { props } = usePage<SharedData>();
    const { flash, auth } = props;

    // Process dashboard data using custom hook
    const { processedMetrics, totalTickets } = useDashboard(dashboardData);

    // Handle welcome alert
    useDashboardWelcome({
        loginSuccess: flash.loginSuccess,
        welcomeMessage: flash.welcome,
        userName: auth.user?.name,
    });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={DASHBOARD_CONFIG.pageTitle} />
            
            <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
                {/* Dashboard Header */}
                <DashboardHeader 
                    title={DASHBOARD_CONFIG.title} 
                    subtitle={DASHBOARD_CONFIG.subtitle} 
                />

                {/* Metrics Grid */}
                <MetricsGrid 
                    metrics={processedMetrics} 
                    totalTickets={totalTickets} 
                />

                {/* Analytics Section */}
                <DashboardAnalytics tickets={tickets} />
            </div>
        </AppLayout>
    );
}
