import { AiFillCode } from '@react-icons/all-files/ai/AiFillCode';
import { memo } from 'react';

/**
 * AppIcon is a memoized React functional component that renders an icon.
 *
 * This had the effect of reducing the render time from
 * around 4 ms to 1.4 ms.
 */
const AppIconSmall = memo(function AppIcon () {
    return <AiFillCode className="text-blue-400"
        size={20}
    />;
});

export { AppIconSmall };
