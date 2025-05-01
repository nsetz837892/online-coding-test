import React from 'react';
import { Toaster } from 'react-hot-toast';

type ToastFC = React.FC;

/**
 * Toast is a wrapper around Toaster -
 * with default style rules.
 */
const Toast: ToastFC = (): React.ReactNode => (
    <Toaster
        position="bottom-center"
        toastOptions={{
            className: '!bg-gray-300'
        }}
    />
);

export { Toast };
