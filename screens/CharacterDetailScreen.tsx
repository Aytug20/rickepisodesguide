import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,Image } from 'react-native';

const CharacterDetailScreen = ({ route }) => {
    const { characterId } = route.params;
    const [loading, setLoading] = useState(true);
    const [character, setCharacter] = useState<Character | null>(null);
  
    useEffect(() => {
      fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(response => response.json())
        .then((data: Character) => {
          setCharacter(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }, [characterId]);
  
    if (loading) {
      return <ActivityIndicator />;
    }
  
    return (
      <View style={styles.container}>
        <Image source={{ uri: character?.image }} style={styles.image} />
        <Text style={styles.name}>{character?.name}</Text>
        <Text style={styles.name}> {character?.status}</Text>
        <Text style={styles.name}>{character?.species}</Text>
        <Text style={styles.name}>{character?.gender}</Text>
        <Text style={styles.name}>{character?.origin.name}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
});

export default CharacterDetailScreen;
