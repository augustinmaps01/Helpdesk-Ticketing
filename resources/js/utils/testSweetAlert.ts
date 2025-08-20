import Swal from 'sweetalert2';

export const testBasicSweetAlert = () => {
    console.log('Testing basic SweetAlert...');
    
    try {
        Swal.fire({
            title: 'Test Alert',
            text: 'This is a basic test to see if SweetAlert2 is working',
            icon: 'success',
            timer: 3000,
            showConfirmButton: true
        });
        console.log('Basic SweetAlert test completed');
    } catch (error) {
        console.error('SweetAlert test failed:', error);
    }
};

export const testAdvancedSweetAlert = () => {
    console.log('Testing advanced SweetAlert...');
    
    try {
        Swal.fire({
            title: 'Advanced Test! 🎉',
            text: 'Testing with custom styling and features',
            icon: 'success',
            timer: 5000,
            timerProgressBar: true,
            showConfirmButton: true,
            confirmButtonText: 'Awesome!',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#ffffff',
            iconColor: '#ffffff',
            customClass: {
                popup: 'test-popup'
            },
            didOpen: () => {
                console.log('Advanced SweetAlert opened successfully');
                const popup = Swal.getPopup();
                if (popup) {
                    popup.style.borderRadius = '16px';
                    popup.style.border = '1px solid rgba(255, 255, 255, 0.2)';
                }
            }
        });
    } catch (error) {
        console.error('Advanced SweetAlert test failed:', error);
    }
};