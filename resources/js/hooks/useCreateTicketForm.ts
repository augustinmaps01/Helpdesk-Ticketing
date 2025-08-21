import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { useFormValidation } from '@/hooks/useFormValidation';
import { ticketValidationRules, validateTicketStep } from '@/validation/ticketValidation';
import { INITIAL_FORM_DATA } from '@/utils/createTicketConstants';
import { CreateTicketFormData } from '@/utils/createTicketTypes';

export const useCreateTicketForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<CreateTicketFormData>(INITIAL_FORM_DATA);
    
    const { errors, clearError, validateFields, clearAllErrors, setServerErrors } = useFormValidation(ticketValidationRules);
    const { post, processing } = useForm();

    const handleInputChange = (name: string, value: string | number | boolean | File | null) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) clearError(name);
    };

    const validateStep = (step: number | 'all') => {
        return validateFields(formData, validateTicketStep(formData, step));
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(Math.min(3, currentStep + 1));
            clearAllErrors();
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(Math.max(1, currentStep - 1));
        clearAllErrors();
    };

    const resetForm = () => {
        setCurrentStep(1);
        setFormData(INITIAL_FORM_DATA);
        clearAllErrors();
    };

    const handleSubmit = (onSuccess?: () => void) => {
        if (validateStep('all')) {
            post('/tickets', {
                data: formData,
                onSuccess: () => {
                    resetForm();
                    onSuccess?.();
                },
                onError: (serverErrors) => {
                    setServerErrors(serverErrors);
                }
            });
        }
    };

    return {
        // State
        currentStep,
        formData,
        errors,
        processing,
        
        // Actions
        handleInputChange,
        handleNextStep,
        handlePreviousStep,
        handleSubmit,
        resetForm,
        validateStep,
        
        // Utils
        setCurrentStep,
        clearAllErrors
    };
};