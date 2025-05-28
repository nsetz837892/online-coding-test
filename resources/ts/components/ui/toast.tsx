import React from 'react';
import { Toaster } from 'react-hot-toast';

type ToastFC = React.FC;

/**
 * Toast is a functional React component wrapped with React.memo for performance optimisation.
 * It renders a Toaster component provided by a toast notification library.
 * The Toaster is configured to display at the bottom-centre position of the screen.
 * Additional toast options such as styling are applied through the `toastOptions` property.
 *
 * The `className` option is customized to apply a specific background color to the toast container.
 */
const Toast: ToastFC = React.memo((): React.ReactNode => (
    <Toaster
        position="bottom-center"
        toastOptions={{
            className: '!bg-gray-300'
        }}
    />
));

export { Toast };
