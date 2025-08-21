export const checkPasswordRequirements = (password: string) => {
    return {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /\d/.test(password),
        symbol: /[@$!%*?&]/.test(password),
    };
};

export const getPasswordStrength = (password: string) => {
    const checks = checkPasswordRequirements(password);
    return Object.values(checks).filter(Boolean).length;
};

export const isPasswordComplete = (password: string) => {
    return getPasswordStrength(password) === 5;
};