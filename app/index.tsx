import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { Text, View, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Link href="/generate" style={styles.primaryButton} asChild>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="color-wand-outline" size={32} color="white" />
          <Text style={styles.buttonText}>Create Story</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/stories" style={styles.primaryButton} asChild>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="flame" size={32} color="white" />
          <Text style={styles.buttonText}>Browse Stories</Text>
        </TouchableOpacity>
      </Link>
      <Link href={`${'/story'}`} style={styles.secondaryButton} asChild>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="flame" size={32} color="white" />
          <Text style={styles.buttonText}>Last Story</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: '#28a745',
  },
  secondaryButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
});
