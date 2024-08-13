import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
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

type CustomFormData = {
  name: string;
  age: number;
  theme: string;
  gender: string;
};

const genders = ['Female', 'Male', 'Other'];

const initialData = {
  name: 'Alice',
  age: 1,
  theme: '',
  gender: '',
};

const Settings: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<FormData>();

  const selectedAge = watch('age');
  const selectedName = watch('name');
  const selectedTheme = watch('theme');
  const selectedGender = watch('gender');

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

  const onSubmit = (userData: CustomFormData) => {
    console.log(userData);
    const { name, age, theme, gender } = userData;
    const prompt = `Create a children's story for a ${age}-year-old ${
      gender === 'Female' ? 'girl' : 'boy'
    } named ${name}. The theme of the story is ${theme}.The story should be engaging and interactive.`;
    console.log(prompt);
    mutate(prompt);
  };

  React.useEffect(() => {
    console.log('data!!!!');
    console.log(data);
  }, [data]);

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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Name"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="name"
          rules={{ required: true }}
          defaultValue="Ariana"
        />
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>
          Child's Age: {JSON.stringify(selectedAge)}
        </Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Slider
              style={{ height: 40 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={onChange}
              value={value}
            />
          )}
          name="age"
          rules={{ required: true, min: 1, max: 10 }}
          defaultValue={1}
        />
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Gender</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.chipContainer}>
              {genders.map((gender) => (
                <Chip
                  key={gender}
                  selected={value === gender}
                  onPress={() => onChange(gender)}
                  style={styles.chip}
                >
                  {gender}
                </Chip>
              ))}
            </View>
          )}
          name="gender"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.label}>Theme</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.chipContainer}>
              {themes.map((theme) => (
                <TouchableOpacity
                  key={theme.value}
                  style={[
                    styles.chip,
                    {
                      marginBottom: 8,
                      borderColor: value === theme.value ? 'blue' : '#ccc',
                      borderWidth: value === theme.value ? 2 : 1,
                      borderRadius: 5,
                      padding: 10,
                    },
                  ]}
                  onPress={() => onChange(theme.value)}
                >
                  <Text>{theme.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          name="theme"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <CreateStoryButton
        onPress={handleSubmit(onSubmit)}
        isDisabled={
          !(selectedAge && selectedGender && selectedName && selectedTheme)
        }
      />

      <Text>
        {JSON.stringify({
          selectedAge,
          selectedName,
          selectedTheme,
          selectedGender,
        })}
      </Text>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#8aeaff',
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
  },
  picker: {
    height: 50,
    width: 250,
  },
  selectedTheme: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
});
