"use client";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function QueryProvider({ children }) {
    // const queryClient = new QueryClient();  rested to a single instance to avoid cache loss on re-renders and causes unnecessary network requests and refreshes. By creating a single instance of QueryClient, we can maintain a consistent cache and avoid unnecessary network requests, improving performance and user experience.
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}