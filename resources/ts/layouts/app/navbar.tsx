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
 * DrawHeaderMemoized is a memoized functional component that renders a DrawerHeader with a title
 * and an optional icon. It leverages React.memo to prevent unnecessary re-renders,
 * optimising performance by memoizing the result.
 *
 * The title displayed in the DrawerHeader uses the value of the VITE_APP_NAME environment variable.
 * The titleIcon is a specific icon imported and passed to be displayed alongside the title.
 */
const DrawHeaderMemoized = memo(function DrawHeaderMemoized () {
    return <DrawerHeader title={import.meta.env.VITE_APP_NAME}
        titleIcon={AppIconSmall}
    />;
});

type DrawItemsMemoizedProps = {
    /**
     * Callback function that is executed when a close event is triggered.
     * Use this function to perform any clean-up or state management required when the associated component or process
     * is closed.
     */
    onClose?: () => void;
    /**
     * A mapping of route names to their corresponding route groups.
     * This prop is used to organise and manage application routes by grouping them into logical categories.
     *
     * Key: A string representing the name or path of the route.
     * Value: A `RouteGroup` object containing the associated routes and relevant metadata.
     */
    routes: Map<string, RouteGroup>;
};

/**
 * DrawItemsMemoized is a memoized functional component used to render a navigable sidebar
 * containing a list of routes organised into groups. It provides a UI for users to interact
 * with and navigate through different routes.
 *
 * The memoization ensures that the component renders efficiently by recalculating its output
 * only when its props change.
 *
 * Dependencies:
 * - `onClose`: An optional callback function that is executed when a navigation action occurs.
 * - `routes`: A collection of route groups that define the structure of the sidebar menu.
 *
 * Internal Functionality:
 * - A `handleNavigate` function is cached using `React.useCallback` to prevent unnecessary re-renders.
 * - The `handleNavigate` function manages the navigation logic and calls the `onClose` function if defined.
 *
 * Rendered Components:
 * - Uses a `DrawerItems` component that serves as a container for the sidebar layout.
 * - Includes a `Sidebar` that contains groups of `SidebarItems`.
 * - Supports rendering child routes within collapsible sections (`SidebarCollapse`).
 * - Routes are displayed as clickable items (`SidebarItem`) which trigger navigation logic.
 */
const DrawItemsMemoized = memo(function DrawItemsMemoized ({ onClose, routes }: DrawItemsMemoizedProps) {
    const navigate: NavigateFn = useNavigate();

    /**
     * A React callback function that returns an asynchronous event handler for navigation.
     *
     * This function is used for handling navigation actions triggered by user events such as a mouse click.
     * It prevents the default action of the event, optionally calls a provided `onClose` function,
     * and executes a navigation operation to a specified path using the `navigate` function.
     *
     * The callback is memoized using `React.useCallback`, with its dependencies being `onClose` and `navigate`.
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
 * Navbar is a functional React component that represents the navigation bar of the application.
 * It provides the primary navigation structure, including application title, navigation buttons,
 * and a hamburger menu for opening a drawer with additional navigation options.
 *
 * This component includes state management for controlling the visibility of the drawer,
 * navigation operations for routing to different paths, and utility methods for handling user interactions.
 *
 * The navigation structure includes:
 * - Application title and icon for visual branding.
 * - A responsive button for navigation linked to a specific route.
 * - A hamburger menu to toggle the drawer visibility.
 *
 * Drawer interactions:
 * - the 'isOpen' state controls The drawer's visibility.
 * - The drawer includes additional navigation items and a header.
 * - `handleClose` is used as the callback to close the drawer.
 *
 * Dependencies:
 * - `useNavigate` for handling navigation logic.
 * - UI Components like `Button`, `Drawer`, `GiHamburgerMenu`, `AppIcon`, `DrawHeaderMemoized`, and `DrawItemsMemoized`.
 *
 * This component uses React hooks such as `useState` and `useCallback` for managing state and optimising performance.
 */
const Navbar: NavbarFC = memo((): React.ReactNode => {
    const navigate: NavigateFn = useNavigate();

    const [isOpen, setIsOpen] = React.useState(false);

    /**
     * A callback function used to handle the closing action of a component,
     * typically by setting the component's open state to false.
     *
     * This function is memoized using `React.useCallback` to ensure it maintains
     * reference equality between renders unless its dependencies change.
     *
     * Dependencies:
     * - An empty array `[]`, meaning the function will not recompute on re-renders.
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
                            Online Coding Test
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
                <DrawItemsMemoized routes={routes}
                    onClose={handleClose}
                />
            </Drawer>
        </React.Fragment>
    );
});

Navbar.displayName = 'Navbar';

export { Navbar };
