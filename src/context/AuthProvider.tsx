import React,{createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import API from '../services/conexaoAPI';

interface User{
  id:number;
  name:string;
}
interface ResponseData{
  user:User | null,
  token:string;
}

interface Contexto{
  user:User | null,
  logar: (email:string, password:string)=> Promise<void>;
  deslogar: ()=> Promise<void>;
  isLogado:boolean;
}
const AuthContext = createContext({} as Contexto);

export const AuthProvider: React.FC = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadStorage(){
      const userStorage= await AsyncStorage.getItem('Auth.user');
      const tokenStorage= await AsyncStorage.getItem('Auth.token');
      if(userStorage && tokenStorage){
        API.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }
  
    }
    loadStorage();
  },[]);

  async function logar(email:string, password:string){
    console.log(email, password);
    
    const dados ={
        email, password
    }

    const response =  await API.post('auth', dados);
    const {user, token} = response.data as ResponseData;

    API.defaults.headers.common.Authorization = `Bearer ${token}`;
   
    await AsyncStorage.setItem('Auth.user', JSON.stringify(user));
    await AsyncStorage.setItem('Auth.token', token);

    setUser(user);
  }

  async function deslogar(){
    setUser(null);
    await AsyncStorage.removeItem('Auth.user');
    await AsyncStorage.removeItem('Auth.token');
  }

  return (
    <AuthContext.Provider
      value={{user,logar,deslogar, isLogado: !!user}} 
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useMyContext(){
  const contexto = useContext(AuthContext);
  return contexto;
}