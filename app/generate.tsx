import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Slider from '@react-native-community/slider';
import { Chip } from 'react-native-paper';

type FormData = {
  name: string;
  age: number;
  gender: string;
};
const genders = ['female', 'male', 'other'];

const Settings: React.FC = () => {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
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
        defaultValue=""
      />

      <Text style={styles.label}>Age</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={1}
            maximumValue={10}
            step={1}
            renderStepNumber
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

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
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
});
