import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../theme';
import FONTS from '../typography';

export default function ItemLivro({ book, onPress }){
  const navigation = useNavigation();

  function handlePress() {
    if (onPress) return onPress(book);
    navigation.navigate('TelaDetalhes', { book });
  }

  return (
    <TouchableOpacity onPress={handlePress} style={{flexDirection:'row',padding:8,alignItems:'center'}}>
      <Image source={{ uri: book.cover }} style={{width:50,height:75,backgroundColor:theme.colors.surface}} />
      <View style={{marginLeft:10}}>
        <Text style={{fontWeight:'600', color: theme.colors.text, fontFamily: FONTS.CORMORANT_400}}>{book.title}</Text>
        <Text style={{color:theme.colors.muted, fontFamily: FONTS.JOSEFIN_400}}>{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
}