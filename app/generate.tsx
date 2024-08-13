import React, { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useForm, Controller, set, useFieldArray } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { Chip, Button } from 'react-native-paper';
import CreateStoryButton from '@/components/CreateStoryButton';
import { useMutation } from '@tanstack/react-query';
import FullPageLoadingOverlay from '../components/FullPageLoadingOverlay';
import { Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

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
];

const genders: string[] = ['Female', 'Male', 'Other'];

const Settings: React.FC = () => {
  const [name, setName] = React.useState('Maria');
  const [age, setAge] = React.useState(4);
  const [theme, setTheme] = React.useState(themes[0].value);
  const [gender, setGender] = React.useState(genders[0]);
  const [location, setLocation] = React.useState('');
  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'characters',
  });

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

  const generateStory = ({ characters }) => {
    // handleSubmit(({ characters }) => {
    console.log(characters);
    let prompt = `Create a children's story about a ${age}-year-old ${
      gender === 'Female' ? 'girl' : 'boy'
    } named ${name}. The theme of the story is ${theme}.`;

    if (
      characters.length !== 0 &&
      characters.some((c) => c.name.trim().length)
    ) {
      prompt += `The story is about ${characters
        .map((c) => c.name)
        .join(', ')}.`;
    }

    if (location.trim().length) {
      prompt += `The story takes place in ${location}.`;
    }
    console.log(prompt);
    mutate(prompt);
  };

  const addCharacter = () => {
    append({ name: '' });
  };

  const removeCharacter = (index) => {
    remove(index);
  };

  if (isPending) {
    return <FullPageLoadingOverlay />;
  }

  if (isSuccess && data) {
    return <Redirect href="/story" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.settingsRow}>
        <View style={[styles.settingContainer, { flex: 1 }]}>
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

        <View style={styles.settingContainer}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.chipContainer}>
            {genders.map((curr) => (
              <TouchableOpacity
                key={curr}
                onPress={() => setGender(curr)}
                style={[
                  styles.chip,
                  { borderColor: gender === curr ? 'blue' : '#ccc' },
                ]}
              >
                <Text>{curr}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.settingContainer}>
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

      <View style={styles.settingContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          id="location"
          style={styles.input}
          placeholder="Location"
          onChangeText={setLocation}
          value={location}
          defaultValue="London"
        />
      </View>

      <View style={styles.settingContainer}>
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

      <View style={styles.settingContainer}>
        <View style={[styles.row, { alignItems: 'center' }]}>
          <Text style={styles.label}>Characters:</Text>
          <TouchableOpacity onPress={addCharacter}>
            <Ionicons name="add" size={20} color="black" />
          </TouchableOpacity>
        </View>
        {fields.map((item, index) => (
          <View key={item.id} style={styles.row}>
            <View style={{ flex: 1 }}>
              <Controller
                name={`characters.${index}.name`}
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Character"
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(text)}
                    value={value}
                  />
                )}
              />
            </View>
            <Button onPress={() => removeCharacter(index)}>Delete</Button>
          </View>
        ))}
      </View>

      <View style={styles.bottomContainer}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <CreateStoryButton
            onPress={handleSubmit(generateStory)}
            isDisabled={!(age && gender && name && theme)}
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
  settingContainer: {
    marginBottom: 15,
    marginRight: 20,
    gap: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
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
    flexWrap: 'wrap',
  },
  chip: {
    marginBottom: 8,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    marginRight: 8,
  },
  theme: {
    marginTop: 20,
    fontSize: 16,
    fontStyle: 'italic',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 10,
    width: '100%',
    padding: 26,
  },
});
