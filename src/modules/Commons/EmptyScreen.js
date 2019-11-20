import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';

const EmptyScreen = () => {
  const lottieRef = useRef(null);

  return (
    <SafeAreaView style={styles.container}>
      <LottieView
        autoPlay={true}
        loop={true}
        ref={lottieRef}
        source={require('../../assets/empty_animation.json')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default EmptyScreen;
