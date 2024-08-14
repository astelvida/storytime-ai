import React from 'react';
import { useRouter } from 'expo-router';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNarrateStory } from '@/hooks/useNarrateStory';

interface StoryViewProps {
  data: any;
}

export function StoryView({ data }: StoryViewProps) {
  const [playSound] = useNarrateStory(data.id);

  const router = useRouter();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.contentText}>{data.content}</Text>
        <TouchableOpacity style={styles.button} onPress={playSound}>
          <Text style={styles.buttonText}>Narrate</Text>
        </TouchableOpacity>
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
