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
import { Building } from 'lucide-react';
import { BranchFormData } from '@/types/branch';

interface BranchDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    data: BranchFormData;
    setData: (field: string, value: string) => void;
    processing: boolean;
    editingId: number | null;
}

export const BranchDialog: React.FC<BranchDialogProps> = React.memo(({
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
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <Building className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        {editingId ? 'Edit Branch' : 'Create New Branch'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <FormInputGroup
                        id="branch_name"
                        name="branch_name"
                        label="Branch Name"
                        type="text"
                        placeholder="e.g., Main Office, North Branch"
                        required
                        value={data.branch_name}
                        onChange={(e) => setData('branch_name', e.target.value)}
                    />

                    <FormInputGroup
                        id="brak"
                        name="brak"
                        label="BR/AR Number"
                        type="text"
                        placeholder="e.g., BR001, AR002"
                        required
                        value={data.brak}
                        onChange={(e) => setData('brak', e.target.value)}
                    />

                    <FormInputGroup
                        id="brcode"
                        name="brcode"
                        label="Branch Code"
                        type="text"
                        placeholder="e.g., MN, NB, SB"
                        required
                        value={data.brcode}
                        onChange={(e) => setData('brcode', e.target.value)}
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
                            editingId ? 'Update Branch' : 'Create Branch'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});