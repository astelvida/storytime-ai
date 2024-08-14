import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Link href="/generate" style={styles.primaryButton} asChild>
        <TouchableOpacity>
          <Ionicons name="color-wand-outline" size={32} color="green" />
          <Text>Create Story</Text>
        </TouchableOpacity>
      </Link>
      <TouchableOpacity onPress={() => router.push('/stories')}>
        <Ionicons name="flame" size={32} color="green" />
        <Text>Browse Stories</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
