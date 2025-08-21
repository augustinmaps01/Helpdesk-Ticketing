import Swal, { SweetAlertCustomClass, SweetAlertOptions } from 'sweetalert2';
interface WelcomeAlertOptions {
    userName?: string;
    message?: string;
    timer?: number;
    showConfirmButton?: boolean;
    position?: 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';
}

export const showWelcomeAlert = ({
    userName = 'User',
    message,
    timer = 2000,
    showConfirmButton = true,
    position = 'top-end',
}: WelcomeAlertOptions = {}, options: SweetAlertOptions = {}) => {
    console.log('🎯 showWelcomeAlert FUNCTION CALLED');
    console.log('📊 Parameters received:', { userName, message, timer, showConfirmButton, position });

    // Check if Swal is available
    if (typeof Swal === 'undefined') {
        console.error('❌ SweetAlert2 (Swal) is not available!');
        return Promise.reject('SweetAlert2 not loaded');
    }

    console.log('✅ SweetAlert2 is available');

    const defaultMessages = [
        `Welcome back, ${userName}! Ready to tackle some tickets? 🚀`,
        `Hello ${userName}! Your dashboard is ready and waiting 📊`,
        `Great to see you again, ${userName}! Let's get productive 💪`,
        `Welcome home, ${userName}! Time to make things happen ⭐`,
        `Hey ${userName}! Your IT command center awaits 🎯`,
    ];

    const displayMessage = message || defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    console.log('📝 Final display message:', displayMessage);

    console.log('🚀 About to call Swal.fire...');

    try {
        const result = Swal.fire({
            title: 'Welcome Home! 🏠',
            text: displayMessage,
            icon: 'success',
            position: position,
            timer: timer,
            timerProgressBar: true,
            showConfirmButton: showConfirmButton,
            confirmButtonText: "Let's Go! 💫",
            showCloseButton: true,
            toast: position !== 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            iconColor: '#ffffff',
            customClass: {
                popup: 'welcome-alert-popup',
                title: 'welcome-alert-title',
                confirmButton: 'welcome-alert-button',
                timerProgressBar: 'welcome-progress-bar',
            },
            didOpen: () => {
                console.log('🎉 SweetAlert OPENED successfully!');
                // Add custom styling
                const popup = Swal.getPopup();
                if (popup) {
                    popup.style.borderRadius = '16px';
                    popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                    popup.style.backdropFilter = 'blur(10px)';
                    popup.style.boxShadow = '0 25px 50px -12px rgba(0, 0, 0, 0.25)';
                }
            },
            willClose: () => {
                console.log('👋 Welcome alert closed');
            },
            ...options,
        });

        console.log('✅ Swal.fire called successfully, result:', result);
        return result;
    } catch (error) {
        console.error('❌ Error in Swal.fire:', error);
        // Fallback alert
        alert(`Welcome ${userName}! ${displayMessage}`);
        return Promise.reject(error);
    }
};

export const showSuccessAlert = (title: string, message: string, timer: number = 3000, options: SweetAlertOptions = {}) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'success',
        timer: timer,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: '#ffffff',
        iconColor: '#ffffff',
        customClass: {
            popup: 'success-alert-popup',
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
                popup.style.borderRadius = '12px';
                popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        },
        ...options,
    });
};

export const showErrorAlert = (title: string, message: string, options: SweetAlertOptions = {}) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'error',
        confirmButtonText: 'Got it',
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: '#ffffff',
        iconColor: '#ffffff',
        customClass: {
            popup: 'error-alert-popup',
            confirmButton: 'error-alert-button',
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
                popup.style.borderRadius = '16px';
                popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        },
        ...options,
    });
};

export const showInfoAlert = (title: string, message: string, timer: number = 4000, options: SweetAlertOptions = {}) => {
    return Swal.fire({
        title: title,
        text: message,
        icon: 'info',
        timer: timer,
        timerProgressBar: true,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
        color: '#ffffff',
        iconColor: '#ffffff',
        customClass: {
            popup: 'info-alert-popup',
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
                popup.style.borderRadius = '12px';
                popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        },
        ...options,
    });
};

export const showConfirmAlert = (
    title: string,
    message: string,
    confirmButtonText: string = 'Yes, do it!',
    options: SweetAlertOptions = {},
    backgroundColor?: string, // <- New prop for background
) => {
    const defaultOptions: SweetAlertOptions = {
        title: title,
        text: message,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: confirmButtonText,
        cancelButtonText: 'Cancel',
        reverseButtons: true,
        background: backgroundColor || 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        color: '#ffffff',
        iconColor: '#ffffff',
        customClass: {
            popup: 'confirm-alert-popup',
            confirmButton: 'confirm-alert-button',
            cancelButton: 'cancel-alert-button',
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            if (popup) {
                popup.style.borderRadius = '16px';
                popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
            }
        },
    };

    // Merge default and custom options
    const mergedOptions: SweetAlertOptions = {
        ...defaultOptions,
        ...options,
        customClass: {
            ...(defaultOptions.customClass as SweetAlertCustomClass),
            ...(options.customClass as SweetAlertCustomClass),
        },
    };

    return Swal.fire(mergedOptions);
};
