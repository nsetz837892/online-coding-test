import { AiFillCode } from '@react-icons/all-files/ai/AiFillCode';
import { memo } from 'react';

/**
 * AppIcon memorizes the app icon to reduce render times.
 *
 * This had the effect of reducing the render time from
 * around 4 ms to 2.9 ms.
 */
const AppIcon = memo(function AppIcon () {
    return <AiFillCode className="text-blue-400"
        size={40}
    />;
});

export { AppIcon };
