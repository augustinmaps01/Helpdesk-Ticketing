import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';

interface AuthLayoutProps {
    children: React.ReactNode;
    title?: string; // Optional now
    description?: string; // Optional now
    titleClassName?: string; // Optional custom class for title
    descriptionClassName?: string; // Optional custom class for description
}

export default function AuthLayout({
    children,
    title,
    description,
    titleClassName = 'text-xl font-medium', // Default title style
    descriptionClassName = 'text-sm text-muted-foreground', // Default description style
    ...props
}: AuthLayoutProps) {
    return (
        <AuthLayoutTemplate
            title={title}
            description={description}
            titleClassName={titleClassName}
            descriptionClassName={descriptionClassName}
            {...props}
        >
            {children}
        </AuthLayoutTemplate>
    );
}
