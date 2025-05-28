import { Login } from '@/pages/guest/login';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_guest/login')({
    component: Login,
    staticData: { title: 'Login' }
});
