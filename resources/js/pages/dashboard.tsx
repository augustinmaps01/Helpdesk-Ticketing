import React, { useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { motion } from 'framer-motion';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { Ticket as TicketIcon, Clock, CheckCircle, AlertTriangle, HeadphonesIcon, TrendingUp } from 'lucide-react';
import { TicketStatusChart } from '@/components/ticket-status-chart';
import { showWelcomeAlert } from '@/utils/sweetAlert';

interface DashboardData {
    totalTickets: number;
    openTickets: number;
    inProgressTickets: number;
    pendingTickets: number;
    closedTickets: number;
    avgResponseTime: number;
    satisfactionRate: number;
}

interface TicketData {
    id: string;
    status: string;
}

interface CategoryData {
    id: string;
    name: string;
}

interface DashboardProps {
    dashboardData: DashboardData;
    tickets: TicketData[];
    categories: CategoryData[];
}


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard', // This dashboard is now the overview
    },
];



export default function Dashboard({ dashboardData, tickets, categories }: DashboardProps) {
    // Guard this protected page
    useAuthGuard();
    
    const { props } = usePage<SharedData>();
    const { flash, auth } = props;

    // Extract data from props
    const {
        totalTickets,
        openTickets,
        inProgressTickets,
        pendingTickets,
        closedTickets,
        avgResponseTime,
        satisfactionRate
    } = dashboardData;
    
    const numberOfCategories = categories.length;

    // Handle login success alert
    useEffect(() => {
        if (flash.loginSuccess && flash.welcome) {
            console.log('🎯 Login success detected! Triggering welcome alert...');
            console.log('📊 Flash data:', { loginSuccess: flash.loginSuccess, welcome: flash.welcome });
            
            showWelcomeAlert({
                userName: auth.user?.name || 'User',
                message: flash.welcome,
                timer: 2000,
                showConfirmButton: true,
                position: 'top-end'
            }).then(() => {
                console.log('✅ Welcome alert completed successfully');
            }).catch((error) => {
                console.error('❌ Welcome alert failed:', error);
            });
        }
    }, [flash.loginSuccess, flash.welcome, auth.user?.name]);


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="IT Helpdesk Overview" />
            <div className="flex flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-2"
                >
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">IT Helpdesk Overview</h1>
                    <p className="text-muted-foreground">Monitor your helpdesk performance and key metrics</p>

                </motion.div>


                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >

                    <motion.div
                        className="group relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Open Tickets</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-foreground">{openTickets}</p>
                                        <span className="flex items-center text-xs text-yellow-600 dark:text-yellow-400">
                                            <AlertTriangle className="w-3 h-3 mr-1" />
                                            Urgent
                                        </span>
                                    </div>
                                </div>
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <TicketIcon className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
                                </motion.div>
                            </div>
                            <div className="w-full bg-muted/50 rounded-full h-2">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{width: `${Math.min((openTickets / totalTickets) * 100, 100)}%`}}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Needs Attention</span>
                                <Link
                                    href="/tickets?status=open"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        className="group relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-foreground">{inProgressTickets}</p>
                                        <span className="flex items-center text-xs text-blue-600 dark:text-blue-400">
                                            <Clock className="w-3 h-3 mr-1" />
                                            Active
                                        </span>
                                    </div>
                                </div>
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Clock className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                                </motion.div>
                            </div>
                            <div className="w-full bg-muted/50 rounded-full h-2">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style={{width: `${Math.min((inProgressTickets / totalTickets) * 100, 100)}%`}}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Being Worked On</span>
                                <Link
                                    href="/tickets?status=in-progress"
                                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        className="group relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Resolved Tickets</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-foreground">{closedTickets}</p>
                                        <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            {totalTickets > 0 ? Math.round((closedTickets / totalTickets) * 100) : 0}%
                                        </span>
                                    </div>
                                </div>
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <CheckCircle className="h-7 w-7 text-green-600 dark:text-green-400" />
                                </motion.div>
                            </div>
                            <div className="w-full bg-muted/50 rounded-full h-2">
                                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: `${totalTickets > 0 ? Math.min((closedTickets / totalTickets) * 100, 100) : 0}%`}}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Success Rate</span>
                                <Link
                                    href="/tickets?status=closed"
                                    className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                                >
                                    View →
                                </Link>
                            </div>
                        </div>
                    </motion.div>


                    <motion.div
                        className="group relative bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-medium text-muted-foreground">Pending Tickets</p>
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-3xl font-bold text-foreground">{pendingTickets}</p>
                                        <span className="flex items-center text-xs text-purple-600 dark:text-purple-400">
                                            <Clock className="w-3 h-3 mr-1" />
                                            Awaiting
                                        </span>
                                    </div>
                                </div>
                                <motion.div
                                    className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-violet-500/20 border border-purple-500/20"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                >
                                    <Clock className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                                </motion.div>
                            </div>
                            <div className="w-full bg-muted/50 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full" style={{width: `${Math.min((pendingTickets / totalTickets) * 100, 100)}%`}}></div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">Need Review</span>
                                <Link
                                    href="/tickets?status=pending"
                                    className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium group-hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                                >
                                    Review →
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Charts Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-8"
                >
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-foreground">Ticket Analytics</h2>
                        <p className="text-sm text-muted-foreground">Visual insights into your helpdesk performance</p>
                    </div>
                    <TicketStatusChart tickets={tickets} />
                </motion.div>
            </div>
        </AppLayout>
    );
}
