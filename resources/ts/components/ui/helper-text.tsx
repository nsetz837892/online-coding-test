import clsx from 'clsx';
import React, { memo } from 'react';

export type HelperTextProps = {
    /**
     * Shortcut to 'danger' variant
     */
    error?: boolean;
    children?: React.ReactNode | undefined;
    variant?: 'success' | 'info' | 'warning' | 'danger' | 'default';
};

type HelperTextFC = React.FC<HelperTextProps>;

/**
 * HelperText renders form control helper text.
 *
 * Accepts an error state.
 *
 * @constructor
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
