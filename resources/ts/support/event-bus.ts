import { ObjectLiteral } from '@/types';
import hash from 'object-hash';

type EventListener<TData = ObjectLiteral> = (data: TData) => void;

class EventBus<TData = ObjectLiteral> {
    private readonly events: Record<string, Map<string, EventListener<TData>>>;

    constructor () {
        this.events = {};
    }

    on (event: string, listener: EventListener<TData>) {
        if (!this.events[event]) {
            this.events[event] = new Map<string, EventListener<TData>>();
        }

        this.events[event].set(
            this.listenerKey(listener),
            listener
        );
    }

    off (event: string, listener: EventListener<TData>) {
        if (this.events[event]) {
            this.events[event].delete(this.listenerKey(listener));
        }
    }

    emit (event: string, data: TData) {
        const listeners: Map<string, EventListener<TData>> = this.events[event];

        if (listeners) {
            listeners.forEach(listener => {
                listener(data);
            });
        }
    }

    private listenerKey (listener: EventListener<TData>): string {
        // @ts-ignore
        return hash(listener);
    }
}

export default EventBus;
