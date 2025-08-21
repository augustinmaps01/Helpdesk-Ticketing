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
import { Tag, List } from 'lucide-react';
import { CategoryFormData } from '@/types/category';

interface CategoryDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    data: CategoryFormData;
    setData: (field: string, value: string) => void;
    processing: boolean;
    editingId: number | null;
}

export const CategoryDialog: React.FC<CategoryDialogProps> = React.memo(({
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
                        <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                            <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        {editingId ? 'Edit Category' : 'Create New Category'}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <FormInputGroup
                        id="name"
                        name="name"
                        label="Category Name"
                        type="text"
                        placeholder="e.g., Bug Report, Feature Request"
                        required
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        icon={<Tag className="w-4 h-4" />}
                    />

                    <FormInputGroup
                        id="description"
                        name="description"
                        label="Description"
                        type="text"
                        placeholder="Brief description of the category"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        icon={<List className="w-4 h-4" />}
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
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800"
                    >
                        {processing ? (
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                {editingId ? 'Updating...' : 'Creating...'}
                            </div>
                        ) : (
                            editingId ? 'Update Category' : 'Create Category'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
});