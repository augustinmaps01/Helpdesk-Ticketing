import React from 'react';
import { AlertCircle } from 'lucide-react';
import { PRIORITY_OPTIONS } from '@/utils/createTicketConstants';

interface PrioritySelectorProps {
    selectedPriority: string;
    onPriorityChange: (priority: string) => void;
    error?: string;
}

export const PrioritySelector: React.FC<PrioritySelectorProps> = React.memo(({
    selectedPriority,
    onPriorityChange,
    error,
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-primary" />
                Priority Level
            </label>
            <div className="grid grid-cols-3 gap-3">
                {PRIORITY_OPTIONS.map((priority) => (
                    <label key={priority.value} className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-${priority.color}-300 hover:bg-${priority.color}-50 dark:hover:bg-${priority.color}-900/20 ${
                        selectedPriority === priority.value ? `border-${priority.color}-500 bg-${priority.color}-50 dark:bg-${priority.color}-900/20` : 'border-border'
                    }`}>
                        <input
                            type="radio"
                            name="priority"
                            value={priority.value}
                            checked={selectedPriority === priority.value}
                            onChange={(e) => onPriorityChange(e.target.value)}
                            className="sr-only"
                        />
                        <div className={`w-3 h-3 rounded-full bg-${priority.color}-500 mb-2`}></div>
                        <span className="text-sm font-medium">{priority.label}</span>
                        <span className="text-xs text-muted-foreground text-center">{priority.desc}</span>
                    </label>
                ))}
            </div>
            {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
            )}
        </div>
    );
});