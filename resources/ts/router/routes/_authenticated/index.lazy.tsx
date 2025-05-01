import { Index } from '@/pages/authenticated/dashboard';
import { AnyRoute, createLazyFileRoute, LazyRoute } from '@tanstack/react-router';

export const Route: LazyRoute<AnyRoute> = createLazyFileRoute('/_authenticated/')({
    component: Index
});
