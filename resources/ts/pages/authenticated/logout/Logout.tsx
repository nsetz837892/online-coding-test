import { Loading } from '@/components/system/loading';
import { IntegerConsts } from '@/constants/numeric';
import { paths } from '@/constants/paths';
import { AuthDto, authService } from '@/domain/auth';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { getExpenseQueryKey, getExpenseSummaryQueryKey } from '@/state/query-keys/expense/keys';
import { AuthContext as AuthContextType } from '@/types';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { NavigateFn, useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import React from 'react';

type LogoutFC = React.FC;

/**
 * Logout destroys a users' session.
 *
 * Request the API logout endpoint.
 *
 * Remove the expense data associated with
 * the user.
 *
 * @constructor
 */
const Logout: LogoutFC = (): React.ReactNode => {
    const queryClient: QueryClient = useQueryClient();
    const navigate: NavigateFn = useNavigate({ from: paths.authenticated.logout });

    const abortControllerRef: React.RefObject<AbortController | null> = React.useRef(null);

    /**
     * authLogout calls the auth service logout method -
     * which destroys the user's session with the API.
     */
    const authLogout = React.useCallback(
        (): void => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }

            abortControllerRef.current = new AbortController();

            void authService.logout(abortControllerRef.current.signal);

            const authQueryKey = getAuthQueryKey();

            const authContext: AuthContextType = queryClient.getQueryData(authQueryKey) as AuthContextType;

            /*
             * Removing cached data cannot be done on unmounting
             * because the auth context would be destroyed.
             *
             * This has to be done here - before the auth context
             * is destroyed - as the resource id is required on the query key.
             */

            queryClient.removeQueries({
                queryKey: getExpenseQueryKey(
                    authContext.resource.id,
                    {
                        paginate: true,
                        page: 1,
                        perPage: IntegerConsts.FIFTEEN
                    }
                ),
                exact: false
            });

            queryClient.removeQueries({
                queryKey: getExpenseSummaryQueryKey(authContext.resource.id)
            });

            authContext.authenticated = false;
            authContext.resource = { ...AuthDto };

            queryClient.setQueryData(
                authQueryKey,
                authContext,
                {
                    updatedAt: dayjs(new Date()).valueOf()
                }
            );
        },
        [queryClient]
    );

    /**
     * On mount, log out the user, then navigate to the app root page.
     *
     * On unmounting, destroy the instance of abort controller.
     */
    React.useEffect(
        () => {
            authLogout();

            void navigate({
                to: paths.root
            });

            return (): void => {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }
            };
        },
        [authLogout, navigate]
    );

    return <Loading />;
};

export default Logout;
