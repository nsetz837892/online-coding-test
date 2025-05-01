import React from 'react';

/**
 * System-wide HTTP 403 (Forbidden) screen.
 *
 * @constructor
 */
const Forbidden = React.memo(function NotFound (): React.ReactNode {
    return (
        <div className="flex h-full flex-col content-center justify-center bg-blue-500 text-center">
            <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                403 Forbidden
            </h1>
            <h2 className="text-4xl font-extrabold dark:text-white">
                That page is not accessible.
            </h2>
        </div>
    );
});

export { Forbidden };
