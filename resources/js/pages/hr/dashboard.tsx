import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Users,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type HRDashboardProps = {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingTickets: number;
  closedTickets: number;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'HR Dashboard',
    href: '/dashboard',
  },
];

export default function HRDashboard({
  totalTickets,
  openTickets,
  inProgressTickets,
  pendingTickets,
  closedTickets,
}: HRDashboardProps) {
  const ticketStats = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: Ticket,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
      description: 'All tickets in system',
    },
    {
      title: 'Open Tickets',
      value: openTickets,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      description: 'Tickets awaiting response',
    },
    {
      title: 'In Progress',
      value: inProgressTickets,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Currently being worked on',
    },
    {
      title: 'Pending',
      value: pendingTickets,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      description: 'Awaiting user response',
    },
    {
      title: 'Closed',
      value: closedTickets,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      description: 'Resolved tickets',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="HR Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
              <p className="text-blue-100">Monitor and track support tickets across the organization.</p>
            </div>
            <div className="hidden md:block">
              <Users className="w-16 h-16 text-blue-200" />
            </div>
          </div>
        </motion.div>

        {/* Ticket Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ticket Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ticketStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold px-3 py-1">
                        {stat.value}
                      </Badge>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">
                        {stat.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions for HR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/tickets'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Ticket className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">View All Tickets</h3>
                    <p className="text-sm text-muted-foreground">Monitor all support requests</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/create-ticket'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100">
                    <AlertCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Create Ticket</h3>
                    <p className="text-sm text-muted-foreground">Submit a new support request</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <BarChart3 className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reports</h3>
                    <p className="text-sm text-muted-foreground">View ticket analytics and reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Ticket Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Ticket Status Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ticketStats.slice(1).map((stat) => {
                  const percentage = totalTickets > 0 ? (stat.value / totalTickets) * 100 : 0;
                  return (
                    <div key={stat.title} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <stat.icon className={`w-4 h-4 ${stat.color}`} />
                          <span className="text-sm font-medium">{stat.title}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {stat.value} ({percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${stat.bgColor.replace('bg-', 'bg-').replace('-100', '-500')}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </AppLayout>
  );
}