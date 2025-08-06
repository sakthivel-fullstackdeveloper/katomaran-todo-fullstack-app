import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../service/api';

const TaskCard = ({ task, onRefresh }) => {
  const navigation = useNavigation();

  const handleDelete = async () => {
    try {
      await api.delete(`/delete/${task._id}`);
      onRefresh();
    } catch (err) {
      console.log('Delete error:', err);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Title
        title={task.title}
        subtitle={`Due: ${task.dueDate?.split('T')[0]}`}
        right={() => (
          <IconButton icon="pencil" onPress={() => navigation.navigate('AddEditTask', { task })} />
        )}
      />
      <Card.Content>
        <Text>{task.description}</Text>
        <Text style={styles.meta}>Priority: {task.priority}</Text>
        <Text style={styles.meta}>Status: {task.status}</Text>
      </Card.Content>
      <Card.Actions>
        <IconButton icon="delete" onPress={handleDelete} />
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  meta: {
    marginTop: 4,
    color: '#666',
  },
});

export default TaskCard;
