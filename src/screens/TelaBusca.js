import React, { useEffect, useMemo, useState } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import servicoApi from '../services/servico_api';
import BarraBusca from '../components/BarraBusca';
import SeletorCategoria from '../components/SeletorCategoria';
import ItemLivro from '../components/ItemLivro';

export default function TelaBusca({ navigation }){
  useEffect(() => {
    navigation.setOptions({ title: 'Busca' });
  }, [navigation]);
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
      const title = b.title || '';
      const author = b.author || '';
      const matchQuery = !q || (title.toLowerCase().includes(q) || author.toLowerCase().includes(q));
      const matchCategory = !category || (Array.isArray(b.tags) && b.tags.includes(category));
      return matchQuery && matchCategory;
    });
  }, [books, query, category]);

  function handlePressBook(book){
    console.log('TelaBusca: abrir detalhes do livro', book && book.id);
    navigation.navigate('TelaDetalhes', { book });
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 112, justifyContent: 'flex-start' }}>
        <BarraBusca onSearch={setQuery} autoFocus />
        <SeletorCategoria categories={categories} selected={category} onSelect={setCategory} />
      </View>
      {loading ? <ActivityIndicator style={{ marginTop: 24 }} /> : (
        filtered.length === 0 ? <Text style={{ padding: 16 }}>Nenhum resultado. Tente outra busca ou selecione outra categoria.</Text> : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ItemLivro book={item} onPress={handlePressBook} />}
            contentContainerStyle={{ paddingTop: 0 }}
            style={{ flex: 1 }}
          />
        )
      )}
    </View>
  );
}