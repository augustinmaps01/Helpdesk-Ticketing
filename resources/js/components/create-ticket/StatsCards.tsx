import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, User } from 'lucide-react';

export const StatsCards: React.FC = React.memo(() => {
    return (
        <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Avg Response</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">&lt; 2 hours</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-green-900 dark:text-green-100">Success Rate</div>
                <div className="text-xs text-green-600 dark:text-green-400">98.5%</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <User className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Support Team</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">24/7 Available</div>
            </div>
        </motion.div>
    );
});