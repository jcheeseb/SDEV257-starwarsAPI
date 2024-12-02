import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Planets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets/');
        const data = await response.json();
        setPlanets(data.results);
      } catch (error) {
        console.error('Error fetching planets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={planets}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.planetContainer}>
              <Text style={styles.planetName}>{item.name}</Text>
              <Text style={styles.planetDetails}>
                Population: {item.population}
              </Text>
              <Text style={styles.planetDetails}>
                Climate: {item.climate}
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
    backgroundColor: 'darkblue',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  planetContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'navy',
    borderRadius: 8,
  },
  planetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  planetDetails: {
    fontSize: 14,
    color: 'lightgray',
  },
});
