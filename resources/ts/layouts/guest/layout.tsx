import { Outlet } from '@tanstack/react-router';
import React from 'react';

/**
 * GuestLayout is a functional component that serves as a wrapper layout for displaying content intended
 * for guest users. It provides a flexbox-based, vertically centered structure to ensure consistent and
 * responsive formatting across screen sizes.
 *
 * The component uses full height and minimum height styling to ensure it occupies the entire
 *  viewport and includes padding for spacing on smaller and larger screens.
 *
 * @returns {React.ReactNode} A JSX element that provides the structured layout for guest user views.
 */
export const GuestLayout = (): React.ReactNode => (
    <div className="flex h-screen min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <Outlet />
    </div>
);
