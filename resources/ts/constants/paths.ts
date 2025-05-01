import { Paths } from '@/types';

export const paths = {
    authenticated: {
        expenses: {
            root: '/expenses',
            add: '/expenses/add-expense'
        },
        logout: '/logout',
        system: {
            forbidden: '/forbidden'
        }
    },
    guest: {
        login: '/login'
    },
    root: '/'
} satisfies Paths;
