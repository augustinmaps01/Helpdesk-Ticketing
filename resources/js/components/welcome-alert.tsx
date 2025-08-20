import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Home, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeAlertProps {
    show: boolean;
    userName?: string;
    message?: string;
    onClose: () => void;
    autoCloseDelay?: number;
}

export function WelcomeAlert({ 
    show, 
    userName = "User", 
    message, 
    onClose, 
    autoCloseDelay = 5000 
}: WelcomeAlertProps) {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);
        
        if (show && autoCloseDelay > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, autoCloseDelay);
            
            return () => clearTimeout(timer);
        }
    }, [show, autoCloseDelay]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for animation to complete
    };

    const defaultMessage = `Welcome back, ${userName}! 🎉`;
    const displayMessage = message || defaultMessage;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -100, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    transition={{
                        type: "spring",
                        duration: 0.6,
                        bounce: 0.3
                    }}
                    className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
                >
                    <div className="relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl overflow-hidden border border-green-400/20">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
                        
                        {/* Animated Background Particles */}
                        <div className="absolute inset-0 overflow-hidden">
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-2 h-2 bg-white/30 rounded-full"
                                    initial={{ 
                                        x: Math.random() * 300, 
                                        y: Math.random() * 100,
                                        scale: 0 
                                    }}
                                    animate={{ 
                                        y: [0, -20, 0],
                                        scale: [0, 1, 0],
                                        opacity: [0, 1, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        delay: i * 0.3,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                />
                            ))}
                        </div>

                        {/* Content */}
                        <div className="relative p-6 flex items-center gap-4">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="flex-shrink-0"
                            >
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                            </motion.div>

                            {/* Message */}
                            <div className="flex-1 min-w-0">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <Home className="w-4 h-4 text-white/90" />
                                        <h3 className="text-white font-semibold text-lg">Welcome Home!</h3>
                                        <Sparkles className="w-4 h-4 text-yellow-300" />
                                    </div>
                                    <p className="text-white/90 text-sm leading-relaxed">
                                        {displayMessage}
                                    </p>
                                    <p className="text-white/70 text-xs mt-1">
                                        You're now in your dashboard
                                    </p>
                                </motion.div>
                            </div>

                            {/* Close Button */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleClose}
                                    className="text-white/80 hover:text-white hover:bg-white/10 p-2 h-auto"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-1 bg-white/30"
                            initial={{ width: "100%" }}
                            animate={{ width: "0%" }}
                            transition={{ duration: autoCloseDelay / 1000, ease: "linear" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}