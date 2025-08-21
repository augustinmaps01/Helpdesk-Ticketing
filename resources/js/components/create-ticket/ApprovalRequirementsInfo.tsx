import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ApprovalRequirementsInfo: React.FC = React.memo(() => {
    return (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
            <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Approval Requirements
            </h4>
            <div className="space-y-2 text-xs text-blue-800 dark:text-blue-200">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span><strong>Low Priority:</strong> Requires approval by Manager/BLU Head</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                    <span><strong>Medium Priority:</strong> Requires approval by Manager</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <span><strong>High Priority:</strong> Requires approval by President</span>
                </div>
            </div>
        </div>
    );
});