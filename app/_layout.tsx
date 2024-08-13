import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';

const queryClient = new QueryClient({});

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="generate" />
      <Stack.Screen name="story" />
    </Stack>
  );
}

export default function App() {
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <RootLayoutNav />
      </PaperProvider>
    </QueryClientProvider>
  );
}
