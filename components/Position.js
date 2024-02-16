import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native'; // Import View and StyleSheet for styling
import * as Location from 'expo-location';
import Weather from './Weather';

const Position = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [message, setMessage] = useState('Retrieving location...');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status !== 'granted') {
          setMessage("Location not permitted.");
        } else {
          const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          setMessage('Location retrieved');
        }
      } catch (error) {
        setMessage("Error retrieving location.");
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.coords}>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
        <Text style={styles.message}>{message}</Text>  
        </View>
      )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
  },
  coordinate: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Position;

