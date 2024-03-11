import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.jpg')} 
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7B68EE', 
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
});

export default LoadingScreen;
