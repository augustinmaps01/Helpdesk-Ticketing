import AppLogoIcon from '@/components/app-logo-icon';
import AppFooter from '@/components/app-footer';
import { type PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
    titleClassName = 'text-xl font-medium',
    descriptionClassName = 'text-sm text-muted-foreground',
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col bg-gradient-to-br from-background via-background to-muted/20">
            <div className="flex flex-1 items-center justify-center gap-6 p-6 md:p-10">
            <motion.div 
                className="w-full max-w-md"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col gap-8 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-10 shadow-2xl">
                    <motion.div 
                        className="flex flex-col items-center gap-4"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <motion.div 
                            className="mb-1 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/10"
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <AppLogoIcon className="size-8 fill-current text-primary" />
                        </motion.div>

                        {(title || description) && (
                            <div className="space-y-2 text-center">
                                {title && <h1 className={titleClassName}>{title}</h1>}
                                {description && <p className={descriptionClassName}>{description}</p>}
                            </div>
                        )}
                    </motion.div>

                    {children}
                </div>
            </motion.div>
            </div>
            <AppFooter />
        </div>
    );
}
