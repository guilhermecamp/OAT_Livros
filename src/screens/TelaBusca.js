import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import servicoApi from '../services/servico_api';
import BarraBusca from '../components/BarraBusca';
import SeletorCategoria from '../components/SeletorCategoria';
import ItemLivro from '../components/ItemLivro';

export default function TelaBusca({ navigation }){
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([servicoApi.get('/books'), servicoApi.get('/categories')]).then(([b, c]) => {
      if (!mounted) return;
      setBooks(b.data || []);
      setCategories(c.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return books.filter(b => {
      const matchQuery = !q || (b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
      const matchCategory = !category || b.category === category;
      return matchQuery && matchCategory;
    });
  }, [books, query, category]);

  function handlePressBook(book){
    navigation.navigate('Details', { book });
  }

  return (
    <View style={{ flex: 1 }}>
      <BarraBusca onSearch={setQuery} autoFocus />
      <SeletorCategoria categories={categories} selected={category} onSelect={setCategory} />
      {loading ? <ActivityIndicator style={{ marginTop: 24 }} /> : (
        filtered.length === 0 ? <Text style={{ padding: 16 }}>Nenhum resultado. Tente outra busca ou selecione outra categoria.</Text> : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemLivro book={item} onPress={handlePressBook} />}
          />
        )
      )}
    </View>
  );
}
