import { router } from '@inertiajs/react';

interface WelcomeOptions {
    message?: string;
    userName?: string;
    redirectTo?: string;
}

export function useWelcomeAlert() {
    const triggerWelcome = (options: WelcomeOptions = {}) => {
        const { message, userName, redirectTo = '/dashboard' } = options;
        
        const welcomeData: Record<string, any> = { 
            loginSuccess: true 
        };
        
        if (message) {
            welcomeData.welcome = message;
        } else if (userName) {
            const defaultMessages = [
                `Welcome back, ${userName}! Ready to be productive? 🚀`,
                `Hello ${userName}! Your workspace is ready 📊`,
                `Great to see you, ${userName}! Let's get started 💪`,
                `Welcome home, ${userName}! Time to make things happen ⭐`
            ];
            welcomeData.welcome = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
        }
        
        router.visit(redirectTo, {
            data: welcomeData,
            method: 'get',
            preserveState: false,
            replace: true
        });
    };

    return { triggerWelcome };
}

// Predefined welcome messages for different scenarios
export const welcomeMessages = {
    login: (name: string) => `Welcome back, ${name}! Ready to tackle the day? 🌟`,
    firstTime: (name: string) => `Welcome to the team, ${name}! Let's get you started 🎉`,
    morning: (name: string) => `Good morning, ${name}! Hope you have a productive day ☀️`,
    afternoon: (name: string) => `Good afternoon, ${name}! Time to power through 💪`,
    evening: (name: string) => `Good evening, ${name}! Wrapping up for the day? 🌙`,
    weekend: (name: string) => `Working on the weekend, ${name}? You're dedicated! 👏`,
    custom: (name: string, message: string) => `${message.replace('{name}', name)}`
};