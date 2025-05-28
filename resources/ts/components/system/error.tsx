import React from 'react';

/**
 * A React functional component that renders an error screen indicating a
 * server-side error (HTTP status code 500). The component is styled to
 * display a centered message with a background and textual elements.
 *
 * The error screen includes:
 * - A primary heading with a "500 Server Error" message.
 * - A secondary heading with "Something went wrong".
 * - A suggestion to refresh the page for possible resolution.
 *
 * The component uses Tailwind CSS classes for styling and is memoized
 * using React.memo for performance optimisation to avoid unnecessary re-renders.
 */
const Error = React.memo(function Error (): React.ReactNode {
    return (
        <div className="flex h-full flex-col content-center justify-center bg-red-500 text-center">
            <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                500 Server Error
            </h1>
            <h2 className="text-4xl font-extrabold dark:text-white">
                Something went wrong
            </h2>
            <p className="mt-6 text-gray-500 first-line:uppercase dark:text-white">
                Try to refresh the page!
            </p>
        </div>
    );
});

export { Error };
