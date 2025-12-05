import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, Alert } from 'react-native';
import armazenamentoFavoritos from '../storage/armazenamentoFavoritos';

export default function TelaDetalhes({ route, navigation }){
  const book = route.params?.book;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!book) return () => { mounted = false; };
    armazenamentoFavoritos.ehFavorito(book.id).then(v => mounted && setIsFav(v));
    return () => { mounted = false; };
  }, [book]);

  async function handleAdd(){
    if (!book) return;
    await armazenamentoFavoritos.adicionarFavorito(book);
    setIsFav(true);
    Alert.alert('Favorito', 'Livro adicionado aos favoritos');
  }

  async function handleRemove(){
    if (!book) return;
    Alert.alert(
      'Remover',
      'Remover este livro dos favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Remover', style: 'destructive', onPress: async () => { await armazenamentoFavoritos.removerFavorito(book.id); setIsFav(false); Alert.alert('Favorito', 'Livro removido'); } }
      ]
    );
  }

  if (!book) {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center',padding:16}}>
        <Text>Livro não encontrado.</Text>
        <View style={{height:12}} />
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Image source={{ uri: book.cover }} style={styles.cover} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author} — {book.year}</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <View style={{ height: 12 }} />
      {!isFav ? (
        <Button title="Adicionar aos Favoritos" onPress={handleAdd} />
      ) : (
        <Button title="Remover dos Favoritos" onPress={handleRemove} color="#b83b3b" />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 320, borderRadius: 8, backgroundColor: '#eee' },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12 },
  author: { fontSize: 16, color: '#555', marginTop: 6 },
  desc: { marginTop: 12, fontSize: 15, lineHeight: 22 }
});