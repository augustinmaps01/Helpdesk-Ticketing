import React from 'react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
  title: string;
  subtitle: string;
}

export const DashboardHeader = React.memo<DashboardHeaderProps>(({ title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="space-y-2"
  >
    <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
      {title}
    </h1>
    <p className="text-muted-foreground">{subtitle}</p>
  </motion.div>
));