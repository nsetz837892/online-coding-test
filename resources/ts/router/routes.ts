import { Permissions } from '@/constants/acl';
import { paths } from '@/constants/paths';
import { RouteGroup } from '@/types';

/**
 * Route listings.
 */
export const routes: Map<string, RouteGroup> = new Map([
    [
        'dashboard',
        {
            id: '/_authenticated',
            name: 'dashboard-root',
            title: 'Dashboard',
            path: paths.root,
            render: false,
            routes: [
                {
                    id: 'dashboard',
                    name: 'dashboard-root',
                    title: 'Dashboard',
                    path: paths.root,
                    permissions: []
                }
            ]
        }
    ],
    [
        'expenses',
        {
            id: '/_authenticated/expenses/',
            render: true,
            routes: [
                {
                    id: '/_authenticated/expenses/',
                    name: 'expenses-root',
                    title: 'Expenses',
                    path: paths.authenticated.expenses.root,
                    permissions: [Permissions.VIEW_EXPENSES],
                    children: [
                        {
                            id: '/_authenticated/expenses/',
                            name: 'expenses-root',
                            title: 'View',
                            path: paths.authenticated.expenses.root,
                            permissions: [Permissions.VIEW_EXPENSES]
                        },
                        {
                            id: '/_authenticated/expenses/add-expense',
                            name: 'expenses-add',
                            title: 'Add',
                            path: paths.authenticated.expenses.add,
                            permissions: [Permissions.CREATE_EXPENSES]
                        }
                    ],
                    renderChildren: false
                }
            ]
        }
    ],
    [
        'logout',
        {
            id: '/_authenticated/logout',
            render: false,
            routes: [
                {
                    id: 'logout',
                    name: 'logout-root',
                    title: 'Logout',
                    path: paths.authenticated.logout,
                    permissions: []
                }
            ]
        }
    ]
]);
