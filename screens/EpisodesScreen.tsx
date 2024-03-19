import React, { useState, useEffect } from 'react';
import { Episode } from '../models/Episode';
import EpisodeCard from '../views/components/EpisodeCard';
import Pagination from '../views/components/Pagination';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  useColorScheme,
  TextInput,
  View,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function EpisodesScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [filteredEpisodes, setFilteredEpisodes] = useState<Episode[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => {

    fetchEpisodes();
  }, []);

  useEffect(() => {

    const filteredData = episodes.filter(episode =>
      episode.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredEpisodes(filteredData);
  }, [search, episodes]);

  const fetchEpisodes = () => {
    if (!loading && !isListEnd) {
      setLoading(true);
      fetch(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.results && responseJson.results.length > 0) {
            setCurrentPage(currentPage + 1);
            setEpisodes(prevEpisodes => [...prevEpisodes, ...responseJson.results]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ color: '#000' }} />;
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const handlePress = (episode) => {
    navigation.navigate('EpisodeDetail', { episode });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by episode name..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredEpisodes}
        renderItem={({ item }) => (
          <EpisodeCard
            episode={item}
            onPress={() => handlePress(item)} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<Pagination fetchMore={fetchEpisodes} isListEnd={isListEnd} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    fontSize: 18,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
  },
});

export default EpisodesScreen;

