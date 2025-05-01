import React from 'react';

/**
 * useRefs defines a hook to manage refs.
 */
export const useRefs = <El = HTMLElement,>() => {
    const refsByKey = React.useRef<Record<string, El | null>>({});

    const setRef = (element: El | null, key: string) => {
        refsByKey.current[key] = element;
    };

    return {
        refsByKey: refsByKey.current,
        setRef
    };
};
