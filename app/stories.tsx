import FullPageLoadingOverlay from '@/components/FullPageLoadingOverlay';
import { Ionicons } from '@expo/vector-icons';
import { useMutationState, useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Stories() {
  const db = useSQLiteContext();

  const router = useRouter();

  const { data, isPending, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['stories'],
    queryFn: async () => {
      const result = await db.getAllAsync<Story>('SELECT * FROM stories');
      return result;
    },
  });

  if (isPending || isLoading) {
    return <FullPageLoadingOverlay />;
  }

  return data && isSuccess ? (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        {data.map((entry, index) => (
          <Text key={entry.id}>{entry.content}</Text>
        ))}
      </ScrollView>
      <TouchableOpacity onPress={() => {}}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/generate')}>
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>
  ) : null;
}
