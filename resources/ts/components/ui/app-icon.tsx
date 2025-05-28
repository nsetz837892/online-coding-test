import { AiFillCode } from '@react-icons/all-files/ai/AiFillCode';
import { memo } from 'react';

/**
 * AppIcon is a memoized React functional component that renders an icon.
 *
 * This component is designed for displaying a consistent application icon
 * across the application and optimises performance by memoizing the result
 * to prevent unnecessary re-renders.
 */
const AppIcon = memo(function AppIcon () {
    return <AiFillCode className="text-blue-400"
        size={40}
    />;
});

export { AppIcon };
