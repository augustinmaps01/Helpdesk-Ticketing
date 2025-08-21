import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import TextLink from '@/components/text-link';
import AppLogoIcon from '@/components/app-logo-icon';
import { Plus, Home, ArrowRight, Lightbulb, CheckCircle2, User } from 'lucide-react';
import { StatsCards } from './StatsCards';

interface CreateTicketPageLayoutProps {
    onCreateTicket: () => void;
    onShowTroubleshooting: () => void;
}

export const CreateTicketPageLayout: React.FC<CreateTicketPageLayoutProps> = React.memo(({
    onCreateTicket,
    onShowTroubleshooting,
}) => {
    return (
        <div className="flex flex-1 items-center justify-center p-2 sm:p-4 lg:p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-6 sm:space-y-8 transition-all duration-300 ease-in-out mx-auto"
            >
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center -mt-4 mb-6"
                >
                    <div className="w-28 h-20 flex items-center justify-center">
                        <AppLogoIcon size="w-20 h-16" className="drop-shadow-sm" />
                    </div>
                </motion.div>

                {/* Header */}
                <motion.div
                    className="text-center space-y-4 -mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                        IT Support Portal
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                        Submit your IT request and get help from our technical team
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <StatsCards />

                {/* Quick Troubleshooting Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-center"
                >
                    <Button
                        onClick={onShowTroubleshooting}
                        variant="outline"
                        className="w-full mb-4 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        View Quick Troubleshooting Tips
                    </Button>
                </motion.div>

                {/* Create Ticket Button */}
                <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Button
                        onClick={onCreateTicket}
                        className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/70 text-primary-foreground rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
                    >
                        <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
                        <span className="hidden sm:inline">Create New Ticket</span>
                        <span className="sm:hidden">Create Ticket</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                </motion.div>

                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <TextLink
                        href="/"
                        className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    >
                        <Home className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Portal Selection
                    </TextLink>
                </motion.div>
            </motion.div>
        </div>
    );
});