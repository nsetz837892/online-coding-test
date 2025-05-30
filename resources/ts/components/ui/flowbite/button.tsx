import React from 'react';
import { Button as FlowBiteButton, ButtonProps as FlowBiteButtonProps, Spinner } from 'flowbite-react';
import { clsx } from 'clsx';

/**
 * Exposes a method to mutate the loading state.
 */
export type ButtonElement = {
    setLoading: (state: boolean) => void;
};

export type ButtonProps = Omit<FlowBiteButtonProps, 'ref'> & {
    disabled?: boolean;
    hidden?: boolean;
    loading?: boolean;
    variant?: 'default' | 'text';
    ref?: React.RefObject<ButtonElement | null> | ((element: ButtonElement) => void);
};

type ButtonFC = React.FC<ButtonProps>;

/**
 * Button component is a wrapper around FlowBite Button that renders a customisable button with support for
 * loading states, disabled state, and visibility control.
 */
export const Button: ButtonFC = ({
    children,
    disabled = false,
    hidden = false,
    loading = false,
    variant = 'default',
    className,
    ref,
    ...props
}: ButtonProps) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const buttonRef: React.RefObject<HTMLButtonElement | null> = React.useRef<HTMLButtonElement | null>(null);

    React.useImperativeHandle(
        ref,
        () => (
            {
                setLoading: (state: boolean) => {
                    setIsLoading(state);
                }
            }
        )
    );

    React.useEffect(
        () => {
            setIsLoading(loading);
        },
        [loading]
    );

    return (
        <FlowBiteButton ref={buttonRef}
            disabled={disabled}
            className={clsx(
                'min-w-24',
                className,
                variant ===
                'text' &&
                ['!bg-transparent', 'text-cyan-500', 'cursor-pointer', 'border-transparent', 'focus:border-transparent', 'focus:ring-0'],
                hidden && ['max-sm:hidden']
            )}
            {...props}
        >
            {isLoading && <Spinner light
                aria-label="Info spinner"
                size="sm"
            />}
            {!isLoading && children}
        </FlowBiteButton>
    );
};
