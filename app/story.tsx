import { Ionicons } from '@expo/vector-icons';
import { useMutationState } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function Story() {
  const router = useRouter();
  const data = useMutationState({
    filters: { mutationKey: ['@generate/story'] },
    select: (mutation) => mutation.state.data,
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScrollView style={{ flex: 1 }}>
        <Text>{data}</Text>
      </ScrollView>
      <TouchableOpacity onPress={() => {}}>
        <Text>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/generate')}>
        <Text>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
}
