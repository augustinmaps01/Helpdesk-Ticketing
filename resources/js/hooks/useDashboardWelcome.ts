import { useEffect } from 'react';
import { showWelcomeAlert } from '@/utils/sweetAlert';

interface WelcomeAlertOptions {
  loginSuccess?: boolean;
  welcomeMessage?: string;
  userName?: string;
}

export const useDashboardWelcome = ({ 
  loginSuccess, 
  welcomeMessage, 
  userName 
}: WelcomeAlertOptions) => {
  useEffect(() => {
    if (loginSuccess && welcomeMessage && userName) {
      console.log('🎯 Login success detected! Triggering welcome alert...');
      console.log('📊 Flash data:', { loginSuccess, welcome: welcomeMessage });

      showWelcomeAlert({
        userName,
        message: welcomeMessage,
        timer: 2000,
        showConfirmButton: true,
        position: 'top-end'
      }).then(() => {
        console.log('✅ Welcome alert completed successfully');
      }).catch((error) => {
        console.error('❌ Welcome alert failed:', error);
      });
    }
  }, [loginSuccess, welcomeMessage, userName]);
};