import { paths } from '@/constants/paths';
import { searchSchema as SearchSchema } from '@/domain/app/schema';
import { AddExpense } from '@/pages/authenticated/expenses/Expense/AddExpense';
import { hasPermission } from '@/router/router-helper';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { categoryQueryOptions } from '@/state/query-options/category/options';
import { AuthContext, RouterContext } from '@/types';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/expenses/add-expense')({
    component: AddExpense,
    loader: async ({ context, route }) => {
        const { queryClient }: RouterContext = context;

        const authContext: AuthContext = queryClient.getQueryData(getAuthQueryKey()) as AuthContext;

        /*
         * If the user does not have permissions to view expenses.
         */

        if (!hasPermission(
            'expenses',
            route.id as string,
            authContext.resource.role.permissions
        )) {
            throw redirect({
                to: paths.authenticated.system.forbidden,
                search: {
                    redirect: location.href
                }
            });
        }

        return await queryClient.fetchQuery(categoryQueryOptions({ paginate: false }));
    },
    onError:
        /**
         * Redirect the user to the add
         * expense screen without search
         * params, in this case.
         */
        () => {
            throw redirect({
                to: paths.authenticated.expenses.add,
                search: {}
            });
        },
    staticData: { title: 'Add Expense' },
    validateSearch: SearchSchema
});
