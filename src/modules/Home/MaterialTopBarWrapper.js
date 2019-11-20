import React from 'react';
import { View, Text } from 'react-native';
import { MaterialTopTabBar } from 'react-navigation-tabs';
import HorizontalText from './HorizontalText';

const MaterialTopBarWrapper = props => {
  return (
    <View>
      <HorizontalText />
      <MaterialTopTabBar {...props} />
    </View>
  );
};

export default MaterialTopBarWrapper;
