import React,{useEffect, useState} from 'react';
import { ScrollView, View,Text, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation,useFocusEffect} from '@react-navigation/native'

import {useMyContext} from '../context/AuthProvider';
import API from '../services/conexaoAPI';

import styles from './styles/ListProducts';

interface Product{
  id:number;
  name:string;
  price:number;
  description:string;
}
interface User{
  id:number;
  name:string;
  
}
const ListProduct: React.FC = () => {
  const {user, deslogar} = useMyContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const navigation = useNavigation();
  
  useFocusEffect(() => {
    API.get('products').then(response => {
      setProducts(response.data);
      setUserAuth(user);
    })
  });

  function goToPageProductDetail(id:number){
    navigation.navigate('ProductDetails',{id});
  }

  function goToPageCreateProduct(){
    navigation.navigate('ProductData');
   
  }
  async function goToPageLogin(){
    await deslogar();
  }

  return (
    <ScrollView style={styles.container}>
     <Text style={styles.itemProductTitle}>Bem vindo {userAuth?.name}</Text>
      <Text style={styles.itemProductTitle}>Lista de Produtos</Text>
      {
        products.map(product =>
          <View key={product.id} style={styles.itemProductContainer}>
            <Text style={styles.itemProductName}>{product.name}</Text>
            <TouchableOpacity 
              style={styles.goToProductDetailButton} 
              onPress={() => goToPageProductDetail(product.id)}
            >
              <Feather name="arrow-right" size={20} color="#fff"/>
            </TouchableOpacity>
          </View>
        )
      }  

      <View style={styles.createProductContainer}>
        <Text style={styles.createProductText}>Cadastrar Produtos </Text>
        <RectButton style={styles.createProductButton} onPress={goToPageCreateProduct}>
          <Feather name="plus" size={20} color="#fff"/>
        </RectButton>
      </View>
      <View style={styles.createProductContainer}>
        <Text style={styles.createProductText}>deslogar</Text>
        <RectButton style={styles.createProductButton} onPress={goToPageLogin}>
          <Feather name="delete" size={20} color="#fff"/>
        </RectButton>
      </View>
  </ScrollView>
  );
}


export default ListProduct;