import React from 'react';
import { motion } from 'framer-motion';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { PersonalInfoStep } from './PersonalInfoStep';
import { TicketDetailsStep } from './TicketDetailsStep';
import { ReviewSubmitStep } from './ReviewSubmitStep';
import { StepIndicator } from './StepIndicator';
import { StepNavigation } from './StepNavigation';
import { useCreateTicketForm } from '@/hooks/useCreateTicketForm';
import { STEPS_CONFIG } from '@/utils/createTicketConstants';
import { CreateUserTicketProps } from '@/utils/createTicketTypes';

interface CreateTicketDialogProps extends CreateUserTicketProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const CreateTicketDialog: React.FC<CreateTicketDialogProps> = React.memo(({
    open,
    onOpenChange,
    categories,
    branches,
    departments,
    roles,
}) => {
    const formHook = useCreateTicketForm();

    const handleSubmit = () => {
        formHook.handleSubmit(() => onOpenChange(false));
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent size="xl" className="w-[95vw] h-[95vh] max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl overflow-x-hidden overflow-y-auto bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 mx-auto">
                <DialogHeader className="text-center pb-6 border-b border-border/30 w-full max-w-full overflow-x-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-full overflow-x-hidden"
                    >
                        <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent break-words">
                            Create Support Ticket
                        </DialogTitle>
                        <DialogDescription className="text-sm sm:text-base text-muted-foreground mt-2 break-words">
                            Please provide detailed information about your IT support request
                        </DialogDescription>
                    </motion.div>

                    <StepIndicator 
                        steps={STEPS_CONFIG} 
                        currentStep={formHook.currentStep} 
                    />
                </DialogHeader>

                <div className="flex-1 overflow-x-hidden overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] md:max-h-[calc(95vh-220px)] scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent px-2 sm:px-4">
                    <motion.form
                        className="mt-4 sm:mt-6 md:mt-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-x-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {formHook.currentStep === 1 && (
                            <PersonalInfoStep
                                formData={formHook.formData}
                                errors={formHook.errors}
                                branches={branches}
                                departments={departments}
                                roles={roles}
                                onInputChange={formHook.handleInputChange}
                            />
                        )}

                        {formHook.currentStep === 2 && (
                            <TicketDetailsStep
                                formData={formHook.formData}
                                errors={formHook.errors}
                                categories={categories}
                                onInputChange={formHook.handleInputChange}
                            />
                        )}

                        {formHook.currentStep === 3 && (
                            <ReviewSubmitStep
                                formData={formHook.formData}
                                branches={branches}
                                departments={departments}
                                categories={categories}
                                roles={roles}
                            />
                        )}

                        <StepNavigation
                            currentStep={formHook.currentStep}
                            totalSteps={STEPS_CONFIG.length}
                            processing={formHook.processing}
                            onPreviousStep={formHook.handlePreviousStep}
                            onNextStep={formHook.handleNextStep}
                            onSubmit={handleSubmit}
                        />
                    </motion.form>
                </div>
            </DialogContent>
        </Dialog>
    );
});