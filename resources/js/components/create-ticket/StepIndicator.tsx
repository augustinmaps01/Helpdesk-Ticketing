import React from 'react';
import { motion } from 'framer-motion';
import { StepConfig } from '@/utils/createTicketTypes';

interface StepIndicatorProps {
    steps: StepConfig[];
    currentStep: number;
}

export const StepIndicator: React.FC<StepIndicatorProps> = React.memo(({
    steps,
    currentStep,
}) => {
    return (
        <div className="flex justify-center mt-6 px-2">
            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4 w-full max-w-full overflow-x-auto">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = currentStep === step.id;
                    const isCompleted = currentStep > step.id;

                    return (
                        <div key={step.id} className="flex items-center flex-shrink-0">
                            <div className="flex flex-col items-center">
                                <motion.div
                                    className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                                        isActive
                                            ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                            : isCompleted
                                            ? 'border-green-500 bg-green-500 text-white'
                                            : 'border-muted-foreground/30 text-muted-foreground'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                </motion.div>
                                <span className={`mt-1 text-xs sm:text-sm font-medium text-center max-w-[60px] sm:max-w-none leading-tight ${
                                    isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                                }`}>
                                    <span className="hidden sm:inline">{step.title}</span>
                                    <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`w-4 sm:w-6 md:w-8 h-0.5 mx-1 sm:mx-2 md:mx-4 ${
                                    isCompleted ? 'bg-green-500' : 'bg-muted-foreground/20'
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
});