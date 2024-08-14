import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { getStoryById } from '@/Database';
import { useSQLiteContext } from 'expo-sqlite';
import FullPageLoadingOverlay from '@/components/FullPageLoadingOverlay';

export default function Story() {
  const db = useSQLiteContext();
  const router = useRouter();
  const params = useGlobalSearchParams();

  const { data, isFetched, isPending, isError, isSuccess } = useQuery({
    queryKey: ['story', params.id],
    queryFn: async () => {
      const result = await getStoryById(db, params.id);
      return result;
    },
  });

  if (isPending || !isFetched) {
    return <FullPageLoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {data && isSuccess ? (
          <Text style={styles.contentText}>{data.content}</Text>
        ) : null}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/generate')}
      >
        <Text style={styles.buttonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  contentText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
