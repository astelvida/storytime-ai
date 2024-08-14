import React from 'react';
import { useMutationState } from '@tanstack/react-query';
import { useGlobalSearchParams, useRouter } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default function Story() {
  const router = useRouter();
  const params = useGlobalSearchParams();

  const data = useMutationState({
    filters: { mutationKey: ['createStory'] },
    select: (mutation) => mutation.state.data,
  });

  const story = data[data.length - 1];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {story ? <Text style={styles.contentText}>{story.content}</Text> : null}
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
