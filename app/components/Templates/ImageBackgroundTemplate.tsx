import React, {ReactNode} from 'react';
import {View, StyleSheet, SafeAreaView, ImageBackground} from 'react-native';

interface Props {
  children: ReactNode;
}

const ImageBackgroundTemplate = ({children}: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../assets/Images/MapBackground.png')}
        resizeMode={'cover'}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default ImageBackgroundTemplate;
