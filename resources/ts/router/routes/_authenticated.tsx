import { paths } from '@/constants/paths';
import { AuthDto } from '@/domain/auth';
import { Layout } from '@/layouts/app/layout';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext, RouterContext } from '@/types';
import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * ********************************************************
 * The layout file for the _authenticated root.
 *
 * Redirect the user to the guest login screen if a valid auth
 * context is not found, or the user is not authenticated
 * and the current route is not a "guest" route.
 * ********************************************************
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

        if ((!authContext || !authContext.authenticated) && !location.pathname.includes('logout')) {
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
