import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';

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

type FormValues = {
  theme: string;
};

const SelectTheme: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log('Selected Theme:', data.theme);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select a Theme:</Text>
      <Controller
        control={control}
        name="theme"
        defaultValue=""
        rules={{ required: 'Theme is required' }}
        render={({ field: { onChange, value } }) => (
          <Picker
            selectedValue={value}
            onValueChange={(itemValue) => onChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select a theme..." value="" />
            {themes.map((theme) => (
              <Picker.Item
                key={theme.value}
                label={theme.label}
                value={theme.value}
              />
            ))}
          </Picker>
        )}
      />
      {errors.theme && (
        <Text style={styles.errorText}>{errors.theme.message}</Text>
      )}

      <Text style={styles.submitButton} onPress={handleSubmit(onSubmit)}>
        Submit
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
  submitButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'blue',
  },
});

export default SelectTheme;
