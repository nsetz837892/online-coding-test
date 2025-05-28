import { Overlay } from '@/components/ui/overlay';
import { Spinner } from 'flowbite-react';
import React from 'react';

/**
 * A React functional component that displays a loading overlay with a centered spinner.
 *
 * The `Loading` component is wrapped in `React.memo` to optimise rendering performance
 * and prevent unnecessary re-renders. It uses the `Overlay` component to provide
 * a background overlay and includes a spinner wrapped within a styled container.
 *
 * This component is typically used to indicate that a background process or data
 * loading operation is in progress.
 *
 * @returns {React.ReactNode} A React node rendering the loading overlay.
 */
const Loading = React.memo(function Loading (): React.ReactNode {
    return (
        <Overlay>
            <div className="flex w-fit transform overflow-hidden rounded-lg bg-white p-2 text-center shadow-xl transition-all sm:max-w-lg">
                <Spinner size="lg" />
            </div>
        </Overlay>
    );
});

export { Loading };
