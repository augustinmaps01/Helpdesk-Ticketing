import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-transparent text-sidebar-primary-foreground flex-shrink-0">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm min-w-0">
                <span className="mb-0.5 leading-tight font-semibold whitespace-nowrap">IT Helpdesk Ticketing</span>
            </div>
        </>
    );
}
