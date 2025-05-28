import { ResponseStatus } from '@/constants/http';
import { paths } from '@/constants/paths';
import { HttpHeaders } from '@/domain/constants';
import getAuthQueryKey from '@/state/query-keys/auth/keys';
import { AuthContext } from '@/types';
import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosHeaderValue, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

/**
 * The `NetworkService` class is responsible for setting up network configurations,
 * default settings, and interceptors for handling HTTP requests and responses with Axios.
 */
export class NetworkService {
    public setUp = (queryClient: QueryClient): void => {
        this.setDefaults();
        this.setupInterceptors(queryClient);
    };

    public setDefaults = (): void => {
        axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
        axios.defaults.validateStatus = (status: number): boolean => {
            return status < ResponseStatus.HTTP_INTERNAL_SERVER_ERROR;
        };
        axios.defaults.headers.common['Content-Type'] = HttpHeaders.contentType as AxiosHeaderValue;
        axios.defaults.headers.common['Accept'] = HttpHeaders.accept as AxiosHeaderValue;
        axios.defaults.headers.common['X-Requested-With'] = HttpHeaders.xRequestedWith as AxiosHeaderValue;
        axios.defaults.headers.common['Content-Language'] = 'en';
        axios.defaults.headers.common['Accept-Language'] = 'en';
        axios.defaults.headers.common['Cache-Control'] = 'no-cache';
        axios.defaults.headers.common['Pragma'] = 'no-cache';
        axios.defaults.headers.common['Expires'] = '0';
    };

    public setupInterceptors = (queryClient: QueryClient): void => {
        axios.interceptors.request.use(
            (axReqConfig: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
                const authContext: AuthContext | undefined = queryClient.getQueryData(getAuthQueryKey());

                if (!authContext || !authContext.resource) {
                    throw new Error('Auth context not found.');
                }

                if (authContext.resource.token) {
                    axReqConfig.headers.Authorization = `Bearer ${authContext.resource.token}`;
                }

                /*
                 * Add a timestamp to the request if the request is not for auth.
                 */

                if (axReqConfig.url && !axReqConfig?.url?.includes('sanctum') && !axReqConfig?.url?.includes('auth')) {
                    axReqConfig.params = {
                        ...axReqConfig.params,
                        t: Date.now()
                    };
                }

                return axReqConfig;
            },
            (error: Error) => Promise.reject(error)
        );

        axios.interceptors.response.use(
            (response: AxiosResponse) => {
                /*
                 * If the user is not on the login screen
                 * and the response HTTP status is either 401 (Unauthorised) or 403 (Forbidden) -
                 * end the users' session by navigating the user to the logout screen.
                 */

                if (
                    !window.location.pathname.includes('login') &&
                    (response.status === ResponseStatus.HTTP_UNAUTHORIZED ||
                      response.status === ResponseStatus.HTTP_FORBIDDEN ||
                      response.data.status === ResponseStatus.HTTP_UNAUTHORIZED ||
                      response.data.status === ResponseStatus.HTTP_FORBIDDEN)
                ) {
                    /*
                     * Destroy the user's session by navigating the user
                     * to the logout screen.
                     */

                    history.pushState(
                        {},
                        '',
                        paths.authenticated.logout as string
                    );
                }

                return response;
            },
            (error: Error) => Promise.reject(error)
        );
    };
}
