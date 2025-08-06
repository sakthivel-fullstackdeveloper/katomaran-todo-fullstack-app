import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
