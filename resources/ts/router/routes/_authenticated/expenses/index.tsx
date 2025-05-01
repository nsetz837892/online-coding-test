import { paths } from '@/constants/paths';
import { searchSchema as SearchSchema } from '@/domain/app/schema';
import { hasPermission } from '@/router/router-helper';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { expenseSummaryQueryOptions } from '@/state/query-options/expenses/options';
import { AuthContext, RouterContext, Summary } from '@/types';
import { createFileRoute, defer, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/expenses/')({
    loader: ({ context, route }) => {
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

        return {
            deferredData: defer<Summary>(queryClient.fetchQuery(expenseSummaryQueryOptions(authContext.resource.id)))
        };
    },
    staticData: {
        title: 'Expenses'
    },
    validateSearch: SearchSchema
});
