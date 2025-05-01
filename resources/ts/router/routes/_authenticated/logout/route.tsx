import { Logout } from '@/pages/authenticated/logout';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/logout')({
    component: Logout,
    staticData: { title: 'Logout' }
});
