import { Head, router } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { Button } from '@/components/ui/button';
import { ShieldCheck, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LandingPage() {
    return (
        <>
            <Head title="IT Helpdesk" />
            <LandingLayout
                title="Welcome to IT Helpdesk Ticketing"
                description="Choose your role to continue"
                titleClassName="text-4xl font-bold text-center text-primary"
                descriptionClassName="text-base text-center text-muted-foreground"
            >
                <div className="flex justify-center w-full px-4 mt-12">
<motion.div 
  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, staggerChildren: 0.2 }}
>
  {/* Admin Card */}
  <motion.div 
    className="relative group w-full bg-white dark:bg-gray-900 rounded-2xl border p-0 shadow-lg transition-all duration-300 overflow-hidden h-full hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {/* Accent Banner */}
    <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between px-8 py-10 -mt-20 z-10 relative h-[360px]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ShieldCheck className="size-14 text-white bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full p-3 shadow-lg ring-4 ring-white/20" />
        </motion.div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          I am an Admin
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 text-center max-w-md">
          Log in as an admin to manage and review support tickets.
        </p>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          className="w-full mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.visit('/login')}
        >
          <ShieldCheck className="mr-2 size-4" />
          Go to Admin Portal
        </Button>
      </motion.div>
    </div>
  </motion.div>

  {/* User Card */}
  <motion.div 
    className="relative group w-full bg-white dark:bg-gray-900 rounded-2xl border p-0 shadow-lg transition-all duration-300 overflow-hidden h-full hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    {/* Accent Banner */}
    <div className="h-32 bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-600 w-full relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000"></div>
    </div>

    {/* Content */}
    <div className="flex flex-col justify-between px-8 py-10 -mt-20 z-10 relative h-[360px]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <UserPlus className="size-14 text-white bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full p-3 shadow-lg ring-4 ring-white/20" />
        </motion.div>
        <h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">
          I am a User
        </h2>
        <p className="text-base text-gray-600 dark:text-gray-300 text-center max-w-md">
          Need help? Submit a new support ticket to our IT team.
        </p>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => router.visit('/create-ticket')}
        >
          <UserPlus className="mr-2 size-4" />
          Create a Ticket
        </Button>
      </motion.div>
    </div>
  </motion.div>
</motion.div>

                </div>
            </LandingLayout>
        </>
    );
}
