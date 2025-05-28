import { Navbar } from '@/layouts/app/navbar';
import React from 'react';

/**
 * A React functional component that renders a 404 Not Found error page.
 * This page includes a navigation bar and a message indicating that the
 * requested page does not exist.
 *
 * Features:
 * - A navigation bar is rendered at the top of the page.
 * - Displays a prominent "404 Not Found" headline.
 * - Provides a subheading with additional information about the missing page.
 * - Includes a suggestion to navigate to the dashboard page.
 *
 * Styling:
 * - Utilizes a full-screen layout with flexible alignment for the content.
 * - Background styled with a distinct colour to emphasise the error page.
 * - Text appearance is adjusted for readability and visual hierarchy.
 *
 * @returns {React.ReactNode} The rendered JSX for the Not Found page.
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
