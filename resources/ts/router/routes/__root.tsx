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
 * Represents the root route configuration for the application.
 *
 * This object is created using the `createRootRouteWithContext` function,
 * taking a specific context type (`RouterContext`) which defines what data and
 * methods are available to all routes within this hierarchy.
 *
 * It acts as the entry point for the application's routing configuration and
 * establishes the overall structure and behaviour of nested routes.
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
