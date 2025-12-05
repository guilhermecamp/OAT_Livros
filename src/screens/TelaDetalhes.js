import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button, Alert, useWindowDimensions } from 'react-native';
import armazenamentoFavoritos from '../storage/armazenamentoFavoritos';
import theme from '../theme';
import FONTS from '../typography';

export default function TelaDetalhes({ route, navigation }){
  useEffect(() => {
    navigation.setOptions({ title: 'Detalhes do Livro' });
  }, [navigation]);
  const book = route.params?.book;
  const [isFav, setIsFav] = useState(false);
  const { width, height } = useWindowDimensions();
  const coverHeight = Math.max(320, Math.round(Math.min(width, height) * 0.6));
  const [containerWidth, setContainerWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(coverHeight);

  useEffect(() => {
    let mounted = true;
    if (!book) return () => { mounted = false; };
    armazenamentoFavoritos.ehFavorito(book.id).then(v => mounted && setIsFav(v));
    return () => { mounted = false; };
  }, [book]);

  useEffect(() => {
    let mounted = true;
    if (!book || !containerWidth) return;
    Image.getSize(book.cover, (w, h) => {
      const scaled = Math.round(containerWidth * h / w);
      if (mounted) setImageHeight(Math.max(coverHeight, scaled));
    }, () => {
      if (mounted) setImageHeight(coverHeight);
    });
    return () => { mounted = false; };
  }, [book, containerWidth, coverHeight]);

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
      <View onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
        <Image source={{ uri: book.cover }} style={[styles.cover, { height: imageHeight }]} resizeMode="contain" />
      </View>
      <Text style={styles.title}>{book.title}</Text>
  <Text style={styles.author}>{book.author} — {book.year}</Text>
      <Text style={styles.desc}>{book.description}</Text>
      <View style={{ height: 12 }} />
      {!isFav ? (
        <Button title="Adicionar aos Favoritos" onPress={handleAdd} color={theme.colors.primary} />
      ) : (
        <Button title="Remover dos Favoritos" onPress={handleRemove} color={theme.colors.danger} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 320, borderRadius: 8, backgroundColor: theme.colors.surface },
  title: { fontSize: 22, fontWeight: '700', marginTop: 12, color: theme.colors.text, fontFamily: FONTS.CORMORANT_700 },
  author: { fontSize: 16, color: theme.colors.muted, marginTop: 6, fontFamily: FONTS.JOSEFIN_400 },
  desc: { marginTop: 12, fontSize: 15, lineHeight: 22, color: theme.colors.text }
});