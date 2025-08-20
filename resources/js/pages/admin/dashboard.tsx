import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building2, 
  Briefcase, 
  Shield, 
  Ticket, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  TrendingUp,
  Eye,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type DashboardData = {
  totalBranches: number;
  totalDepartments: number;
  totalRoles: number;
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingTickets: number;
  closedTickets: number;
};

type AdminDashboardProps = {
  totalBranches: number;
  totalDepartments: number;
  totalRoles: number;
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingTickets: number;
  closedTickets: number;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
  },
];

export default function AdminDashboard({
  totalBranches,
  totalDepartments,
  totalRoles,
  totalTickets,
  openTickets,
  inProgressTickets,
  pendingTickets,
  closedTickets,
}: AdminDashboardProps) {
  const stats = [
    {
      title: 'Total Branches',
      value: totalBranches,
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/admin/branches',
    },
    {
      title: 'Departments',
      value: totalDepartments,
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/admin/departments',
    },
    {
      title: 'System Roles',
      value: totalRoles,
      icon: Shield,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/admin/roles',
    },
    {
      title: 'Total Users',
      value: '-',
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/admin/users',
    },
  ];

  const ticketStats = [
    {
      title: 'Total Tickets',
      value: totalTickets,
      icon: Ticket,
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
    {
      title: 'Open Tickets',
      value: openTickets,
      icon: AlertCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      title: 'In Progress',
      value: inProgressTickets,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Pending',
      value: pendingTickets,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Closed',
      value: closedTickets,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Admin Dashboard" />

      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background via-background to-muted/10">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-blue-100">Welcome to the admin control panel. Manage your system effectively.</p>
            </div>
            <div className="hidden md:block">
              <Settings className="w-16 h-16 text-blue-200" />
            </div>
          </div>
        </motion.div>

        {/* System Management Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">System Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={() => window.location.href = stat.href}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Ticket Management Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Ticket Management</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {ticketStats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <Badge variant="secondary">{stat.value}</Badge>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Management Features - Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/users'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-blue-100">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">User Management</h3>
                    <p className="text-sm text-muted-foreground">Add, edit, or remove system users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/tickets'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-green-100">
                    <Ticket className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Ticket Management</h3>
                    <p className="text-sm text-muted-foreground">Monitor and manage support tickets</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/categories'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-purple-100">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Categories</h3>
                    <p className="text-sm text-muted-foreground">Manage ticket categories</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/roles'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-yellow-100">
                    <Shield className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Roles</h3>
                    <p className="text-sm text-muted-foreground">Configure user roles</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/departments'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-100">
                    <Briefcase className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Departments</h3>
                    <p className="text-sm text-muted-foreground">Manage company departments</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/branches'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-100">
                    <Building2 className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Branches</h3>
                    <p className="text-sm text-muted-foreground">Manage office branches</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card 
              className="hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => window.location.href = '/admin/audit-trails'}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-red-100">
                    <Eye className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Audit Trails</h3>
                    <p className="text-sm text-muted-foreground">View system activity logs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}