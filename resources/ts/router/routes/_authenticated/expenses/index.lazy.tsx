import { Expenses } from '@/pages/authenticated/expenses';
import { AnyRoute, createLazyFileRoute, LazyRoute } from '@tanstack/react-router';

export const Route: LazyRoute<AnyRoute> = createLazyFileRoute('/_authenticated/expenses/')({
    component: Expenses
});
