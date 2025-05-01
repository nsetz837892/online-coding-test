import { App } from '@/components/app/App';
import 'flowbite';
import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import '../resources/css/app.css';

const rootElement: HTMLElement | null = document.getElementById('root');

if (rootElement && !rootElement.innerHTML) {
    const root: Root = createRoot(rootElement);

    root.render(
        <StrictMode>
            <App />
        </StrictMode>,
    );
}
