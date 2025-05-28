import { paths } from '@/constants/paths';
import { AuthDto } from '@/domain/auth';
import { Layout } from '@/layouts/app/layout';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext, RouterContext } from '@/types';
import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Route object for managing the `_authenticated` path in the application. This route ensures
 * that authenticated access is enforced and handles redirects to the login screen for unauthenticated users.
 */
export const Route = createFileRoute('/_authenticated' as never)({
    beforeLoad: ({ context, location }) => {
        const { queryClient }: RouterContext = context;

        /*
         * Get the auth context for the requesting user.
         */

        const authQueryKey = getAuthQueryKey();

        /*
         * Establish an auth context if one does not exist.
         */

        const authContext: AuthContext | undefined = queryClient.getQueryData(authQueryKey);

        if (!authContext) {
            queryClient.setQueryData(
                authQueryKey,
                {
                    authenticated: false,
                    resource: { ...AuthDto }
                }
            );
        }

        /*
         * If the user is not authenticated and the route
         * is not a "guest" route - redirect the user to the
         * guest login screen.
         */

        if ((!authContext || !authContext.authenticated || !authContext.resource.token) && !location.pathname.includes('logout')) {
            throw redirect({
                to: paths.guest.login,
                search: {
                    redirect: location.href
                }
            });
        }
    },
    shouldReload: true,
    component: Layout,
    staticData: {
        title: 'Authenticated'
    }
});
