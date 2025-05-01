import { Outlet } from '@tanstack/react-router';
import React from 'react';

/**
 * GuestLayout renders the layout for guest users.
 *
 * @constructor
 */
export const GuestLayout = (): React.ReactNode => (
    <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Outlet />
    </div>
);
