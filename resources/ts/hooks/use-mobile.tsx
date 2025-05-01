import { useEffect, useState } from 'react';

const MOBILE_BREAKPOINT = 768;

/**
 * useIsMobile returns true if the device width
 * meets the breakpoint for a mobile device.
 */
export function useIsMobile () {
    const [isMobile, setIsMobile] = useState<boolean>();

    useEffect(
        () => {
            const mql = window.matchMedia(`(max-width: ${String(MOBILE_BREAKPOINT - 1)}px)`);

            const onChange = () => {
                setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            };

            mql.addEventListener(
                'change',
                onChange
            );
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

            return () => {
                mql.removeEventListener(
                    'change',
                    onChange
                );
            };
        },
        []
    );

    return !!isMobile;
}
