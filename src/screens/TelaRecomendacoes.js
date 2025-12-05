import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity } from 'react-native';
import servicoApi from '../services/servico_api';
import ItemLivro from '../components/ItemLivro';
import theme from '../theme';
import FONTS from '../typography';

const PRESETS = [
  { id: 'classicos', label: 'Clássicos', tag: 'classico' },
  { id: 'perturbadores', label: 'Perturbadores', tag: 'perturbador' },
  { id: 'viraram_filmes', label: 'Viraram filmes', tag: 'virou_filme' },
  { id: 'para_iniciantes', label: 'Para iniciantes', tag: 'para_iniciantes' }
];

export default function TelaRecomendacoes({ navigation }){
  useEffect(() => {
    navigation.setOptions({ title: 'Recomendações de Livros' });
  }, [navigation]);
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    servicoApi.get('/books').then(res => setBooks(res.data || []));
  }, []);

  function handlePreset(p){
    const out = books.filter(b => Array.isArray(b.tags) && b.tags.includes(p.tag));
    setFiltered(out);
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <View style={{ padding: 12 }}>
  <Text style={{ fontSize: 20, fontWeight: '700', color: theme.colors.text, marginBottom: 8, fontFamily: FONTS.CORMORANT_700 }}>Recomendações</Text>
  <Text style={{ color: theme.colors.muted, marginBottom: 12, fontFamily: FONTS.JOSEFIN_400 }}>Escolha um tema para ver sugestões de leitura que combinam com momentos calmos e intimistas.</Text>
        {PRESETS.map(p => (
          <TouchableOpacity key={p.id} onPress={() => handlePreset(p)} style={{ marginVertical: 6, backgroundColor: theme.colors.primary, padding: 10, borderRadius: 8 }}>
            <Text style={{ color: theme.colors.surface, fontWeight: '600', fontFamily: FONTS.JOSEFIN_600 }}>{p.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {filtered.length === 0 ? <Text style={{ padding: 16 }}>Escolha um preset para ver recomendações. :)</Text> : (
        <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={({ item }) => <ItemLivro book={item} onPress={() => navigation.navigate('TelaDetalhes', { book: item })} />} />
      )}
    </View>
  );
}