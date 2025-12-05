import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import ItemLivro from '../components/ItemLivro';
import armazenamentoFavoritos from '../storage/armazenamentoFavoritos';
import servicoApi from '../services/servico_api';

export default function TelaFavoritos({ navigation }){
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    try{
      const ids = await armazenamentoFavoritos.obterFavoritos();
      const res = await servicoApi.get('/books');
      const all = res.data || [];
      const mapped = (ids || []).map(id => all.find(b => String(b.id) === String(id))).filter(Boolean);
      setList(mapped);
    }catch(e){
      console.warn('Erro ao carregar favoritos', e);
      setList([]);
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    const unsub = navigation.addListener('focus', load);
    load();
    return unsub;
  }, [navigation]);

  async function handleClear(){
    Alert.alert('Limpar favoritos', 'Deseja remover todos os favoritos?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', style: 'destructive', onPress: async () => { await armazenamentoFavoritos.salvarFavoritos([]); setList([]); } }
    ]);
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Favoritos ({list.length})</Text>
        <TouchableOpacity style={styles.clearBtn} onPress={handleClear}>
          <Text style={styles.clearText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 24 }} />
      ) : (
        list.length === 0 ? <Text style={{ padding: 16 }}>Nenhum favorito salvo.</Text> : (
          <FlatList data={list} keyExtractor={(item) => item.id} renderItem={({ item }) => <ItemLivro book={item} onPress={() => navigation.navigate('Details', { book: item })} />} />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12 },
  title: { fontSize: 18, fontWeight: '700' },
  clearBtn: { backgroundColor: '#f25', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 6 },
  clearText: { color: '#fff', fontWeight: '600' }
});