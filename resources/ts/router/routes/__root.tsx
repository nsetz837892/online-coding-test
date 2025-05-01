import { NotFound } from '@/components/system/not-found';
import { RouterContext } from '@/types';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import React from 'react';

/*
 * Set up TanStack router Dev tools.
 *
 * Render in development env. only.
 */

const TanStackRouterDevtools =
    import.meta.env.MODE !== 'development'
        ? (): null => null
        : React.lazy(() => import('@tanstack/router-devtools').then(res => ({
            'default': res.TanStackRouterDevtools
        })));

/**
 * Root route.
 *
 * Define an outlet for the router to render.
 */
export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <React.Fragment>
            <Outlet />
            <TanStackRouterDevtools initialIsOpen={false} />
        </React.Fragment>
    ),
    notFoundComponent: () => <NotFound />,
    staticData: {
        title: 'Root'
    }
});
