import React from 'react';
import {View, Text, StyleSheet, useColorScheme,TouchableOpacity} from 'react-native';
import { Episode } from './../../models/Episode';

interface EpisodeCardProps {
  episode: Episode;
  onPress: (episode: Episode) => void; 
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPress }) => {
    const isDarkMode = useColorScheme() === 'dark';
  
    return (
      <TouchableOpacity onPress={() => onPress(episode.id)}>
        <View style={[styles.card, isDarkMode ? styles.darkCard : styles.lightCard]}>
          <Text style={[styles.cardTitle, isDarkMode ? styles.darkText : styles.lightText]}>{episode.name}</Text>
          <Text style={[styles.cardInfo, isDarkMode ? styles.darkText : styles.lightText]}>Date: {episode.air_date}</Text>
          <Text style={[styles.cardInfo, isDarkMode ? styles.darkText : styles.lightText]}>Episode: {episode.episode}</Text>
        </View>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    padding: 16,
    marginBottom: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
    elevation: 3, 
  },
  darkCard: {
    backgroundColor: '#333',
  },
  lightCard: {
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardInfo: {
    fontSize: 14,
  },
  darkText: {
    color: '#fff',
  },
  lightText: {
    color: '#000',
  },
});

export default EpisodeCard;
