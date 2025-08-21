import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Send } from 'lucide-react';

interface StepNavigationProps {
    currentStep: number;
    totalSteps: number;
    processing: boolean;
    onPreviousStep: () => void;
    onNextStep: () => void;
    onSubmit: () => void;
}

export const StepNavigation: React.FC<StepNavigationProps> = React.memo(({
    currentStep,
    totalSteps,
    processing,
    onPreviousStep,
    onNextStep,
    onSubmit,
}) => {
    return (
        <div className="flex justify-between pt-8 border-t border-border/30">
            <Button
                type="button"
                variant="outline"
                onClick={onPreviousStep}
                disabled={currentStep === 1}
                className="px-6"
            >
                Previous
            </Button>

            {currentStep < totalSteps ? (
                <Button
                    type="button"
                    onClick={onNextStep}
                    className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                    Next Step
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            ) : (
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                        type="button"
                        onClick={onSubmit}
                        disabled={processing}
                        className="px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Submitting...
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Send className="w-4 h-4" />
                                Submit Ticket
                            </div>
                        )}
                    </Button>
                </motion.div>
            )}
        </div>
    );
});