Como rodar (em outra máquina com Node.js + Expo instalados):

1. Instale dependências

```powershell
npm install
# ou
yarn
```

2. Inicie o Expo

```powershell
npx expo start
```

3. Teste no emulador ou dispositivo.

Observações:
- Este projeto usa AsyncStorage para salvar favoritos.
- A API é simulada: `src/services/api.js` retorna os JSON em `src/data`.
- Instale as dependências de navegação conforme as instruções do React Navigation se necessário (react-native-gesture-handler, react-native-reanimated, etc.).

