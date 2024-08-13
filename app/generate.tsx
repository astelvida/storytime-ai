import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller, useFormState } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { Chip } from 'react-native-paper';

type FormData = {
  name: string;
  age: number;
  gender: string;
  location: string;
};

// const [selectedTheme, setSelectedTheme] = useState("");

const themes = [
  { label: 'Adventure', value: 'adventure' },
  { label: 'Fantasy', value: 'fantasy' },
  { label: 'Educational', value: 'educational' },
  { label: 'Moral Lessons', value: 'moral_lessons' },
  { label: 'Bedtime', value: 'bedtime' },
  { label: 'Holiday and Seasonal', value: 'holiday_seasonal' },
  { label: 'Animal Kingdom', value: 'animal_kingdom' },
  { label: 'Mystery and Detective', value: 'mystery_detective' },
  { label: 'Historical', value: 'historical' },
  { label: 'Sports and Hobbies', value: 'sports_hobbies' },
];

const genders = ['female', 'male', 'other'];

const Settings: React.FC = () => {
  const { control, handleSubmit, getValues, watch } = useForm<FormData>();
  // const formState = useFormState(control);
  const onSubmit = (data: FormData) => {
    console.log(control);
    console.log(data);
  };

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
        <Text style={styles.label}>Location:</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Location"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
          )}
          name="location"
          rules={{ required: true }}
          defaultValue="Hogwarts"
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
        <Text style={styles.label}>Themes</Text>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {themes.map((theme) => (
                <Chip
                  key={theme.value}
                  onPress={() => onChange(theme.value)}
                  selected={theme.value === value}
                >
                  <Text>{theme.label}</Text>
                </Chip>
              ))}
            </View>
          )}
          name="themes"
          rules={{ required: true }}
          defaultValue=""
        />
      </View>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

      {/* <Text>{JSON.stringify(formState)}</Text> */}
      {/* <Text>{JSON.stringify(control)}</Text> */}
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8aeaff',
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
    justifyContent: 'space-between',
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
