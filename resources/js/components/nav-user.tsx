import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, User } from 'lucide-react';
import { motion } from 'framer-motion';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        >
                            <SidebarMenuButton 
                                size="lg" 
                                className="group bg-gradient-to-r from-white to-gray-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-200 rounded-xl"
                            >
                                <div className="flex items-center gap-3 w-full">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
                                            {auth.user?.avatar ? (
                                                <img 
                                                    src={auth.user.avatar} 
                                                    alt={auth.user.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                            ) : (
                                                <User className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-700"></div>
                                    </div>
                                    
                                    <div className="flex-1 min-w-0 text-left">
                                        <div className="font-semibold text-gray-900 dark:text-white truncate">
                                            {auth.user?.name}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            Online
                                        </div>
                                    </div>
                                    
                                    <ChevronsUpDown className="ml-auto size-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                                </div>
                            </SidebarMenuButton>
                        </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
                        align="end"
                        side={isMobile ? 'bottom' : state === 'collapsed' ? 'left' : 'bottom'}
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
