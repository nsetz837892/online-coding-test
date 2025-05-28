import clsx from 'clsx';
import React, { memo } from 'react';

export type HelperTextProps = {
    /**
     * Represents the child nodes that can be passed to a component.
     * This can be any valid React content such as elements, strings, numbers, or fragments.
     * The property is optional and can also be undefined.
     */
    children?: React.ReactNode | undefined;
    /**
     * Shortcut to 'danger' variant
     */
    error?: boolean;
    /**
     * Helper text variant
     */
    variant?: 'success' | 'info' | 'warning' | 'danger' | 'default';
};

type HelperTextFC = React.FC<HelperTextProps>;

/**
 * A functional component that renders helper text with customisable styles based on its state, including error or
 * variant types.
 *
 * @returns {React.ReactNode} - A styled paragraph element displaying the helper text.
 */
const HelperText: HelperTextFC = memo(({
    children,
    error = false,
    variant = 'default'
}: HelperTextProps): React.ReactNode => {
    const colorVariants = {
        danger: 'text-red-600',
        'default': 'text-gray-600',
        info: 'text-blue-600',
        success: 'text-green-600',
        warning: 'text-amber-600'
    };

    return (
        <p className={clsx(
            'mt-2',
            'text-sm',
            colorVariants[error
                ? 'danger'
                : variant]
        )}
        >
            {children}
        </p>
    );
});

export { HelperText };
