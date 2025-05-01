import { AuthDto } from '@/domain/auth';
import { GuestLayout } from '@/layouts/guest/layout';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext, RouterContext } from '@/types';
import { createFileRoute } from '@tanstack/react-router';

/**
 * Defines the layout for guest routes.
 */
export const Route = createFileRoute('/_guest')({
    beforeLoad: ({ context }) => {
        const { queryClient }: RouterContext = context;

        /*
         * Establish an auth context if one does not exist.
         */

        const authQueryKey = getAuthQueryKey();

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
    },
    component: GuestLayout,
    shouldReload: true,
    staticData: { title: 'Guest' }
});
