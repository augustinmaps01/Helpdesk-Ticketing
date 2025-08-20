import React from 'react';

interface AlertMessageProps {
    message: string;
    type: 'success' | 'error';
}

const AlertMessage: React.FC<AlertMessageProps> = ({ message, type }) => {
    if (!message) {
        return null; // Don't render if there's no message
    }

    const baseClasses = 'mb-4 p-3 rounded-md text-center text-sm border';
    const typeClasses =
        type === 'error'
            ? 'bg-red-100 text-red-700 border-red-200'
            : 'bg-green-100 text-green-700 border-green-200';

    return (
        <div className={`${baseClasses} ${typeClasses}`} role="alert">
            {message}
        </div>
    );
};

export default AlertMessage;
