import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useReactQueryDevTools } from '@dev-plugins/react-query';
import { SQLiteProvider } from 'expo-sqlite/next';
import { migrateDbIfNeeded } from '@/Database';

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="generate" />
      <Stack.Screen name="story" />
      <Stack.Screen name="story/[id]" />
      <Stack.Screen name="stories" />
    </Stack>
  );
}

const queryClient = new QueryClient({});

export default function App() {
  useReactQueryDevTools(queryClient);

  return (
    <PaperProvider>
      <SQLiteProvider databaseName="storytime.db" onInit={migrateDbIfNeeded}>
        <QueryClientProvider client={queryClient}>
          <RootLayoutNav />
        </QueryClientProvider>
      </SQLiteProvider>
    </PaperProvider>
  );
}
