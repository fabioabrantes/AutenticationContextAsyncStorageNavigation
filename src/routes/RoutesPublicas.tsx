import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from '../pages/SignIn';
import UserCreate from '../pages/UserCreate';

import Header from '../components/Header';

const {Navigator,Screen} = createStackNavigator();

export const RoutesPublicas: React.FC = () => {
  return (
    <Navigator
      screenOptions={{headerShown:false}}
      initialRouteName="SignIn"
    >
      <Screen name="SignIn" component={SignIn}/>
      <Screen
        name="UserCreate" 
        component={UserCreate}
        options={{
          headerShown:true,
          header: ()=><Header navigationPage="SignIn" titulo="Tela de Cadastro"/>
        }}
      />
    </Navigator>
  
  );
}

