import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const handleLogin = () => {
    alert('Google Login coming soon!');
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1521791136064-7986c2920216' }}
        style={styles.background}
        blurRadius={2}
      >
        <View style={styles.overlay}>
          <Title style={styles.title}>Todo Manager</Title>
          <Paragraph style={styles.subtitle}>Plan. Track. Complete.</Paragraph>

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            labelStyle={styles.buttonText}
            icon="google"
          >
            Sign in with Google
          </Button>
        </View>
        <StatusBar style="light" />
      </ImageBackground>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 36,
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#DB4437',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
