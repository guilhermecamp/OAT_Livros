import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import servicoApi from '../services/servico_api';
import ItemLivro from '../components/ItemLivro';

const PRESETS = [
  { id: 'classicos', label: 'Clássicos', tag: 'classico' },
  { id: 'perturbadores', label: 'Perturbadores', tag: 'perturbador' },
  { id: 'viraram_filmes', label: 'Viraram filmes', tag: 'virou_filme' },
  { id: 'para_iniciantes', label: 'Para iniciantes', tag: 'para_iniciantes' }
];

export default function TelaRecomendacoes({ navigation }){
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
    <View style={{ flex: 1 }}>
      <View style={{ padding: 12 }}>
        {PRESETS.map(p => <View key={p.id} style={{ marginVertical: 6 }}><Button title={p.label} onPress={() => handlePreset(p)} /></View>)}
      </View>
      {filtered.length === 0 ? <Text style={{ padding: 16 }}>Escolha um preset para ver recomendações</Text> : (
        <FlatList data={filtered} keyExtractor={(i) => i.id} renderItem={({ item }) => <ItemLivro book={item} onPress={() => navigation.navigate('Details', { book: item })} />} />
      )}
    </View>
  );
}
