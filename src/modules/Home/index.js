import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import HomeNavigator from './HomeNavigator';

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
