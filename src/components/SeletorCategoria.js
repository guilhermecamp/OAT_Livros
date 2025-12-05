import React from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';

export default function SeletorCategoria({ categories = [], selected, onSelect }){
  const list = [{ id: null, name: 'Todas' }, ...categories];
  return (
    <ScrollView horizontal style={{padding:8}} showsHorizontalScrollIndicator={false}>
      {list.map(i => (
        <TouchableOpacity key={String(i.id ?? 'all')} onPress={() => onSelect(i.id)} style={{padding:8,backgroundColor: selected===i.id? '#2b8aef':'#eee',borderRadius:16,marginRight:8}}>
          <Text style={{color: selected===i.id? '#fff':'#000'}}>{i.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
