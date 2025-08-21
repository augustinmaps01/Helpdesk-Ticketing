import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FormInputGroup from '@/components/FormInputGroup';
import { Building2 } from 'lucide-react';
import { DepartmentFormData } from '@/types/department';

interface DepartmentDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    data: DepartmentFormData;
    setData: (field: string, value: string) => void;
    processing: boolean;
    editingId: number | null;
}

export const DepartmentDialog: React.FC<DepartmentDialogProps> = React.memo(({
    isOpen,
    onOpenChange,
    onSave,
    onCancel,
    data,
    setData,
    processing,
    editingId,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent size="md" className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                            <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        {editingId ? 'Edit Department' : 'Create New Department'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <FormInputGroup
                        id="name"
                        name="name"
                        label="Department Name"
                        type="text"
                        placeholder="e.g., Human Resources, IT Support"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                    />
                </div>

                <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-2 pt-4">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            onClick={onCancel}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        onClick={onSave}
                        disabled={processing}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                    >
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                {editingId ? 'Updating...' : 'Creating...'}
                            </div>
                        ) : (
                            editingId ? 'Update Department' : 'Create Department'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});