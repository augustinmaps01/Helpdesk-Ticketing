import AppLogoIcon from '@/components/app-logo-icon';
import AppFooter from '@/components/app-footer';
import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import { type PropsWithChildren } from 'react';

interface defaultLayoutProps {
    name?: string;
    title?: string;
    description?: string;
    titleClassName?: string;
    descriptionClassName?: string;
}

export default function DefaultLayout({
    children,
    title,
    description,
    titleClassName = 'text-xl font-medium',
    descriptionClassName = 'text-sm text-muted-foreground',
}: PropsWithChildren<defaultLayoutProps>) {
    return (
        <div className="flex min-h-svh flex-col dark:bg-background">
            {/* Theme Toggle */}
            <div className="absolute top-4 right-4 z-50">
                <AppearanceToggleDropdown />
            </div>
            
            <div className="flex flex-1 items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-4xl"> {/* Changed from max-w-sm to max-w-4xl */}
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col items-center gap-4">
                        <div className="mb-6 flex h-9 w-24 items-center justify-center rounded-md">
                            <AppLogoIcon size="w-full h-auto" />

                        </div>

                        {(title || description) && (
                            <div className="space-y-2 text-center">
                                {title && <h1 className={titleClassName}>{title}</h1>}
                                {description && <p className={descriptionClassName}>{description}</p>}
                            </div>
                        )}
                    </div>

                    <div className="w-full">
                        {children}
                    </div>
                </div>
            </div>
            </div>
            <AppFooter />
        </div>
    );
}
