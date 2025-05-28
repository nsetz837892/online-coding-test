import { Forbidden } from '@/components/system/forbidden';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/forbidden/')({
    component: Forbidden,
    staticData: {
        title: '403 Forbidden'
    }
});
