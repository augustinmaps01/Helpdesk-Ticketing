import { Head, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import TextLink from "@/components/text-link";
import AppLogoIcon from "@/components/app-logo-icon";
import AppFooter from "@/components/app-footer";
import { Plus, Home, User, FileText, AlertCircle, Camera, CheckCircle2, Clock, ArrowRight, Send, Lightbulb } from "lucide-react";
import AppearanceToggleDropdown from "@/components/appearance-dropdown";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ImageUploader from "@/components/image-upload";
import FormInputGroup from "@/components/FormInputGroup";
import { useState, useEffect } from "react";
import { useFormValidation } from "@/hooks/useFormValidation";
import { ticketValidationRules, validateTicketStep } from "@/validation/ticketValidation";
import TroubleshootingDialog from "@/components/TroubleshootingDialog";

type Category = {
    id: number;
    name: string;
    description?: string;
    icon?: string;
};

type Branch = {
    id: number;
    branch_name: string;
};

type Department = {
    id: number;
    name: string;
};

type Role = {
    id: number;
    name: string;
};

interface CreateUserTicketProps {
    categories: Category[];
    branches: Branch[];
    departments: Department[];
    roles: Role[];
}

// Helper function to get category icons
const getCategoryIcon = (category: Category): string => {
    // Use the icon from database if available
    if (category.icon) {
        return category.icon;
    }

    // Fallback to hardcoded icons based on category name
    const iconMap: { [key: string]: string } = {
        'Hardware Issues': '🖥️',
        'Software Problems': '💻',
        'Network/Internet': '🌐',
        'Account/Access': '🔐',
        'Mobile/Phone': '📱',
        'Printer/Scanner': '🖨️',
        'Email Issues': '📧',
        'Other': '🆘'
    };
    return iconMap[category.name] || '📋';
};

// Helper functions to get names by ID
const getBranchName = (branchId: string, branches: Branch[]): string => {
    const branch = branches.find(b => b.id.toString() === branchId);
    return branch ? branch.branch_name : 'Not selected';
};

const getDepartmentName = (departmentId: string, departments: Department[]): string => {
    const department = departments.find(d => d.id.toString() === departmentId);
    return department ? department.name : 'Not selected';
};

const getCategoryName = (categoryId: string, categories: Category[]): string => {
    const category = categories.find(c => c.id.toString() === categoryId);
    return category ? category.name : 'Not selected';
};

const getRoleName = (roleId: string, roles: Role[]): string => {
    const role = roles.find(r => r.id.toString() === roleId);
    return role ? role.name : 'Not selected';
};

export default function CreateUserTicket({ categories = [], branches = [], departments = [], roles = [] }: CreateUserTicketProps) {
    const [open, setOpen] = useState(false);
    const [showTroubleshootingDialog, setShowTroubleshootingDialog] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1 - Personal Info
        submitted_by: '',
        mobile_no: '',
        branch: '',
        department: '',
        position: '',
        // Step 2 - Ticket Details
        subject: '',
        category: '',
        priority: '',
        description: '',
        requires_approval: false,
        urgent_business_impact: false,
        screenshot: null // Required screenshot attachment
    });

    const { errors, clearError, validateFields, clearAllErrors, setServerErrors } = useFormValidation(ticketValidationRules);
    const { post, processing } = useForm();

    // Show troubleshooting dialog on page load
    useEffect(() => {
        setShowTroubleshootingDialog(true);
    }, []);

    const steps = [
        { id: 1, title: "Personal Info", icon: User },
        { id: 2, title: "Ticket Details", icon: FileText },
        { id: 3, title: "Review & Submit", icon: CheckCircle2 }
    ];

    const handleInputChange = (name: string, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) clearError(name);
    };

    const validateStep = (step: number | 'all') => {
        return validateFields(formData, validateTicketStep(formData, step));
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(Math.min(3, currentStep + 1));
            clearAllErrors();
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(Math.max(1, currentStep - 1));
        clearAllErrors();
    };

    const handleSubmit = () => {
        if (validateStep('all')) { // Validate all required fields
            post('/tickets', {
                data: formData,
                onSuccess: () => {
                    setOpen(false);
                    setCurrentStep(1);
                    setFormData({
                        submitted_by: '',
                        mobile_no: '',
                        branch: '',
                        department: '',
                        position: '',
                        subject: '',
                        category: '',
                        priority: '',
                        description: '',
                        requires_approval: false,
                        urgent_business_impact: false,
                        screenshot: null
                    });
                    clearAllErrors();
                },
                onError: (serverErrors) => {
                    setServerErrors(serverErrors);
                }
            });
        }
    };

  return (
    <>
        <Head title="Create User Ticket" />

        <TroubleshootingDialog
            open={showTroubleshootingDialog}
            onOpenChange={setShowTroubleshootingDialog}
        />

        {/* Custom Full-Screen Layout */}
        <div className="flex min-h-svh flex-col bg-gradient-to-br from-background via-background to-muted/10">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <AppearanceToggleDropdown />
            </div>

            <div className="flex flex-1 items-center justify-center p-2 sm:p-4 lg:p-6">

                {/* Main Content - Responsive Center */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-2xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 space-y-6 sm:space-y-8 transition-all duration-300 ease-in-out mx-auto"
                >
                {/* Logo Section - Top of Card */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex justify-center -mt-4 mb-6"
                >
                    <div className="w-28 h-20 flex items-center justify-center">
                        <AppLogoIcon size="w-20 h-16" className="drop-shadow-sm" />
                    </div>
                </motion.div>
                {/* Header */}
                <motion.div
                    className="text-center space-y-4 -mt-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent leading-tight">
                        IT Support Portal
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
                        Submit your IT request and get help from our technical team
                    </p>
                </motion.div>

                {/* Stats Cards - Responsive Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800">
                        <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-blue-900 dark:text-blue-100">Avg Response</div>
                        <div className="text-xs text-blue-600 dark:text-blue-400">&lt; 2 hours</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800">
                        <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-green-900 dark:text-green-100">Success Rate</div>
                        <div className="text-xs text-green-600 dark:text-green-400">98.5%</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200 dark:border-purple-800">
                        <User className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                        <div className="text-sm font-medium text-purple-900 dark:text-purple-100">Support Team</div>
                        <div className="text-xs text-purple-600 dark:text-purple-400">24/7 Available</div>
                    </div>
                </motion.div>

                {/* Quick Troubleshooting Button */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-center"
                >
                    <Button
                        onClick={() => setShowTroubleshootingDialog(true)}
                        variant="outline"
                        className="w-full mb-4 border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                    >
                        <Lightbulb className="w-4 h-4 mr-2" />
                        View Quick Troubleshooting Tips
                    </Button>
                </motion.div>

                {/* Dialog Trigger + Content */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <Button
                                className="w-full py-4 sm:py-6 text-base sm:text-lg font-semibold bg-gradient-to-r from-primary via-primary to-primary/80 hover:from-primary/90 hover:via-primary hover:to-primary/70 text-primary-foreground rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 group"
                            >
                                <Plus className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-90 transition-transform duration-300" />
                                <span className="hidden sm:inline">Create New Ticket</span>
                                <span className="sm:hidden">Create Ticket</span>
                                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </Button>
                        </motion.div>
                    </DialogTrigger>

                <DialogContent size="xl"
                    className="w-[95vw] h-[95vh] max-w-[95vw] sm:max-w-[90vw] md:max-w-4xl lg:max-w-6xl xl:max-w-7xl overflow-x-hidden overflow-y-auto bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 mx-auto">
                    <DialogHeader className="text-center pb-6 border-b border-border/30 w-full max-w-full overflow-x-hidden">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-full max-w-full overflow-x-hidden"
                        >
                            <DialogTitle className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent break-words">
                                Create Support Ticket
                            </DialogTitle>
                            <DialogDescription className="text-sm sm:text-base text-muted-foreground mt-2 break-words">
                                Please provide detailed information about your IT support request
                            </DialogDescription>
                        </motion.div>

                        {/* Step Indicator */}
                        <div className="flex justify-center mt-6 px-2">
                            <div className="flex items-center justify-center space-x-1 sm:space-x-2 md:space-x-4 w-full max-w-full overflow-x-auto">
                                {steps.map((step, index) => {
                                    const Icon = step.icon;
                                    const isActive = currentStep === step.id;
                                    const isCompleted = currentStep > step.id;

                                    return (
                                        <div key={step.id} className="flex items-center flex-shrink-0">
                                            <div className="flex flex-col items-center">
                                                <motion.div
                                                    className={`relative flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 ${
                                                        isActive
                                                            ? 'border-primary bg-primary text-primary-foreground shadow-md'
                                                            : isCompleted
                                                            ? 'border-green-500 bg-green-500 text-white'
                                                            : 'border-muted-foreground/30 text-muted-foreground'
                                                    }`}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                                                </motion.div>
                                                <span className={`mt-1 text-xs sm:text-sm font-medium text-center max-w-[60px] sm:max-w-none leading-tight ${
                                                    isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                                                }`}>
                                                    <span className="hidden sm:inline">{step.title}</span>
                                                    <span className="sm:hidden">{step.title.split(' ')[0]}</span>
                                                </span>
                                            </div>
                                            {index < steps.length - 1 && (
                                                <div className={`w-4 sm:w-6 md:w-8 h-0.5 mx-1 sm:mx-2 md:mx-4 ${
                                                    isCompleted ? 'bg-green-500' : 'bg-muted-foreground/20'
                                                }`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Enhanced Form */}
                    <div className="flex-1 overflow-x-hidden overflow-y-auto max-h-[calc(95vh-180px)] sm:max-h-[calc(95vh-200px)] md:max-h-[calc(95vh-220px)] scrollbar-thin scrollbar-thumb-border/20 scrollbar-track-transparent px-2 sm:px-4">
                        <motion.form
                            className="mt-4 sm:mt-6 md:mt-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-x-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                        {/* Step 1: Personal Information */}
                        {currentStep === 1 && (
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
                                        onChange={(e) => handleInputChange('submitted_by', e.target.value)}
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
                                        onChange={(e) => handleInputChange('mobile_no', e.target.value)}
                                        error={errors.mobile_no}
                                    />
                                    <FormInputGroup
                                        id="branch"
                                        name="branch"
                                        label="Branch/BLU"
                                        className="h-12"
                                        type="select"
                                        value={formData.branch}
                                        onChange={(e) => handleInputChange('branch', e.target.value)}
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
                                        onChange={(e) => handleInputChange('department', e.target.value)}
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
                                        onChange={(e) => handleInputChange('position', e.target.value)}
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
                        )}

                        {/* Step 2: Ticket Details */}
                        {currentStep === 2 && (
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
                                            onChange={(e) => handleInputChange('subject', e.target.value)}
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
                                        onChange={(e) => handleInputChange('category', e.target.value)}
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
                                        <label className="block text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                                            <AlertCircle className="w-4 h-4 text-primary" />
                                            Priority Level
                                        </label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { label: "Low", value: "low", color: "green", desc: "Not urgent" },
                                                { label: "Medium", value: "medium", color: "yellow", desc: "Moderate impact" },
                                                { label: "High", value: "high", color: "red", desc: "Business critical" },
                                            ].map((priority) => (
                                                <label key={priority.value} className={`relative flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-${priority.color}-300 hover:bg-${priority.color}-50 dark:hover:bg-${priority.color}-900/20 ${
                                                    formData.priority === priority.value ? `border-${priority.color}-500 bg-${priority.color}-50 dark:bg-${priority.color}-900/20` : 'border-border'
                                                }`}>
                                                    <input
                                                        type="radio"
                                                        name="priority"
                                                        value={priority.value}
                                                        checked={formData.priority === priority.value}
                                                        onChange={(e) => handleInputChange('priority', e.target.value)}
                                                        className="sr-only"
                                                    />
                                                    <div className={`w-3 h-3 rounded-full bg-${priority.color}-500 mb-2`}></div>
                                                    <span className="text-sm font-medium">{priority.label}</span>
                                                    <span className="text-xs text-muted-foreground text-center">{priority.desc}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.priority && (
                                            <p className="text-sm text-red-500 mt-1">{errors.priority}</p>
                                        )}

                                        {/* Approval Requirements Info */}
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
                                    onChange={(e) => handleInputChange('description', e.target.value)}
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
                                                onChange={(e) => handleInputChange('requires_approval', e.target.checked)}
                                                className="rounded"
                                            />
                                            <div>
                                                <span className="text-sm font-medium">Requires Management Approval</span>
                                                <p className="text-xs text-muted-foreground">Check if this request needs supervisor approval</p>
                                            </div>
                                        </label>
                                    </div>

                                    <div>
                                        <label className="flex items-center space-x-3 p-4 border border-border rounded-xl hover:bg-muted/50 transition-colors cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="urgent_business_impact"
                                                checked={formData.urgent_business_impact}
                                                onChange={(e) => handleInputChange('urgent_business_impact', e.target.checked)}
                                                className="rounded"
                                            />
                                            <div>
                                                <span className="text-sm font-medium">Business Impact</span>
                                                <p className="text-xs text-muted-foreground">This issue affects business operations</p>
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
                                        onChange={(files) => handleInputChange('screenshot', files.length > 0 ? files[0] : null)}
                                        error={errors.screenshot}
                                        required={true}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Review & Submit */}
                        {currentStep === 3 && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6 w-full max-w-full overflow-x-hidden"
                            >
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                                        <CheckCircle2 className="w-5 h-5 text-primary" />
                                        Review & Submit
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">Please review your information before submitting</p>
                                </div>

                                <div className="bg-muted/30 rounded-xl p-6 space-y-4">
                                    <h4 className="font-medium text-foreground">Ticket Summary</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div><span className="text-muted-foreground">Name:</span> <span className="font-medium">{formData.submitted_by || 'Not provided'}</span></div>
                                        <div><span className="text-muted-foreground">Mobile:</span> <span className="font-medium">{formData.mobile_no || 'Not provided'}</span></div>
                                        <div><span className="text-muted-foreground">Branch:</span> <span className="font-medium">{getBranchName(formData.branch, branches)}</span></div>
                                        <div><span className="text-muted-foreground">Department:</span> <span className="font-medium">{getDepartmentName(formData.department, departments)}</span></div>
                                        <div><span className="text-muted-foreground">Position:</span> <span className="font-medium">{getRoleName(formData.position, roles)}</span></div>
                                        <div><span className="text-muted-foreground">Category:</span> <span className="font-medium">{getCategoryName(formData.category, categories)}</span></div>
                                        <div><span className="text-muted-foreground">Subject:</span> <span className="font-medium">{formData.subject || 'Not provided'}</span></div>
                                        <div><span className="text-muted-foreground">Priority:</span> <span className={`font-medium ${
                                            formData.priority === 'high' ? 'text-red-600' :
                                            formData.priority === 'medium' ? 'text-yellow-600' :
                                            formData.priority === 'low' ? 'text-green-600' : ''
                                        }`}>{formData.priority ? formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1) : 'Not selected'}</span></div>
                                    </div>
                                </div>

                                {/* Approval Workflow Preview */}
                                {formData.priority && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                                        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                                            <AlertCircle className="w-5 h-5" />
                                            Approval Workflow for {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                                        </h4>

                                        <div className="space-y-4">
                                            {/* Step 1: Submission */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                    ✓
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">1. Ticket Submission</div>
                                                    <div className="text-xs text-muted-foreground">Your ticket will be submitted to the system</div>
                                                </div>
                                            </div>

                                            {/* Step 2: Approval */}
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium border-2 ${
                                                    formData.priority === 'high' ? 'border-red-500 text-red-600' :
                                                    formData.priority === 'medium' ? 'border-yellow-500 text-yellow-600' :
                                                    'border-green-500 text-green-600'
                                                }`}>
                                                    2
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm">
                                                        2. Approval Required - {' '}
                                                        {formData.priority === 'high' && 'President'}
                                                        {formData.priority === 'medium' && 'Manager'}
                                                        {formData.priority === 'low' && 'Manager/BLU Head'}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {formData.priority === 'high' && 'Requires executive-level approval due to business critical impact'}
                                                        {formData.priority === 'medium' && 'Requires managerial approval for operational impact'}
                                                        {formData.priority === 'low' && 'Requires departmental approval for standard requests'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Step 3: Processing */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                                                    3
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm text-gray-500">3. IT Team Assignment</div>
                                                    <div className="text-xs text-muted-foreground">Once approved, ticket will be assigned to IT team</div>
                                                </div>
                                            </div>

                                            {/* Step 4: Resolution */}
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 border-2 border-gray-300 text-gray-400 rounded-full flex items-center justify-center text-sm font-medium">
                                                    4
                                                </div>
                                                <div className="flex-1">
                                                    <div className="font-medium text-sm text-gray-500">4. Issue Resolution</div>
                                                    <div className="text-xs text-muted-foreground">IT team will work on resolving your issue</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                            <div className="text-xs text-blue-800 dark:text-blue-200 font-medium">
                                                💡 Estimated Timeline: {' '}
                                                {formData.priority === 'high' && '1-2 hours (after approval)'}
                                                {formData.priority === 'medium' && '4-8 hours (after approval)'}
                                                {formData.priority === 'low' && '1-2 business days (after approval)'}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="flex items-center justify-center p-6 border-2 border-dashed border-primary/30 rounded-xl">
                                    <div className="text-center">
                                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-2" />
                                        <p className="text-sm text-muted-foreground">Ready to submit your ticket</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between pt-8 border-t border-border/30">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handlePreviousStep}
                                disabled={currentStep === 1}
                                className="px-6"
                            >
                                Previous
                            </Button>

                            {currentStep < 3 ? (
                                <Button
                                    type="button"
                                    onClick={handleNextStep}
                                    className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                                >
                                    Next Step
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            ) : (
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={processing}
                                        className="px-8 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        {processing ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Submitting...
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <Send className="w-4 h-4" />
                                                Submit Ticket
                                            </div>
                                        )}
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                        </motion.form>
                    </div>
                </DialogContent>
            </Dialog>


                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <TextLink
                        href="/"
                        className="flex items-center justify-center text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group"
                    >
                        <Home className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                        Back to Portal Selection
                    </TextLink>
                </motion.div>
            </motion.div>
            </div>
            <AppFooter />
        </div>
    </>
  );
}
