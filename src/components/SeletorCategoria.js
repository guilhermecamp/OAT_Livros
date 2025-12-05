import React from 'react';
import { TouchableOpacity, Text, ScrollView } from 'react-native';
import theme from '../theme';

export default function SeletorCategoria({ categories = [], selected, onSelect }){
  const list = [{ id: null, name: 'Todas' }, ...categories];
  return (
    <ScrollView
      horizontal
      style={{ height: 48 }}
      contentContainerStyle={{ paddingHorizontal: 8, paddingVertical: 6, alignItems: 'center' }}
      showsHorizontalScrollIndicator={false}
    >
      {list.map(i => (
        <TouchableOpacity
          key={String(i.id ?? 'all')}
          onPress={() => onSelect(i.id)}
          style={{
            minWidth: 64,
            height: 36,
            paddingHorizontal: 12,
            backgroundColor: selected===i.id ? theme.colors.primary : theme.colors.surface,
            borderRadius: 18,
            marginRight: 8,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ color: selected===i.id ? theme.colors.surface : theme.colors.text, fontSize: 14 }}>{i.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
