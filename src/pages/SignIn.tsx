import React,{useState} from 'react';
import { View,StyleSheet, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

import {useMyContext} from '../context/AuthProvider'

const SignIn: React.FC = () => {
  const navigation = useNavigation();

  const {logar, isLogado} = useMyContext();

  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [signed, setSigned] = useState(false);
  
  function handleCreateUser(){
    navigation.navigate('UserCreate');
  }
  async function handlerLogin(email:string, password:string){
    await logar(email,password);
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.label}> Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="digite seu email"
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        value={password}
        secureTextEntry={true}
        placeholder="digite sua senha"
        onChangeText={setPassword}
      />
      <View style={styles.buttonContainer}>
        <RectButton style={styles.sigInButton} onPress={()=>{handlerLogin(email, password)}}>
          <Text style={styles.sigInText}> Logar</Text>
        </RectButton>
        
        <RectButton style={styles.sigInButton} onPress={handleCreateUser}>
          <Text style={styles.sigInText}> cadastro</Text>
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'75%',
    backgroundColor:'#fff',
    marginTop:80,
    marginHorizontal:20,
  },
  label:{
    color:'#3d16ca',
    marginTop:15,
    fontWeight:'bold',
    fontSize:20,
    marginHorizontal: 24,
  },
  input:{
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 40,
    marginVertical: 18,
    marginHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'center',
    paddingLeft:10
  },
  buttonContainer:{
    marginHorizontal:24,
  },
  sigInButton:{
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 20,
  },
  sigInText:{
    fontSize:18,
  }
})
export default SignIn;