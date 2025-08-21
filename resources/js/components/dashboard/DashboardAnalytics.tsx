import React from 'react';
import { motion } from 'framer-motion';
import { TicketStatusChart } from '@/components/ticket-status-chart';
import { TicketData } from '@/types/dashboard';

interface DashboardAnalyticsProps {
  tickets: TicketData[];
}

export const DashboardAnalytics = React.memo<DashboardAnalyticsProps>(({ tickets }) => (
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
));