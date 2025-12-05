import React, { useRef, useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import theme from '../theme';
import FONTS from '../typography';

export default function BarraBusca({ onSearch, autoFocus = false }){
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  function handleSearch(){
    onSearch && onSearch(value.trim());
  }

  function handleClear(){
    setValue('');
    onSearch && onSearch('');
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <View style={styles.row}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="Buscar livros..."
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={[styles.btnText, { fontFamily: FONTS.JOSEFIN_600 }]}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.clear]} onPress={handleClear}>
          <Text style={[styles.btnText, { fontFamily: FONTS.JOSEFIN_600 }]}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { padding: 8, flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 6, paddingHorizontal: 8, height: 44 },
  buttons: { marginLeft: 8, flexDirection: 'row' },
  btn: { backgroundColor: theme.colors.primary, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, marginLeft: 6 },
  clear: { backgroundColor: theme.colors.muted },
  btnText: { color: theme.colors.surface, fontWeight: '600' }
});
