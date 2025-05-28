import { AuthDto } from '@/domain/auth';
import { GuestLayout } from '@/layouts/guest/layout';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext, RouterContext } from '@/types';
import { createFileRoute } from '@tanstack/react-router';

/**
 * Represents a route configuration for handling guest-related UI and logic.
 *
 * The `Route` defines the configuration for a specific guest route, including lazy loading
 * requirements, setup of contextual data, and other key functionality. This configuration
 * enables the proper handling of guest state management and rendering of the associated component.
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
