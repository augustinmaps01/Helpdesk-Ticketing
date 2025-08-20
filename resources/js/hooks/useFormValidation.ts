import { useState, useCallback } from 'react';

interface ValidationRule {
  field: string;
  message: string;
  validator: (value: any) => boolean;
}

interface ValidationConfig {
  [key: string]: ValidationRule[];
}

export const useFormValidation = (validationConfig: ValidationConfig) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const { [field]: removed, ...rest } = prev;
      return rest;
    });
  }, []);

  const validateFields = useCallback((formData: Record<string, any>, steps: string[] | 'all') => {
    const newErrors: Record<string, string> = {};
    const rulesToApply: ValidationRule[] = [];

    if (steps === 'all') {
      Object.values(validationConfig).forEach(rules => rulesToApply.push(...rules));
    } else {
      steps.forEach(step => {
        if (validationConfig[step]) rulesToApply.push(...validationConfig[step]);
      });
    }

    rulesToApply.forEach(({ field, message, validator }) => {
      if (validator(formData[field])) {
        newErrors[field] = message;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [validationConfig]);

  const clearAllErrors = useCallback(() => setErrors({}), []);

  const setServerErrors = useCallback((serverErrors: Record<string, string>) => {
    setErrors(serverErrors);
  }, []);

  return { errors, clearError, validateFields, clearAllErrors, setServerErrors };
};