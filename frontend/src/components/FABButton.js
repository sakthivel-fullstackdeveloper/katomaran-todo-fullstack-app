import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const FABButton = ({ onPress }) => {
  return (
    <FAB
      icon="plus"
      style={styles.fab}
      onPress={onPress}
      color="#fff"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default FABButton;
