import { Navbar } from '@/layouts/app/navbar';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

/**
 * `Layout` is a React functional component that serves as a foundational structure
 * for the application's user interface. It organises the primary layout by providing
 * a flexible container that spans the full height of the viewport.
 *
 * This component leverages the `Navbar` for navigation and uses the `Outlet` to render
 * nested child routes dynamically, facilitating a seamless routing experience.
 *
 * @returns {React.ReactNode} A JSX element containing the layout structure,
 * which includes a navigation bar and nested route components.
 */
export const Layout = (): React.ReactNode => {
    return (
        <div className="flex h-screen min-h-full flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
};
