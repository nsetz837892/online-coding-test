import React from 'react';

export type OverlayProps = {
    children?: React.ReactNode | undefined;
};

type OverlayFC = React.FC<OverlayProps>;

/**
 * Overlay component designed to render a modal-like structure.
 *
 * The `Overlay` component provides a structured container for applications to display modal content.
 * It leverages accessibility attributes such as `aria-labelledby`, `aria-modal`, and `role="dialog"` to ensure
 * the rendered modal content conforms to accessibility standards. The backdrop is semi-transparent and applies
 * a background effect to indicate a modal state. The overlay ensures the modal content is centered and responsive
 * across various screen sizes, using appropriate CSS utility classes.
 */
const Overlay: OverlayFC = ({ children }: OverlayProps): React.ReactNode => {
    return (
        <div aria-labelledby="modal-title"
            aria-modal="true"
            className="relative z-10"
            role="dialog"
        >
            <div aria-hidden="true"
                className="fixed inset-0 bg-gray-400/75 transition-opacity"
            ></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    {children}
                </div>
            </div>
        </div>
    );
};

export { Overlay };
