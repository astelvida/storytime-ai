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
import ScreenWrapper from '@/components/ScreenWrapper';
import { Button, FAB, Icon } from 'react-native-paper';

interface StoryViewProps {
  data: any;
}

const MyIconButton = ({ icon, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon source={icon} size={36} color="#5a5a5aff" />
    </TouchableOpacity>
  );
};

export function StoryView({ data }: StoryViewProps) {
  const { playSound, pauseSound, sound } = useNarrateStory(data.id);

  const [isPlaying, setIsPlaying] = React.useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      pauseSound();
    } else {
      playSound();
    }
    setIsPlaying(!isPlaying);
  };

  console.log(sound);
  const router = useRouter();

  const handleSave = async () => {
    // const result = await db.runAsync(
    //   'INSERT INTO stories (content, model, prompt) VALUES (?, ?, ?)',
    //   [data.content, data.model, data.prompt]
    // );
    console.log('SAVED');
  };
  const gradient = ['#f9957f', '#f2f5D0'];
  const white = ['#fff', '#fff'];
  return (
    <ScreenWrapper colors={white}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.contentText}>{data.content}</Text>
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <MyIconButton
          icon="refresh"
          onPress={() => router.push('/generate')}
          style={[styles.button, { left: 0 }]}
        />
        <MyIconButton
          icon="content-save-outline"
          onPress={handleSave}
          style={[styles.button, { left: 40 }]}
        />

        <FAB
          size="medium"
          icon={isPlaying ? 'play' : 'pause'}
          style={styles.fab}
          onPress={togglePlay}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 50,
  },
  button: {
    position: 'absolute',
    bottom: 0,
  },
  scrollView: {
    flex: 1,
    marginBottom: 100,
  },
  contentText: {
    fontSize: 20,
    lineHeight: 28,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
