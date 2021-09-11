import React,{useState} from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import API from '../services/conexaoAPI';

const UserCreate: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');

  async function createUser(){
    const usuario = {
      name,
      email,
      password 
    }
    const user = await API.post('users', usuario);
    if(user){
      navigation.navigate('SignIn');
    }else{
      Alert.alert('usuário não cadastrado','tente novamente!',[{text: "ok"}]);
    }
      
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}> Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}> Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}> Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      <RectButton style={styles.cadastrarButton} onPress={createUser}>
        <Text style={styles.cadastrarText}> Cadastrar</Text>
      </RectButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    marginHorizontal:20
  },
  label:{
    color:'#3d16ca',
    marginTop:15,
    fontWeight:'bold',
    fontSize:20
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius:40,
    height: 40,
    marginVertical: 18,
    marginHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
    padding:10,
  },
  cadastrarButton:{
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },
  cadastrarText:{
    fontSize:18,
  }
})
export default UserCreate;