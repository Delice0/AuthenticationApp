import React from 'react';
import { Text, View } from 'react-native';
import Weather from '../components/Weather'

export default function Home() {
  return (
    <View style={{
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Weather />
    </View>
  );
}
