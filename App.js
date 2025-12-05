import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StatusBar, SafeAreaView, useWindowDimensions } from 'react-native';
import theme from './src/theme';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicio from './src/screens/TelaInicio';
import TelaBusca from './src/screens/TelaBusca';
import TelaDetalhes from './src/screens/TelaDetalhes';
import TelaFavoritos from './src/screens/TelaFavoritos';
import TelaRecomendacoes from './src/screens/TelaRecomendacoes';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

async function fetchFontCssAndExtractUrls(cssUrl) {
  const resp = await fetch(cssUrl);
  const css = await resp.text();

  const blocks = css.match(/@font-face\s*{[^}]*}/g) || [];
  const result = {};

  const keyMap = {
    'CormorantGaramond': { '400': 'CormorantGaramond_400Regular', '700': 'CormorantGaramond_700Bold' },
    'Josefin Sans': { '400': 'JosefinSans_400Regular', '600': 'JosefinSans_600SemiBold' },
    'Inconsolata': { '400': 'Inconsolata_400Regular' }
  };

  blocks.forEach(block => {
    const famMatch = block.match(/font-family:\s*'([^']+)'/i);
    const urlMatch = block.match(/url\((https:[^)]+)\)/i);
    const weightMatch = block.match(/font-weight:\s*([^;]+)/i);

    if (famMatch && urlMatch) {
      const family = famMatch[1];
      const weight = weightMatch ? weightMatch[1].trim() : '400';
      let key = null;
      if (keyMap[family] && keyMap[family][weight]) {
        key = keyMap[family][weight];
      } else {
        key = `${family.replace(/\s+/g, '')}_${weight}`;
      }
      result[key] = urlMatch[1].replace(/"/g, '');
    }
  });

  return result;
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const cssUrl =
          'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&family=Cormorant+Garamond:wght@400;700&family=Inconsolata:wght@400&display=swap';

        const fontMap = await fetchFontCssAndExtractUrls(cssUrl);

        await Font.loadAsync(fontMap);
        setFontsLoaded(true);
      } catch (err) {
        console.warn('Erro carregando fontes:', err);
        setFontsLoaded(true);
      }
    })();
  }, []);

    return (
      <SafeAreaProvider>
        {fontsLoaded ? <MainApp /> : <LoadingScreen />}
      </SafeAreaProvider>
    );
  }

  function LoadingScreen() {
    const BORDER_SIZE = 15;
    const { width, height } = useWindowDimensions();
    const adaptiveRadius = Math.max(8, Math.round(Math.min(width, height) * 0.03));

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primaryDark }}>
          <View style={{ flex: 1, marginHorizontal: BORDER_SIZE, marginTop: 2, marginBottom: BORDER_SIZE, borderRadius: adaptiveRadius, overflow: 'hidden', backgroundColor: theme.colors.surface }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
          <StatusBar translucent={false} backgroundColor={theme.colors.primaryDark} barStyle="light-content" />
        </View>
      </SafeAreaView>
    );
  }

  function MainApp() {
    const insets = useSafeAreaInsets();
    const BORDER_SIZE = 15;
    const { width, height } = useWindowDimensions();
    const adaptiveRadius = Math.max(8, Math.round(Math.min(width, height) * 0.03));

  const paddingBottom = 10;
  const innerPadding = { padding: 10, flex: 1, paddingBottom };

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.primaryDark }}>
        <View style={{ flex: 1, marginHorizontal: BORDER_SIZE, marginTop: 1, marginBottom: BORDER_SIZE, borderRadius: adaptiveRadius, overflow: 'hidden', backgroundColor: theme.colors.surface }}>
          <View style={innerPadding}>
            <NavigationContainer>
              <StatusBar translucent={false} backgroundColor={theme.colors.primaryDark} barStyle="light-content" />
              <Stack.Navigator
                initialRouteName="TelaInicio"
                screenOptions={{
                  headerShown: true,
                  headerStyle: { backgroundColor: theme.colors.surface, elevation: 0, shadowOpacity: 0 },
                  headerTintColor: theme.colors.text
                }}
              >
                <Stack.Screen name="TelaInicio" component={TelaInicio} />
                <Stack.Screen name="TelaBusca" component={TelaBusca} />
                <Stack.Screen name="TelaDetalhes" component={TelaDetalhes} />
                <Stack.Screen name="TelaFavoritos" component={TelaFavoritos} />
                <Stack.Screen name="TelaRecomendacoes" component={TelaRecomendacoes} />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </View>
      </SafeAreaView>
    );
  }