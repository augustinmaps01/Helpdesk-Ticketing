import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Camera } from 'lucide-react';
import FormInputGroup from '@/components/FormInputGroup';
import ImageUploader from '@/components/image-upload';
import { PrioritySelector } from './PrioritySelector';
import { ApprovalRequirementsInfo } from './ApprovalRequirementsInfo';
import { CreateTicketFormData, Category } from '@/utils/createTicketTypes';
import { getCategoryIcon } from '@/utils/createTicketHelpers';

interface TicketDetailsStepProps {
    formData: CreateTicketFormData;
    errors: Record<string, string>;
    categories: Category[];
    onInputChange: (name: string, value: string | number | boolean | File | null) => void;
}

export const TicketDetailsStep: React.FC<TicketDetailsStepProps> = React.memo(({
    formData,
    errors,
    categories,
    onInputChange,
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 w-full max-w-full overflow-x-hidden"
        >
            <div className="mb-6">
                <h3 className="text-lg sm:text-xl font-semibold text-foreground flex items-center gap-2">
                    <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Ticket Details
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Describe your IT support request in detail</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <FormInputGroup
                        id="subject"
                        name="subject"
                        label="Subject/Title"
                        className="h-12"
                        type="text"
                        placeholder="Brief description of your issue"
                        value={formData.subject}
                        onChange={(e) => onInputChange('subject', e.target.value)}
                        error={errors.subject}
                        required
                    />
                </div>

                <FormInputGroup
                    id="category"
                    name="category"
                    label="Issue Category"
                    className="h-12"
                    type="select"
                    value={formData.category}
                    onChange={(e) => onInputChange('category', e.target.value)}
                    error={errors.category}
                    options={[
                        { label: 'Select Category', value: '' },
                        ...categories.map(category => ({
                            label: `${getCategoryIcon(category)} ${category.name}`,
                            value: category.id.toString()
                        }))
                    ]}
                    required
                />

                <div>
                    <PrioritySelector
                        selectedPriority={formData.priority}
                        onPriorityChange={(priority) => onInputChange('priority', priority)}
                        error={errors.priority}
                    />
                    <ApprovalRequirementsInfo />
                </div>
            </div>

            <FormInputGroup
                id="description"
                name="description"
                label="Detailed Description"
                className="h-32"
                type="textarea"
                placeholder="Please provide as much detail as possible about your issue, including any error messages, when it started, and steps you've already tried..."
                value={formData.description}
                onChange={(e) => onInputChange('description', e.target.value)}
                error={errors.description}
                required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                        <input
                            type="checkbox"
                            name="requires_approval"
                            checked={formData.requires_approval}
                            onChange={(e) => onInputChange('requires_approval', e.target.checked)}
                            className="rounded"
                        />
                        <div>
                            <span className="text-sm font-medium">Requires Management Approval</span>
                            <p className="text-xs text-muted-foreground">Check if this request needs supervisor approval</p>
                        </div>
                    </label>
                </div>
            </div>

            <div className="border border-border rounded-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                    <Camera className="w-5 h-5 text-primary" />
                    <h4 className="font-medium">Screenshot of a problem <span className="text-red-500">*</span></h4>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Please provide a screenshot or image showing the issue you're experiencing. This helps our IT team understand the problem better.</p>
                <ImageUploader
                    onChange={(files) => onInputChange('screenshot', files.length > 0 ? files[0] : null)}
                    error={errors.screenshot}
                    required={true}
                />
            </div>
        </motion.div>
    );
});