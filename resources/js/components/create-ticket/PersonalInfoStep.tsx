import React from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import FormInputGroup from '@/components/FormInputGroup';
import { CreateTicketFormData, Branch, Department, Role } from '@/utils/createTicketTypes';

interface PersonalInfoStepProps {
    formData: CreateTicketFormData;
    errors: Record<string, string>;
    branches: Branch[];
    departments: Department[];
    roles: Role[];
    onInputChange: (name: string, value: string | number | boolean | File | null) => void;
}

export const PersonalInfoStep: React.FC<PersonalInfoStepProps> = React.memo(({
    formData,
    errors,
    branches,
    departments,
    roles,
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
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    Personal Information
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">Please provide your contact and organizational details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInputGroup
                    id="submitted_by"
                    name="submitted_by"
                    label="Full Name"
                    className="h-12"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.submitted_by}
                    onChange={(e) => onInputChange('submitted_by', e.target.value)}
                    error={errors.submitted_by}
                    required
                />
                <FormInputGroup
                    id="mobile_no"
                    name="mobile_no"
                    label="Mobile Number"
                    className="h-12"
                    type="text"
                    placeholder="Enter your mobile number"
                    value={formData.mobile_no}
                    onChange={(e) => onInputChange('mobile_no', e.target.value)}
                    error={errors.mobile_no}
                />
                <FormInputGroup
                    id="branch"
                    name="branch"
                    label="Branch/BLU"
                    className="h-12"
                    type="select"
                    value={formData.branch}
                    onChange={(e) => onInputChange('branch', e.target.value)}
                    error={errors.branch}
                    options={[
                        { label: 'Select Branch/BLU', value: '' },
                        ...branches.map(branch => ({
                            label: branch.branch_name,
                            value: branch.id.toString()
                        }))
                    ]}
                    required
                />
                <FormInputGroup
                    id="department"
                    name="department"
                    label="Department/Section"
                    className="h-12"
                    type="select"
                    value={formData.department}
                    onChange={(e) => onInputChange('department', e.target.value)}
                    error={errors.department}
                    options={[
                        { label: 'Select Department', value: '' },
                        ...departments.map(department => ({
                            label: department.name,
                            value: department.id.toString()
                        }))
                    ]}
                    required
                />
                <FormInputGroup
                    id="position"
                    name="position"
                    label="Position/Role"
                    className="h-12"
                    type="select"
                    value={formData.position}
                    onChange={(e) => onInputChange('position', e.target.value)}
                    error={errors.position}
                    options={[
                        { label: 'Select Position/Role', value: '' },
                        ...roles.map(role => ({
                            label: role.name,
                            value: role.id.toString()
                        }))
                    ]}
                    required
                />
            </div>
        </motion.div>
    );
});