/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Home, Discover, Portfolio, Settings, Tools } from '_modules';
import Ionicons from 'react-native-vector-icons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: Home, path: 'home' },
      Portfolio: { screen: Portfolio, path: 'portfolio' },
      Tools: { screen: Tools, path: 'tools' },
      Discover: { screen: Discover, path: 'discover' },
      Settings: { screen: Settings, path: 'settings' },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;

          switch (routeName) {
            case 'Home':
              return (
                <AntDesign
                  color={focused ? 'blue' : 'black'}
                  name="home"
                  size={20}
                />
              );

            case 'Portfolio':
              return (
                <AntDesign
                  color={focused ? 'blue' : 'black'}
                  name="profile"
                  size={20}
                />
              );

            case 'Tools':
              return (
                <AntDesign
                  color={focused ? 'blue' : 'black'}
                  name="tool"
                  size={20}
                />
              );

            case 'Discover':
              return (
                <AntDesign
                  color={focused ? 'blue' : 'black'}
                  name="chrome"
                  size={20}
                />
              );

            case 'Settings':
              return (
                <FontAwesome
                  color={focused ? 'blue' : 'black'}
                  name="gears"
                  size={20}
                />
              );

            default:
              return null;
          }
        },
        tabBarLabel: ({ focused }) => {
          const { routeName } = navigation.state;

          return (
            <Text
              style={{
                fontWeight: focused ? 'bold' : 'normal',
                color: focused ? 'blue' : 'black',
                textAlign: 'center',
              }}>
              {routeName}
            </Text>
          );
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
      },
      initialRouteName: 'Home',
    },
  ),
);
