import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';

export function NavMain({
  title = 'Platform',
  items = [],
}: {
  title?: string;
  items: NavItem[];
}) {
  const page = usePage();

  return (
    <SidebarGroup className="px-2 py-2">
      <SidebarGroupLabel className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-1">
        {title}
      </SidebarGroupLabel>
      <SidebarMenu className="space-y-0.5">
        {items.map((item, index) => {
          const isActive = page.url.startsWith(item.href);
          
          return (
            <SidebarMenuItem key={item.title}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                whileHover={{ x: 2 }}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={{ 
                    children: (
                      <div className="text-center">
                        <div className="font-medium">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        )}
                      </div>
                    )
                  }}
                  className={`
                    group relative rounded-lg transition-all duration-200 
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25' 
                      : 'hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 dark:hover:from-gray-700 dark:hover:to-gray-600 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  <Link href={item.href} prefetch className="flex items-center gap-3 w-full">
                    {item.icon && (
                      <div className={`
                        p-1.5 rounded-md transition-all duration-200
                        ${isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 group-hover:bg-blue-100 group-hover:text-blue-600'
                        }
                      `}>
                        <item.icon className="size-4" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium truncate ${isActive ? 'text-white' : 'text-gray-900 dark:text-gray-100'}`}>
                        {item.title}
                      </div>
                      {item.description && (
                        <div className={`
                          text-xs truncate transition-colors duration-200
                          ${isActive 
                            ? 'text-white/80' 
                            : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'
                          }
                        `}>
                          {item.description}
                        </div>
                      )}
                    </div>
                    {item.badge && (
                      <SidebarMenuBadge className={`
                        transition-all duration-200
                        ${isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        }
                      `}>
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </motion.div>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
