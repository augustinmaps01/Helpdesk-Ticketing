import {
  LayoutGrid,
  Ticket,
  Building2,
  FolderKanban,
  ShieldCheck,
  Home,
  FileClock,
  Users,
  Settings,
  Star,
  PanelLeftOpen,
  Maximize2,
  User,
} from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import AppLogo from './app-logo';
import { LucideIcon } from 'lucide-react';

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}
import { motion } from 'framer-motion';
import { useState,  createContext, useContext } from 'react';

// Define context type
interface SidebarWidthContextType {
  sidebarWidth: number;
  setSidebarWidth: () => void;
  isContentExpanded: boolean;
  setIsContentExpanded: (expanded: boolean) => void;
  toggleContentExpansion: () => void;
}

// Context for sharing sidebar width and content expansion
const SidebarWidthContext = createContext<SidebarWidthContextType>({
  sidebarWidth: 320,
  setSidebarWidth: () => {},
  isContentExpanded: false,
  setIsContentExpanded: () => {},
  toggleContentExpansion: () => {},
});

export function useSidebarWidth() {
  return useContext(SidebarWidthContext);
}

export function SidebarWidthProvider({ children }: { children: React.ReactNode }) {
  const [isContentExpanded, setIsContentExpanded] = useState(false);

  // Dynamic sidebar width based on expansion state
  const sidebarWidth = isContentExpanded ? 64 : 320; // 4rem = 64px, 20rem = 320px

  const setSidebarWidth = () => {
    // This function is kept for compatibility but doesn't do anything
    // since width is now controlled by isContentExpanded
  };

  const toggleContentExpansion = () => {
    setIsContentExpanded(!isContentExpanded);
  };

  return (
    <SidebarWidthContext.Provider value={{
      sidebarWidth,
      setSidebarWidth,
      isContentExpanded,
      setIsContentExpanded,
      toggleContentExpansion
    }}>
      {children}
    </SidebarWidthContext.Provider>
  );
}

const generalNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutGrid,
  },
];

// Define navigation based on role
const getTicketingNav = (): NavItem[] => {
    const baseNav = [
        {
            title: 'Tickets',
            href: '/tickets',
            icon: Ticket,
            badge: '12'
        },
    ];

    return baseNav;
};

// Define master data navigation based on role
const getMasterDataNav = (userRole: string): NavItem[] => {
  // Only admin can access master data management
  if (userRole !== 'admin') {
    return [];
  }

  return [
    {
      title: 'Departments',
      href: '/departments',
      icon: Building2,
    },
    {
      title: 'Categories',
      href: '/categories',
      icon: FolderKanban,
    },
    {
      title: 'Roles',
      href: '/roles',
      icon: ShieldCheck,
    },
    {
      title: 'Branches',
      href: '/branches',
      icon: Home,
    },
  ];
};

// Define admin navigation based on role
const getAdminNav = (userRole: string): NavItem[] => {
  if (userRole !== 'admin') {
    return [];
  }

  return [
    {
      title: 'User Management',
      href: '/users',
      icon: Users,
    },
    {
      title: 'Audit Trails',
      href: '/audit-trails',
      icon: FileClock,
    },
  ];
};

// Define system navigation
const getSystemNav = (): NavItem[] => {
  return [
    {
      title: 'Settings',
      href: '/settings',
      icon: Settings,
    },
  ];
};

export function AppSidebar() {
  const { auth } = usePage<{ auth: { user: { role: 'admin' | 'hr' } } }>().props;
  const userRole = auth?.user?.role || 'hr';
  const { isContentExpanded, toggleContentExpansion } = useSidebarWidth();

  // Get navigation items based on user role
  const ticketingNav = getTicketingNav();
  const masterDataNav = getMasterDataNav(userRole);
  const adminNav = getAdminNav(userRole);
  const systemNav = getSystemNav();

  return (
    <div className="relative flex overflow-hidden">
      <Sidebar
        collapsible="icon"
        variant="inset"
        className={`bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-r border-slate-200/60 dark:border-slate-800/60 transition-all duration-500 ease-out overflow-hidden h-screen shadow-xl dark:shadow-black/20`}
        style={{
          width: isContentExpanded ? '4.5rem' : '20rem',
          '--sidebar-width': isContentExpanded ? '4.5rem' : '20rem',
          maxWidth: isContentExpanded ? '4.5rem' : '20rem',
          minWidth: isContentExpanded ? '4.5rem' : '20rem'
        } as React.CSSProperties}
      >
      <SidebarHeader className="border-b border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/50 overflow-hidden backdrop-blur-sm">
        <SidebarMenu>
          <SidebarMenuItem>
            {isContentExpanded ? (
              // Collapsed view - elegant toggle icon
              <div className="flex items-center justify-center w-full py-3">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <SidebarMenuButton
                    size="lg"
                    onClick={toggleContentExpansion}
                    className="h-11 w-11 p-0 bg-gradient-to-br from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl border border-white/20"
                    title="Expand Sidebar"
                  >
                    <PanelLeftOpen className="w-5 h-5" />
                  </SidebarMenuButton>
                </motion.div>
              </div>
            ) : (
              // Expanded view - elegant logo and toggle
              <div className="flex items-center justify-between w-full p-3">
                <motion.div
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="flex-1"
                >
                  <SidebarMenuButton
                    size="lg"
                    asChild
                    className="hover:bg-gradient-to-r hover:from-white/70 hover:to-indigo-50/70 dark:hover:from-slate-800/70 dark:hover:to-indigo-900/30 transition-all duration-300 rounded-xl border border-transparent hover:border-indigo-200/50 dark:hover:border-indigo-800/50 shadow-sm hover:shadow-md"
                  >
                    <Link href="/dashboard" prefetch className="group">
                      <div className="flex items-center gap-3 min-w-0 w-full">
                        <AppLogo />
                        <div className="flex items-center gap-1 group-hover:gap-2 transition-all duration-300 flex-shrink-0">
                          <Star className="w-4 h-4 text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-sm" />
                        </div>
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </motion.div>

                {/* Content Expansion Toggle */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  <SidebarMenuButton
                    size="sm"
                    onClick={toggleContentExpansion}
                    className="h-9 w-9 p-0 bg-gradient-to-br from-slate-100 to-slate-200 hover:from-indigo-100 hover:to-blue-200 dark:from-slate-800 dark:to-slate-700 dark:hover:from-indigo-900 dark:hover:to-blue-900 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md border border-white/50 dark:border-slate-600/50"
                    title="Collapse to Icons"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </SidebarMenuButton>
                </motion.div>
              </div>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

{/* Always show content - either expanded or collapsed */}
        <SidebarContent className={`${isContentExpanded ? 'px-2 py-4' : 'px-2 py-4'} space-y-1 overflow-y-auto overflow-x-hidden`}>
          {!isContentExpanded ? (
            // Expanded view - show full navigation
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="min-w-0 overflow-hidden"
              >
                <NavMain title="🏠 General" items={generalNav} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="min-w-0 overflow-hidden"
              >
                <NavMain title="🎫 Ticketing" items={ticketingNav} />
              </motion.div>

              <SidebarSeparator className="my-2 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />

              {masterDataNav.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="min-w-0 overflow-hidden"
                >
                  <NavMain title="⚙️ Master Data" items={masterDataNav} />
                </motion.div>
              )}

              {adminNav.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="min-w-0 overflow-hidden"
                >
                  <NavMain title="👑 Administration" items={adminNav} />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                className="min-w-0 overflow-hidden"
              >
                <NavMain title="📊 System" items={systemNav} />
              </motion.div>
            </>
          ) : (
            // Collapsed view - elegant icons with professional styling
            <div className="flex flex-col items-center space-y-3 py-4 px-2">
              {/* General Navigation Icons */}
              {generalNav.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 hover:from-indigo-500 hover:to-blue-600 border border-indigo-200/50 hover:border-indigo-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-indigo-600 dark:hover:to-blue-700 dark:border-slate-600/50 dark:hover:border-indigo-500/50 text-indigo-600 hover:text-white dark:text-slate-300 dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={item.href} prefetch className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5" />
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              ))}

              {/* Ticketing Icons */}
              {ticketingNav.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: (index + generalNav.length) * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-emerald-50 to-green-100 hover:from-emerald-500 hover:to-green-600 border border-emerald-200/50 hover:border-emerald-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-emerald-600 dark:hover:to-green-700 dark:border-slate-600/50 dark:hover:border-emerald-500/50 text-emerald-600 hover:text-white dark:text-slate-300 dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-300 relative"
                  >
                    <Link href={item.href} prefetch className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5" />
                      {item.badge && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-lg border border-white/50">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              ))}

              {/* Elegant Separator */}
              <div className="flex items-center justify-center w-full my-4">
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent dark:via-slate-600"></div>
              </div>

              {/* Master Data Icons (Admin only) */}
              {masterDataNav.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: (index + generalNav.length + ticketingNav.length) * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-purple-50 to-violet-100 hover:from-purple-500 hover:to-violet-600 border border-purple-200/50 hover:border-purple-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-purple-600 dark:hover:to-violet-700 dark:border-slate-600/50 dark:hover:border-purple-500/50 text-purple-600 hover:text-white dark:text-slate-300 dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={item.href} prefetch className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5" />
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              ))}

              {/* Admin Icons */}
              {adminNav.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: (index + generalNav.length + ticketingNav.length + masterDataNav.length) * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 hover:from-amber-500 hover:to-orange-600 border border-amber-200/50 hover:border-amber-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-amber-600 dark:hover:to-orange-700 dark:border-slate-600/50 dark:hover:border-amber-500/50 text-amber-600 hover:text-white dark:text-slate-300 dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={item.href} prefetch className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5" />
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              ))}

              {/* System Icons */}
              {systemNav.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: (index + generalNav.length + ticketingNav.length + masterDataNav.length + adminNav.length) * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-slate-100 to-gray-200 hover:from-slate-500 hover:to-gray-600 border border-slate-200/50 hover:border-slate-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-slate-600 dark:hover:to-gray-700 dark:border-slate-600/50 dark:hover:border-slate-500/50 text-slate-600 hover:text-white dark:text-slate-300 dark:hover:text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <Link href={item.href} prefetch className="flex items-center justify-center w-full h-full">
                      <item.icon className="w-5 h-5" />
                    </Link>
                  </SidebarMenuButton>
                </motion.div>
              ))}
            </div>
          )}
        </SidebarContent>

      <SidebarFooter className="border-t border-slate-200/50 dark:border-slate-800/50 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden backdrop-blur-sm">
        {!isContentExpanded ? (
          // Expanded view - elegant full footer
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="min-w-0 overflow-hidden p-2"
          >
            <NavFooter items={[]} className="mt-auto" />
            <NavUser />
          </motion.div>
        ) : (
          // Collapsed view - professional user avatar
          <div className="flex justify-center py-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <SidebarMenuButton
                asChild
                tooltip="User Settings"
                className="h-11 w-11 p-0 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 hover:from-indigo-500 hover:to-blue-600 border border-slate-200/50 hover:border-indigo-400/50 dark:from-slate-800 dark:to-slate-700 dark:hover:from-indigo-600 dark:hover:to-blue-700 dark:border-slate-600/50 dark:hover:border-indigo-500/50 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/settings" prefetch className="flex items-center justify-center w-full h-full">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-medium shadow-sm group-hover:shadow-md transition-all duration-300">
                    <User className="w-4 h-4" />
                  </div>
                </Link>
              </SidebarMenuButton>
            </motion.div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>

      {/* Removed resize handle to maintain fixed width */}
    </div>
  );
}
