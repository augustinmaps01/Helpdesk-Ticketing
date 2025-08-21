import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Head } from '@inertiajs/react';
import AppFooter from '@/components/app-footer';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import TroubleshootingDialog from '@/components/TroubleshootingDialog';
import { CreateTicketPageLayout } from '@/components/create-ticket/CreateTicketPageLayout';
import { CreateTicketDialog } from '@/components/create-ticket/CreateTicketDialog';
import { CreateUserTicketProps } from '@/utils/createTicketTypes';

const CreateUserTicket: React.FC<CreateUserTicketProps> = React.memo(({ 
    categories = [], 
    branches = [], 
    departments = [], 
    roles = [] 
}) => {
    const [open, setOpen] = useState(false);
    const [showTroubleshootingDialog, setShowTroubleshootingDialog] = useState(false);
    
    // Memoized data arrays
    const categoriesArray = useMemo(() => Array.isArray(categories) ? categories : [], [categories]);
    const branchesArray = useMemo(() => Array.isArray(branches) ? branches : [], [branches]);
    const departmentsArray = useMemo(() => Array.isArray(departments) ? departments : [], [departments]);
    const rolesArray = useMemo(() => Array.isArray(roles) ? roles : [], [roles]);

    // Show troubleshooting dialog on page load
    useEffect(() => {
        setShowTroubleshootingDialog(true);
    }, []);

    // Memoized callbacks
    const handleDialogOpen = useCallback(() => {
        setOpen(true);
    }, []);

    const handleDialogChange = useCallback((isOpen: boolean) => {
        setOpen(isOpen);
    }, []);
    
    const handleShowTroubleshooting = useCallback(() => {
        setShowTroubleshootingDialog(true);
    }, []);

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

                {/* Main Content */}
                <CreateTicketPageLayout
                    onCreateTicket={handleDialogOpen}
                    onShowTroubleshooting={handleShowTroubleshooting}
                />

                {/* Dialog Content */}
                <CreateTicketDialog
                    open={open}
                    onOpenChange={handleDialogChange}
                    categories={categoriesArray}
                    branches={branchesArray}
                    departments={departmentsArray}
                    roles={rolesArray}
                />

                <AppFooter />
            </div>
        </>
    );
});

export default CreateUserTicket;