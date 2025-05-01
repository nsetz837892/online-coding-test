import { routes } from '@/router/routes';
import { Route } from '@/types';

/**
 * Get the route listing for the specified group key.
 */
export const getRoutes = function (groupKey: string): Route[] {
    return routes.has(groupKey)
        ? routes?.get(groupKey)?.routes ?? []
        : [];
};

/**
 * Get the permissions for a specified group and route.
 */
export const getPermissions = function getPermissions (groupKey: string, routeKey: string): string[] {
    const routes: Route[] = getRoutes(groupKey);
    const route: Route | undefined = routes?.find((route: Route) => route.id === routeKey);

    return route?.permissions ?? [];
};

/**
 * Is every permission included in the permissions for a specified group and route.
 */
export const hasPermission = function hasPermission (groupKey: string, routeKey: string, permissions: string[]): boolean {
    const routePermissions: string[] = getPermissions(
        groupKey,
        routeKey
    );

    return routePermissions.every(value => permissions.includes(value));
};
