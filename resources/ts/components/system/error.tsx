import React from 'react';

/**
 * System-wide HTTP 500 (Internal Server Error) screen.
 *
 * @constructor
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
