import { Error } from '@/components/system/error';
import { Toast } from '@/components/ui/toast';
import { IntegerConsts } from '@/constants/numeric';
import { routeTree } from '@/router/routeTree.gen';
import { NetworkService } from '@/support/network';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Persister, persistQueryClient } from '@tanstack/react-query-persist-client';
import { createBrowserHistory, createRouter, RouterProvider } from '@tanstack/react-router';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

/*
 * Represents the duration of eight minutes in milliseconds.
 */
const EIGHT_MINUTES_MS: number = IntegerConsts.ONE_THOUSAND * IntegerConsts.SIXTY * IntegerConsts.EIGHT;

/*
 * Represents the duration of ten minutes in milliseconds.
 */
const TEN_MINUTES_MS: number = IntegerConsts.ONE_THOUSAND * IntegerConsts.SIXTY * IntegerConsts.TEN;

/*
 * Set up DayJS.
 *
 * Extend DayJS with the plugins Timezone, UTC, and localised format.
 */

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

/*
 * Set up TanStack Query.
 *
 * Implement a local storage persistence layer.
 */

const queryClient: QueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            gcTime: EIGHT_MINUTES_MS, // The default GC time is 8
            // minutes
            staleTime: TEN_MINUTES_MS // The default stale time is 10
            // minutes
        }
    }
});

const localStoragePersister: Persister = createSyncStoragePersister({
    storage: window.localStorage
});

persistQueryClient({
    queryClient,
    persister: localStoragePersister
});

/*
 * Set up TanStack router.
 *
 * Since we're using React Query, we don't want loader calls to ever be stale.
 * Setting defaultPreloadStaleTime to zero (0) will ensure that the loader is
 * always called when the route is preloaded or visited.
 */

export const history = createBrowserHistory();

export const router = createRouter({
    routeTree,
    basepath: '/',
    notFoundMode: 'root',
    history,
    defaultErrorComponent: () => <Error />,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    // Do not cache this route's data after it's unloaded
    defaultGcTime: 0,
    defaultStaleTime: Infinity,
    context: {
        queryClient
    }
});

/*
 * Set up Axios.
 *
 * Assign defaults to the Axios client
 * and request and response interceptors.
 */

const networkService: NetworkService = new NetworkService();
networkService.setUp(queryClient);

/**
 * The `App` component serves as the root component of the application.
 * It provides a structured setup for application-wide providers and tools.
 *
 * Features:
 * - Wraps the application in `React.StrictMode` for highlighting potential issues.
 * - Provides the `QueryClientProvider` for managing React Query state and caching.
 * - Handles global error boundaries with `QueryErrorResetBoundary` and `ErrorBoundary`.
 * - Includes routing capabilities through `RouterProvider`.
 * - Displays toast notifications with a `Toast` component.
 * - Offers development tools for React Query through `ReactQueryDevtools`.
 *
 * @returns {React.ReactNode} The main application component wrapped with the necessary providers.
 */
const App = (): React.ReactNode => {
    return (
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <QueryErrorResetBoundary>
                    {({ reset }) => (
                        <ErrorBoundary FallbackComponent={Error as never}
                            onReset={reset}
                        >
                            <RouterProvider router={router} />
                            <Toast />
                        </ErrorBoundary>
                    )}
                </QueryErrorResetBoundary>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </React.StrictMode>
    );
};

export { App };
