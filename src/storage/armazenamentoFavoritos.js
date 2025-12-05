import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE = 'BOOKS_FAVORITES_V1';

export async function obterFavoritos(){
  try{
    const raw = await AsyncStorage.getItem(CHAVE);
    return raw ? JSON.parse(raw) : [];
  }catch(e){
    console.warn('obterFavoritos', e);
    return [];
  }
}

export async function salvarFavoritos(lista){
  try{
    await AsyncStorage.setItem(CHAVE, JSON.stringify(lista));
    return true;
  }catch(e){
    console.warn('salvarFavoritos', e);
    return false;
  }
}

export async function adicionarFavorito(livro){
  const lista = await obterFavoritos();
  const id = (livro && livro.id) ? String(livro.id) : String(livro);
  if (!lista.includes(id)){
    lista.push(id);
    await salvarFavoritos(lista);
  }
  return lista;
}

export async function removerFavorito(livroId){
  let lista = await obterFavoritos();
  lista = lista.filter(id => String(id) !== String(livroId));
  await salvarFavoritos(lista);
  return lista;
}

export async function ehFavorito(livroId){
  const lista = await obterFavoritos();
  return lista.includes(String(livroId));
}

export default {
  obterFavoritos,
  salvarFavoritos,
  adicionarFavorito,
  removerFavorito,
  ehFavorito
};