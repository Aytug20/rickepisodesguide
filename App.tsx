import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EpisodesScreen from './screens/EpisodesScreen';
import EpisodeDetailScreen from './screens/EpisodeDetailScreen';
import CharacterDetailScreen from './screens/CharacterDetailScreen';
import FavoriteScreen from './screens/FavoriteScreen';

const Stack = createStackNavigator();

function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Episodes" component={EpisodesScreen} />
          <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
          <Stack.Screen name="CharacterDetail" component={CharacterDetailScreen} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;


