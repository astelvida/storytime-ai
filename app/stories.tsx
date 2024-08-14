import React from 'react';
import FullPageLoadingOverlay from '@/components/FullPageLoadingOverlay';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

type Story = {
  id: number;
  content: string;
  model: string;
  created: string;
  prompt: string;
};
export default function Stories() {
  const db = useSQLiteContext();

  const router = useRouter();

  const { data, isPending, isLoading, isSuccess } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const result = await db.getAllAsync<Story>('SELECT * FROM stories');
      return result.sort((a, b) => b.created - a.created);
    },
  });

  if (isPending || isLoading) {
    return <FullPageLoadingOverlay />;
  }

  return data && isSuccess ? (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {data.map((entry) => (
          <TouchableOpacity
            key={entry.id}
            onPress={() => router.push(`/story/${entry.id}`)}
          >
            <Text key={entry.id}>{entry.content}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  ) : null;
}
