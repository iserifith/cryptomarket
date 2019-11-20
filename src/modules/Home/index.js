import React, { useState } from 'react';
import {
  Alert,
  TouchableOpacity,
  LayoutAnimation,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import HorizontalText from './HorizontalText';
import HomeNavigator from './HomeNavigator';
import { hp, wp } from '../../util';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeNavigator navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Home.router = HomeNavigator.router;

export default Home;
