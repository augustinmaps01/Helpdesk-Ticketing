import {  Code, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Enhanced Single Line Footer */}
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-8 text-xs sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >

          {/* Left Section - Copyright */}
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 flex-shrink-0">
            <Globe className="w-4 h-4 text-blue-500" />
            <span>
              © {currentYear} <span className="font-semibold text-gray-900 dark:text-white">Helpdesk Ticketing System</span>
            </span>
          </div>

          {/* Center Section - Credits (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-3 text-gray-600 dark:text-gray-400 flex-1 justify-center">
            <Code className="w-4 h-4 text-blue-500 flex-shrink-0" />
            <span className="font-medium text-gray-900 dark:text-white">Designed by</span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">RBT Bank Inc.</span>
            <span className="text-gray-400">•</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">Augustin Maputol</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">(Software Developer)</span>
          </div>

          {/* Right Section - Version Info */}
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500 flex-shrink-0">
            <span className="font-medium">v1.0.0</span>
            <span className="text-gray-400">•</span>
            <span>Build #{Math.floor(Math.random() * 1000) + 100}</span>
            <span className="hidden md:inline text-gray-400 ml-1">•</span>
            <span className="hidden md:inline text-xs">{new Date().toLocaleDateString()}</span>
          </div>

          {/* Mobile Credits - Ultra Compact Version */}
          <div className="lg:hidden flex items-center gap-2 text-gray-600 dark:text-gray-400 text-center">
            <Code className="w-3 h-3 text-blue-500" />
            <span className="text-xs font-medium text-gray-900 dark:text-white">by</span>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">RBT Bank Inc.</span>
            <span className="text-gray-400 text-xs">•</span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">A. Maputol</span>
          </div>

        </motion.div>
      </div>
    </motion.footer>
  );
}
