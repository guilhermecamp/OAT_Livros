import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function TelaInicio({ navigation }){
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{padding:12,backgroundColor:'#2b8aef',borderRadius:8,marginBottom:10}}>
        <Text style={{color:'#fff'}}>Buscar Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{padding:12,backgroundColor:'#2b8aef',borderRadius:8,marginBottom:10}}>
        <Text style={{color:'#fff'}}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Recommendations')} style={{padding:12,backgroundColor:'#2b8aef',borderRadius:8}}>
        <Text style={{color:'#fff'}}>Recomendações</Text>
      </TouchableOpacity>
    </View>
  );
}
