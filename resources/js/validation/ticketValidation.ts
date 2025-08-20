export const ticketValidationRules = {
    step1: [
        { field: 'submitted_by', message: 'Full name is required', validator: (val: any) => !val?.trim() },
        { field: 'mobile_no', message: 'Mobile number must be valid', validator: (val: any) => val && !/^[0-9+\-\s()]{10,15}$/.test(val.toString().replace(/\s/g, '')) },
        { field: 'branch', message: 'Branch/BLU is required', validator: (val: any) => !val },
        { field: 'department', message: 'Department is required', validator: (val: any) => !val },
        { field: 'position', message: 'Position is required', validator: (val: any) => !val }
    ],
    step2: [
        { field: 'subject', message: 'Subject is required', validator: (val: any) => !val?.trim() },
        { field: 'category', message: 'Category is required', validator: (val: any) => !val },
        { field: 'priority', message: 'Priority is required', validator: (val: any) => !val },
        { field: 'description', message: 'Description is required', validator: (val: any) => !val?.trim() },
        { field: 'screenshot', message: 'Screenshot of the problem is required', validator: (val: any) => !val }
    ]
};

export const validateTicketStep = (formData: Record<string, any>, step: number | 'all') => {
    const stepKey = step === 1 ? 'step1' : step === 2 ? 'step2' : 'all';
    return stepKey === 'all' ? 'all' : [stepKey];
};