import { useEffect, useState } from 'react';
import { Audio } from 'expo-av';

export function useNarrateStory(id: string) {
  const [sound, setSound] = useState();

  async function playSound() {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    const uri = `http://localhost:3000/assets/speech_${id}.aac`;
    const { sound } = await Audio.Sound.createAsync({ uri });

    console.log('SOUND', sound);

    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  async function pauseSound() {
    if (sound) {
      console.log('Pausing Sound');
      await sound.pauseAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return { playSound, pauseSound, sound };
}
