import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import DefaultView from '../components/default/DefaultView';

const Splash = () => {
  return (
    <DefaultView>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/cognitensor-logo.png')}
        />
      </View>
    </DefaultView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Splash;
