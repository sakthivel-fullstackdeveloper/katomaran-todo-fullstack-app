import React, { useEffect, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Snackbar, RadioButton, Text } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../service/api';

const AddEditTaskScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const task = route.params?.task;

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [dueDate, setDueDate] = useState(task?.dueDate?.split('T')[0] || '');
  const [priority, setPriority] = useState(task?.priority || 'medium');
  const [status, setStatus] = useState(task?.status || 'open');
  const [snack, setSnack] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !dueDate) {
      setSnack('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const data = { title, description, dueDate, status, priority };

      if (task) {
        await api.put(`/update/${task._id}`, data);
      } else {
        await api.post('/create', data);
      }

      navigation.goBack();
    } catch (err) {
      setSnack('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.select({ ios: 'padding', android: undefined })}
    >
      <Text style={styles.heading}>
        {task ? 'Edit Task' : 'Create New Task'}
      </Text>

      <TextInput
        label="Title"
        mode="outlined"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        label="Description"
        mode="outlined"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />

      <TextInput
        label="Due Date (YYYY-MM-DD)"
        mode="outlined"
        value={dueDate}
        onChangeText={setDueDate}
        style={styles.input}
      />

      <Text style={styles.label}>Priority</Text>
      <RadioButton.Group onValueChange={setPriority} value={priority}>
        <View style={styles.radioRow}>
          <RadioButton.Item label="High" value="high" />
          <RadioButton.Item label="Medium" value="medium" />
          <RadioButton.Item label="Low" value="low" />
        </View>
      </RadioButton.Group>

      <Text style={styles.label}>Status</Text>
      <RadioButton.Group onValueChange={setStatus} value={status}>
        <View style={styles.radioRow}>
          <RadioButton.Item label="Open" value="open" />
          <RadioButton.Item label="Complete" value="complete" />
        </View>
      </RadioButton.Group>

      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading}
        style={styles.button}
      >
        {task ? 'Update Task' : 'Create Task'}
      </Button>

      <Snackbar visible={!!snack} onDismiss={() => setSnack('')} duration={3000}>
        {snack}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    marginTop: 24,
    paddingVertical: 6,
  },
});

export default AddEditTaskScreen;
