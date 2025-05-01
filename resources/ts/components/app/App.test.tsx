import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { describe, expect, vi } from 'vitest';
import { App } from './App';

describe('Index', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        // tell vitest we use mocked time
        vi.useFakeTimers();
    });

    afterEach(() => {
        // restoring date after each test run
        vi.useRealTimers();
    });

    test('renders', () => {
        const page = render(<App />);
        expect(page).toMatchSnapshot();
    });
});
