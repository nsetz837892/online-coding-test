import type { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }

    interface StaticDataRouteOption {
        title: string;
    }
}
