import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function ItemLivro({ book, onPress }){
  return (
    <TouchableOpacity onPress={() => onPress && onPress(book)} style={{flexDirection:'row',padding:8,alignItems:'center'}}>
      <Image source={{ uri: book.cover }} style={{width:50,height:75,backgroundColor:'#eee'}} />
      <View style={{marginLeft:10}}>
        <Text style={{fontWeight:'600'}}>{book.title}</Text>
        <Text style={{color:'#666'}}>{book.author}</Text>
      </View>
    </TouchableOpacity>
  );
}
