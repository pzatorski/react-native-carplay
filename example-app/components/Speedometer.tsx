import { View, Text, StyleSheet, Platform, Dimensions } from 'react-native';
import React from 'react';
import { useAppSelector } from '../hooks/storeHooks';

export default function Speedometer() {
  const speed = useAppSelector(state => state.speedometer.speed);

  return (
    <View style={styles.container}>
      <View style={styles.speedContainer}>
        <Text style={styles.speedText}>{speed}</Text>
        <Text style={styles.speedUnit}>Km/h</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#060623',
  },
  speedText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 8,
  },
  speedUnit: {
    color: 'white',
  },
  speedContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height * 0.15,
    width: Dimensions.get('window').height * 0.15,
    borderRadius: (Dimensions.get('window').height * 0.15) / 2,
    backgroundColor: '#0C0C46',
  },
});
