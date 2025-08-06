import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, Text, RefreshControl } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import TaskCard from '../components/TaskCard';
import FABButton from '../components/FABButton';
import api from '../service/api';
import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { logout } = useContext(AuthContext);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTasks(response.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchTasks);
    return unsubscribe;
  }, [navigation]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchTasks().finally(() => setRefreshing(false));
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Todo Task Manager" />
        <Appbar.Action icon="logout" onPress={logout} />
      </Appbar.Header>

      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {tasks.length === 0 ? (
          <Text style={styles.noTaskText}>No tasks found. Add one!</Text>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => navigation.navigate('AddEditTask', { task })}
              onDelete={() => handleDelete(task._id)}
            />
          ))
        )}
      </ScrollView>

      <FABButton onPress={() => navigation.navigate('AddEditTask')} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  noTaskText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default HomeScreen;
