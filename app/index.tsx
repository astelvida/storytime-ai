import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, View, TouchableOpacity } from 'react-native';

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity onPress={() => router.push('/generate')}>
        <Ionicons name="color-wand-outline" size={32} color="green" />
        <Text>Create Story</Text>
      </TouchableOpacity>
    </View>
  );
}
