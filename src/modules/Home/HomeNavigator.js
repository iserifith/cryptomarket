import Cryptocurrencies from '../Cryptocurrencies';
import Exchanges from '../Exchanges';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import MaterialTopBarWrapper from './MaterialTopBarWrapper';

export default createMaterialTopTabNavigator(
  {
    Cryptocurrencies: {
      screen: Cryptocurrencies,
      path: 'cryptocurrencies',
    },
    Exchanges: {
      screen: Exchanges,
      path: 'exchanges',
    },
  },
  {
    initialRouteName: 'Cryptocurrencies',
    tabBarComponent: MaterialTopBarWrapper,
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      style: {
        backgroundColor: '#fff',
      },
      indicatorStyle: {
        backgroundColor: 'blue',
      },
      labelStyle: {
        fontWeight: 'bold',
      },
    },
  },
);
