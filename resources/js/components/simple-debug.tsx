import { useState } from 'react';
import { showWelcomeAlert, showSuccessAlert } from '@/utils/sweetAlert';
import Swal from 'sweetalert2';

export function SimpleDebug() {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setLogs(prev => [`${timestamp}: ${message}`, ...prev.slice(0, 9)]);
    };

    const testBasicSwal = () => {
        addLog('Testing basic Swal.fire...');
        try {
            Swal.fire('Hello!', 'Basic SweetAlert test', 'success');
            addLog('Basic SweetAlert worked!');
        } catch (error) {
            addLog(`Basic SweetAlert failed: ${error}`);
        }
    };

    const testWelcomeFunction = () => {
        addLog('Testing welcome function...');
        try {
            showWelcomeAlert({
                userName: 'Debug User',
                message: 'Testing welcome alert function',
                timer: 5000,
                position: 'center'
            });
            addLog('Welcome function called successfully');
        } catch (error) {
            addLog(`Welcome function failed: ${error}`);
        }
    };

    const testSuccessFunction = () => {
        addLog('Testing success function...');
        try {
            showSuccessAlert('Success!', 'Testing success alert function', 3000);
            addLog('Success function called successfully');
        } catch (error) {
            addLog(`Success function failed: ${error}`);
        }
    };

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">SweetAlert Debug Panel</h2>
            
            <div className="space-y-3 mb-6">
                <button 
                    onClick={testBasicSwal}
                    className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Test Basic SweetAlert
                </button>
                
                <button 
                    onClick={testWelcomeFunction}
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Test Welcome Alert Function
                </button>
                
                <button 
                    onClick={testSuccessFunction}
                    className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
                >
                    Test Success Alert Function
                </button>
                
                <button 
                    onClick={() => setLogs([])}
                    className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                    Clear Logs
                </button>
            </div>

            {logs.length > 0 && (
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded border">
                    <h3 className="font-semibold mb-2">Debug Logs:</h3>
                    <div className="space-y-1 text-sm font-mono">
                        {logs.map((log, index) => (
                            <div key={index} className="text-gray-700 dark:text-gray-300">
                                {log}
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Debugging Tips:</strong><br/>
                    1. Check browser console for errors<br/>
                    2. Make sure no popup blockers are active<br/>
                    3. Try refreshing the page<br/>
                    4. Test each button and check the logs below
                </p>
            </div>
        </div>
    );
}