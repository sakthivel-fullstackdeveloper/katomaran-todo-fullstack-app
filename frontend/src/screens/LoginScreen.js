import React, { useState, useContext } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar, ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState('');

  const handleLogin = async () => {
    if (!email) return setSnack('Email is required');
    setLoading(true);
    try {
      await login(email);
    } catch (err) {
      setSnack(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.title}>Todo Task Manager</Text>

      <TextInput
        label="Email"
        value={email}
        mode="outlined"
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} disabled={loading} style={styles.button}>
        {loading ? <ActivityIndicator color="white" /> : 'Login'}
      </Button>

      <Snackbar
        visible={!!snack}
        onDismiss={() => setSnack('')}
        duration={3000}
      >
        {snack}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    marginBottom: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 6,
  },
});

export default LoginScreen;
