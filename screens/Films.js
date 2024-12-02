import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Films() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/films/');
        const data = await response.json();
        setFilms(data.results);
      } catch (error) {
        console.error('Error fetching films:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilms();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={films}
          keyExtractor={(item) => item.episode_id.toString()}
          renderItem={({ item }) => (
            <View style={styles.filmContainer}>
              <Text style={styles.filmTitle}>{item.title}</Text>
              <Text style={styles.filmDetails}>
                Episode {item.episode_id} - {item.release_date}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  filmContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'darkgray',
    borderRadius: 8,
  },
  filmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  filmDetails: {
    fontSize: 14,
    color: 'lightgray',
  },
});

