import { Config, Paths } from '@/types';

export const HttpHeaders: Config = {
    contentType: 'application/json',
    accept: 'application/json',
    xRequestedWith: 'XMLHttpRequest',
    cacheControl: 'private, max-age=7200, must-revalidate, no-transform, post-check=0, pre-check=0'
};

export const endpoints: Paths = {
    auth: {
        login: 'auth/login',
        token: '/api/sanctum/token',
        logout: '/api/auth/logout',
        csrfCookie: '/api/sanctum/csrf-cookie'
    },
    authenticated: {
        category: {
            many: '/api/categories'
        },
        expense: {
            many: '/api/expenses',
            summary: '/api/expenses/summary',
            add: '/api/expenses',
            'delete': '/api/expenses/:id'
        }
    }
} as const;
