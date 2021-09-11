import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AuthProvider} from './src/context/AuthProvider';

import {RoutesMain} from './src/routes/RoutesMain';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <AuthProvider>
          <RoutesMain/>
        </AuthProvider>
      </NavigationContainer>
    </>
    
  );
}
