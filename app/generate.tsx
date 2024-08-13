import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { Chip, Button } from 'react-native-paper';
import CreateStoryButton from '@/components/CreateStoryButton';
import { useMutation, useQuery } from '@tanstack/react-query';
import FullPageLoadingOverlay from '../components/FullPageLoadingOverlay';
import { Redirect } from 'expo-router';

type Theme = {
  label: string;
  value: string;
};

const themes: Theme[] = [
  { label: '🌊 Adventure', value: 'Adventure' },
  { label: '🧚‍♂️ Fantasy', value: 'Fantasy' },
  { label: '📚 Educational', value: 'Educational' },
  { label: '💖 Moral Lessons', value: 'Moral Lessons' },
  { label: '🌙 Bedtime', value: 'Bedtime' },
  { label: '🎄 Holiday', value: 'Holiday' },
  { label: '🐾 Animal Kingdom', value: 'Animal Kingdom' },
  { label: '🕵️‍♂️ Mystery', value: 'Mystery' },
  { label: '🏛️ Historical', value: 'Historical' },
  { label: '⚽ Sports', value: 'Sports' },
];

const genders: string[] = ['Female', 'Male', 'Other'];

const Settings: React.FC = () => {
  const [name, setName] = React.useState('Maria');
  const [age, setAge] = React.useState(4);
  const [theme, setTheme] = React.useState(themes[0].value);
  const [gender, setGender] = React.useState(genders[0]);

  const { data, isSuccess, isError, isIdle, mutate, isPending } = useMutation({
    mutationKey: ['@generate/story'],
    mutationFn: async (prompt) => {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const result = await response.json();
      return result.choices[0].message.content;
    },
  });

  const onSubmit = () => {
    const prompt = `Create a children's story for a ${age}-year-old ${
      gender === 'Female' ? 'girl' : 'boy'
    } named ${name}. The theme of the story is ${theme}.The story should be engaging and interactive.`;
    console.log(prompt);
    mutate(prompt);
  };

  if (isPending) {
    return <FullPageLoadingOverlay />;
  }

  if (isSuccess && data) {
    return <Redirect href="/story" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Child's Name </Text>
        <TextInput
          id="name"
          style={styles.input}
          placeholder="Name"
          onChangeText={setName}
          value={name}
          defaultValue="Ariana"
        />
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Child's Age: {JSON.stringify(age)}</Text>
        <Slider
          style={{ height: 40 }}
          minimumValue={1}
          maximumValue={10}
          step={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={setAge}
          value={age}
        />
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Gender</Text>
        <View style={styles.chipContainer}>
          {genders.map((curr) => (
            <Chip
              key={curr}
              selected={curr === gender}
              onPress={() => setGender(curr)}
              style={styles.chip}
            >
              {curr}
            </Chip>
          ))}
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Theme</Text>
        <View style={styles.chipContainer}>
          {themes.map((curr, currIndex) => (
            <TouchableOpacity
              key={curr.value}
              style={[
                styles.chip,
                { borderColor: theme === curr.value ? 'blue' : '#ccc' },
              ]}
              onPress={() => setTheme(curr.value)}
            >
              <Text>{curr.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <CreateStoryButton
        onPress={onSubmit}
        isDisabled={!(age && gender && name && theme)}
      />

      <Text>{JSON.stringify({ age, name, theme, gender })}</Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  chipContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  chip: {
    marginHorizontal: 5,
    marginBottom: 8,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
  },
  picker: {
    height: 50,
    width: 250,
  },
  theme: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
