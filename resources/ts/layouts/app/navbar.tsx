import { AppIcon } from '@/components/ui/app-icon';
import { AppIconSmall } from '@/components/ui/app-icon-small';
import { Button } from '@/components/ui/flowbite/button';
import { paths } from '@/constants/paths';
import { routes } from '@/router/routes';
import { Route, RouteGroup } from '@/types';
import { GiHamburgerMenu } from '@react-icons/all-files/gi/GiHamburgerMenu';
import { NavigateFn, NavigateOptions, useNavigate } from '@tanstack/react-router';
import {
    Drawer,
    DrawerHeader,
    DrawerItems,
    Sidebar,
    SidebarCollapse,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems
} from 'flowbite-react';
import React, { memo } from 'react';

/**
 * DrawHeaderMemoized is a memoized version of the DrawHeader component.
 */
const DrawHeaderMemoized = memo(function DrawHeaderMemoized () {
    return <DrawerHeader title={import.meta.env.VITE_APP_NAME}
        titleIcon={AppIconSmall}
    />;
});

type DrawItemsMemoizedProps = {
    /*
     * A callback function triggered by the onclose event handler.
     */
    onClose?: () => void;
    /*
     * A listing of available routes.
     */
    routes: RouteGroup[];
};

/**
 * DrawItemsMemoized is a memoized version of the DrawItems component.
 *
 * This accepts a callback function triggered by the onclose event handler.
 * The callback should typically be memoized - to prevent re-renders.
 */
const DrawItemsMemoized = memo(function DrawItemsMemoized ({ onClose, routes }: DrawItemsMemoizedProps) {
    const navigate: NavigateFn = useNavigate();

    /**
     * handleNavigate navigates TanstackRouter to the path specified.
     *
     * Caches the handleNavigate function between re-renders until
     * the dependency "navigate" changes.
     */
    const handleNavigate = React.useCallback(
        (path: string) => async (event: React.MouseEvent<HTMLDivElement>): Promise<void> => {
            event.preventDefault();

            if (typeof onClose === 'function') {
                onClose();
            }

            await navigate({
                to: path
            } as NavigateOptions);
        },
        [onClose, navigate]
    );

    return (
        <DrawerItems>
            <Sidebar aria-label="Sidebar with multi-level dropdown example"
                className="[&>div]:bg-transparent [&>div]:p-0"
            >
                <SidebarItems>
                    <SidebarItemGroup>
                        {Array.from(routes.values()).map((group: RouteGroup): React.ReactNode => (
                            <React.Fragment key={group.id}>
                                {group.routes.map((route: Route): React.ReactNode => (
                                    <React.Fragment key={route.id}>
                                        {route.children && route.renderChildren
                                            ? (
                                                <SidebarCollapse key={route.id}
                                                    label={route.title}
                                                >
                                                    {route.renderSelf && (
                                                        <SidebarItem key={route.id}
                                                            onClick={handleNavigate(route.path)}
                                                        >
                                                            {route.title}
                                                        </SidebarItem>
                                                    )}
                                                    {route.children.map((route: Route) => (
                                                        <SidebarItem key={route.id}
                                                            onClick={handleNavigate(route.path)}
                                                        >
                                                            {route.title}
                                                        </SidebarItem>
                                                    ))}
                                                </SidebarCollapse>
                                            )
                                            : (
                                                <SidebarItem key={route.id}
                                                    onClick={handleNavigate(route.path)}
                                                >
                                                    {route.title}
                                                </SidebarItem>
                                            )}
                                    </React.Fragment>
                                ))}
                            </React.Fragment>
                        ))}
                    </SidebarItemGroup>
                </SidebarItems>
            </Sidebar>
        </DrawerItems>
    );
});

type NavbarFC = React.FC;

/**
 * Navbar renders a list of navigation links in a drawer menu.
 *
 * @constructor
 */
const Navbar: NavbarFC = memo((): React.ReactNode => {
    const navigate: NavigateFn = useNavigate();

    const [isOpen, setIsOpen] = React.useState(false);

    /**
     * handleClose is an event handler to the drawer.
     */
    const handleClose = React.useCallback(
        () => {
            setIsOpen(false);
        },
        []
    );

    return (
        <React.Fragment>
            <nav className="border-gray-200 bg-white dark:bg-gray-600">
                <div className="max-w-screen-x2 mx-auto flex flex-wrap items-center justify-between p-4">
                    <Button
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                        href=":void"
                        variant="text"
                        onClick={async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
                            event.preventDefault();
                            await navigate({ to: paths.root });
                        }}
                    >
                        <AppIcon />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap max-sm:text-base dark:text-white">
                            Blocks Online Test
                        </span>
                    </Button>
                    <div className="flex items-center space-x-0 rtl:space-x-reverse">
                        <Button
                            variant="text"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>): void => {
                                event.preventDefault();
                                setIsOpen(true);
                            }}
                        >
                            <GiHamburgerMenu size={30} />
                        </Button>
                        <Button
                            hidden={true}
                            variant="text"
                            onClick={async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
                                event.preventDefault();
                                await navigate({ to: paths.authenticated.logout });
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </div>
            </nav>
            <Drawer open={isOpen}
                onClose={handleClose}
            >
                <DrawHeaderMemoized />
                <DrawItemsMemoized routes={Array.from(routes.values())}
                    onClose={handleClose}
                />
            </Drawer>
        </React.Fragment>
    );
});

Navbar.displayName = 'Navbar';

export { Navbar };
