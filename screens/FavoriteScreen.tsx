import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


const FavoriteScreen = () => {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.favorites.favoriteCharacters);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = (characterId) => {
    Alert.alert('Remove Favorite', 'Are you sure you want to remove this character from favorites?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => dispatch(removeFavorite(characterId)) },
    ]);
  };

  return (
    <View>
      <FlatList
        data={favoriteCharacters}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name}</Text>
            <Button title="Remove" onPress={() => handleRemoveFavorite(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;
