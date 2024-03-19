import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput, TouchableOpacity , Button} from 'react-native';
import { useColorScheme } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PushNotification from 'react-native-push-notification';

const EpisodeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { episode } = route.params;
  const [loading, setLoading] = useState(true);
  const [characterDetails, setCharacterDetails] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    console.log('Episode data:', episode);
    console.log('Characters list:', episode.characters);
    const fetchCharacterDetails = async () => {
      if (!episode || !Array.isArray(episode.characters) || episode.characters.length === 0) {
        console.error('Characters list is undefined, not an array, or empty');
        setLoading(false); 
        return; 
      }

      try {
        setLoading(true); 
        const characterPromises = episode.characters.map(url =>
          fetch(url).then(res => res.json())
        );
        const results = await Promise.all(characterPromises);
        setCharacterDetails(results);
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCharacterDetails();
  }, [episode]);
  useEffect(() => {
    const filteredData = characterDetails.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCharacters(filteredData);
  }, [searchTerm, characterDetails]);
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: "favorite-characters-channel", 
        channelName: "Favorite Characters", 
        channelDescription: "A channel for favorite character notifications", 
        soundName: "default", 
        importance: 4, 
        vibrate: true, 
      },
      (created) => console.log(`CreateChannel returned '${created}'`)
    );
  }, []);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: isDarkMode ? '#333' : '#FFF', 
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#555' : '#cccccc',
    },
    name: {
      fontSize: 18,
      color: isDarkMode ? '#FFF' : '#333', 
    },
    searchBar: {
      fontSize: 18,
      padding: 10,
      borderColor: 'gray',
      borderWidth: 1,
      margin: 10,
      backgroundColor: '#FFF', 
      color: '#000', 
    },
    favoriteButton: {
      paddingVertical: 5, 
      paddingHorizontal: 10, 
      margin: 5,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      alignSelf: 'flex-start', 
    },
    favoriteButtonText: {
      fontSize: 14, 
      color: '#000',
    },
  });

  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: "favorite-characters-channel",
      title: "Favori Limiti Aşıldı",
      message: "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız.",
      playSound: true,
      soundName: "default",
    });
  };

  const toggleFavorite = (id) => {
    setFavoriteCharacters((currentFavorites) => {
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter(favoriteId => favoriteId !== id);
      } else if (currentFavorites.length >= 10) {
        sendNotification(); 
        return currentFavorites;
      } else {
        return [...currentFavorites, id];
      }
    });
  };

  const isFavorite = (id) => {
    return favoriteCharacters.includes(id);
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholderTextColor="#000"
        placeholder="Search by character name..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={filteredCharacters}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('CharacterDetail', { characterId: item.id })}>
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <TouchableOpacity
                  style={[styles.favoriteButton, isFavorite(item.id) ? { backgroundColor: 'red' } : { backgroundColor: 'lightgray' }]}
                  onPress={() => toggleFavorite(item.id)}
                >
                  <Text style={styles.favoriteButtonText}>
                    {isFavorite(item.id) ? "Remove Favorite" : "Add Favorite"}
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};


export default EpisodeDetailScreen;

