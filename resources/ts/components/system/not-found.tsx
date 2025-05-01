import { Navbar } from '@/layouts/app/navbar';
import React from 'react';

/**
 * System-wide HTTP 404 (Not Found) screen.
 *
 * @constructor
 */
const NotFound = React.memo(function NotFound (): React.ReactNode {
    return (
        <div className="flex h-screen min-h-full flex-col">
            <Navbar />
            <div className="flex h-full flex-col content-center justify-center bg-amber-500 text-center">
                <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    404 Not Found
                </h1>
                <h2 className="text-4xl font-extrabold dark:text-white">
                    That page does not exist
                </h2>
                <p className="mt-6 text-gray-500 first-line:uppercase dark:text-white">
                    Try navigating to the dashboard page!
                </p>
            </div>
        </div>
    );
});

export { NotFound };
