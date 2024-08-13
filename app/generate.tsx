import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { Chip, Button } from 'react-native-paper';
import CreateStoryButton from '@/components/CreateStoryButton';
import SelectTheme from '@/components/SelectTheme';
import OpenAI from 'react-native-openai';

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
  { label: '🎄 Holiday and Seasonal', value: 'Holiday and Seasonal' },
  { label: '🐾 Animal Kingdom', value: 'Animal Kingdom' },
  { label: '🕵️‍♂️ Mystery and Detective', value: 'Mystery and Detective' },
  { label: '🏛️ Historical', value: 'Historical' },
  { label: '⚽ Sports and Hobbies', value: 'Sports and Hobbies' },
];

const genders = ['female', 'male', 'other'];

const Settings: React.FC = () => {
  const { control, handleSubmit, watch } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const openAI = React.useMemo(
    () =>
      new OpenAI({
        apiKey: key,
        organization,
      }),
    []
  );

  const selectedAge = watch('age');

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
          defaultValue="female"
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

      <CreateStoryButton onPress={handleSubmit(onSubmit)} />

      {/* <Text>{JSON.stringify(formState)}</Text> */}
      {/* <Text>{JSON.stringify(control)}</Text> */}
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
