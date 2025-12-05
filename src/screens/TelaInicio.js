import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';
import FONTS from '../typography';

export default function TelaInicio({ navigation }){
  useEffect(() => {
    navigation.setOptions({ title: 'Minha Biblioteca' });
  }, [navigation]);

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:16,backgroundColor: theme.colors.background}}>
      <Text style={{fontSize:22,fontWeight:'700',color:theme.colors.text, marginBottom:8, fontFamily: FONTS.CORMORANT_700}}>Bem-vindo à sua biblioteca</Text>
      <Text style={{color:theme.colors.muted, textAlign:'center', marginBottom:18, fontFamily: FONTS.JOSEFIN_400}}>Explore títulos, salve favoritos e receba recomendações personalizadas para momentos de leitura tranquilos.</Text>

      <TouchableOpacity onPress={() => navigation.navigate('TelaBusca')} style={{padding:12,backgroundColor:theme.colors.primary,borderRadius:8,marginBottom:10}}>
        <Text style={{color:theme.colors.surface}}>Buscar Livros</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TelaFavoritos')} style={{padding:12,backgroundColor:theme.colors.primary,borderRadius:8,marginBottom:10}}>
        <Text style={{color:theme.colors.surface}}>Favoritos</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('TelaRecomendacoes')} style={{padding:12,backgroundColor:theme.colors.primary,borderRadius:8}}>
        <Text style={{color:theme.colors.surface}}>Recomendações</Text>
      </TouchableOpacity>
    </View>
  );
}