import React from 'react';

/**
 * useRefs is a custom hook that manages a collection of references to DOM elements or components, indexed by a string
 * key.
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
