import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const Pagination = ({ fetchMore, isListEnd }) => {
  return (
    <View style={styles.container}>
      {!isListEnd && (
        <TouchableOpacity onPress={fetchMore} style={styles.button}>
          <Text style={styles.buttonText}>Load More</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default Pagination;
