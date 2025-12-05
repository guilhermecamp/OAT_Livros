import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicio from './src/screens/TelaInicio';
import TelaBusca from './src/screens/TelaBusca';
import TelaDetalhes from './src/screens/TelaDetalhes';
import TelaFavoritos from './src/screens/TelaFavoritos';
import TelaRecomendacoes from './src/screens/TelaRecomendacoes';

const Stack = createStackNavigator();

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
  <Stack.Screen name="Home" component={TelaInicio} />
  <Stack.Screen name="Search" component={TelaBusca} />
  <Stack.Screen name="Details" component={TelaDetalhes} />
  <Stack.Screen name="Favorites" component={TelaFavoritos} />
  <Stack.Screen name="Recommendations" component={TelaRecomendacoes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
