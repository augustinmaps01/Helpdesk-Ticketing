import { showWelcomeAlert, showSuccessAlert, showErrorAlert, showInfoAlert, showConfirmAlert } from './sweetAlert';

// Example usage of different SweetAlert functions

export const exampleUsage = {
    // Welcome Alert Examples
    showLoginWelcome: (userName: string) => {
        showWelcomeAlert({
            userName: userName,
            timer: 6000,
            showConfirmButton: true,
            position: 'center'
        });
    },

    showCustomWelcome: (userName: string, customMessage: string) => {
        showWelcomeAlert({
            userName: userName,
            message: customMessage,
            timer: 8000,
            position: 'top-end'
        });
    },

    // Success Alert Examples
    showTicketCreated: () => {
        showSuccessAlert(
            'Ticket Created! ✅',
            'Your support ticket has been submitted successfully. We\'ll get back to you soon!',
            4000
        );
    },

    showProfileUpdated: () => {
        showSuccessAlert(
            'Profile Updated! 📝',
            'Your profile information has been saved successfully.',
            3000
        );
    },

    // Error Alert Examples
    showLoginError: () => {
        showErrorAlert(
            'Login Failed! ❌',
            'Invalid credentials. Please check your email and password and try again.'
        );
    },

    showNetworkError: () => {
        showErrorAlert(
            'Connection Error! 🌐',
            'Unable to connect to the server. Please check your internet connection and try again.'
        );
    },

    // Info Alert Examples
    showMaintenance: () => {
        showInfoAlert(
            'System Maintenance 🔧',
            'Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM. Some features may be unavailable.',
            6000
        );
    },

    showNewFeature: () => {
        showInfoAlert(
            'New Feature! 🎉',
            'Check out our new dashboard analytics. You can now view detailed ticket reports!',
            5000
        );
    },

    // Confirm Alert Examples
    showDeleteConfirm: async () => {
        const result = await showConfirmAlert(
            'Delete Ticket? 🗑️',
            'This action cannot be undone. Are you sure you want to delete this ticket?',
            'Yes, delete it!'
        );

        if (result.isConfirmed) {
            showSuccessAlert('Deleted!', 'The ticket has been deleted successfully.', 3000);
        }
    },

    showLogoutConfirm: async () => {
        const result = await showConfirmAlert(
            'Logout? 👋',
            'Are you sure you want to log out of your account?',
            'Yes, logout'
        );

        if (result.isConfirmed) {
            // Handle logout logic here
            window.location.href = '/logout';
        }
    },

    // Custom positioned alerts
    showToastSuccess: (message: string) => {
        showSuccessAlert('Success!', message, 3000);
    },

    showToastInfo: (message: string) => {
        showInfoAlert('Info', message, 4000);
    }
};

// How to use in your components:
/*
import { exampleUsage } from '@/utils/sweetAlertExamples';

// In your component
const handleLogin = async () => {
    try {
        // Your login logic here
        await login(credentials);
        
        // Show welcome alert on successful login
        exampleUsage.showLoginWelcome(user.name);
        
    } catch (error) {
        // Show error alert on failed login
        exampleUsage.showLoginError();
    }
};

const handleDeleteTicket = () => {
    exampleUsage.showDeleteConfirm();
};

const handleTicketSubmit = async () => {
    try {
        // Your ticket creation logic here
        await createTicket(ticketData);
        
        // Show success alert
        exampleUsage.showTicketCreated();
        
    } catch (error) {
        exampleUsage.showNetworkError();
    }
};
*/