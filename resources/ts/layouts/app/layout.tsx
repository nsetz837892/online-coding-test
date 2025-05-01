import { Navbar } from '@/layouts/app/navbar';
import { Outlet } from '@tanstack/react-router';
import React from 'react';

/**
 * Layout is the main application layout.
 * Renders navigation and an outlet for the main content.
 *
 * @constructor
 */
export const Layout = (): React.ReactNode => {
    return (
        <div className="flex h-screen min-h-full flex-col">
            <Navbar />
            <Outlet />
        </div>
    );
};
