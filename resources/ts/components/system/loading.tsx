import { Overlay } from '@/components/ui/overlay';
import { Spinner } from 'flowbite-react';
import React from 'react';

/**
 * Loading renders a loading state.
 *
 * @constructor
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
