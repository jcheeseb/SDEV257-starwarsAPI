import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function Spaceships() {
  const [spaceships, setSpaceships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpaceships = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/starships/');
        const data = await response.json();
        setSpaceships(data.results);
      } catch (error) {
        console.error('Error fetching spaceships:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpaceships();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={spaceships}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.shipContainer}>
              <Text style={styles.shipName}>{item.name}</Text>
              <Text style={styles.shipDetails}>
                Model: {item.model}
              </Text>
              <Text style={styles.shipDetails}>
                Manufacturer: {item.manufacturer}
              </Text>
              <Text style={styles.shipDetails}>
                Crew: {item.crew}
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
    backgroundColor: 'darkred',
    padding: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
  },
  shipContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'black',
    borderRadius: 8,
  },
  shipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  shipDetails: {
    fontSize: 14,
    color: 'lightgray',
  },
});
