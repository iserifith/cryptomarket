import React, { useContext } from 'react';
import FastImage from 'react-native-fast-image';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { wp, moneyFormat, round } from '_util';
import Context from './Context';

const LeftActions = (progress, dragX) => {
  return (
    <View style={styles.leftAction}>
      <Text style={styles.leftActionText}>Get latest price</Text>
    </View>
  );
};

const ListItem = ({ item, toggleFavourites }) => {
  const { _favourites } = useContext(Context);

  return (
    // <Swipeable renderLeftActions={LeftActions}>
    <View style={styles.itemContainer}>
      <TouchableOpacity style={styles.itemButtonContainer}>
        <FastImage
          style={styles.itemButtonLogo}
          source={{
            uri: item.metadata.logo,
            priority: FastImage.priority.high,
            cache: FastImage.cacheControl.web,
          }}
        />

        <View>
          <Text>{item.name}</Text>
          <Text>{item.symbol}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
        <Text style={styles.price}>
          ${round(item.market.quote.USD.price, 5)}
        </Text>
        <Text style={styles.market_cap}>
          ${moneyFormat(item.market.quote.USD.market_cap)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleFavourites(item)}
        style={styles.favButton}>
        <FontAwesome
          name={_favourites.includes(item.id) ? 'star' : 'star-o'}
          color={_favourites.includes(item.id) ? 'blue' : 'black'}
          size={15}
        />
      </TouchableOpacity>
    </View>
    // </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d7dbe0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  itemButtonContainer: {
    display: 'flex',
    width: wp(60),
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemButtonLogo: {
    marginHorizontal: 10,
    width: 40,
    height: 40,
  },
  itemButtonText: {},
  infoContainer: {
    width: wp(30),
    justifyContent: 'center',
    paddingHorizontal: 5,
    alignItems: 'flex-end',
  },
  price: {
    fontWeight: 'bold',
  },
  market_cap: {
    color: '#6e7175',
  },
  favButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftAction: {
    justifyContent: 'center',
    flex: 1,
  },
  leftActionText: {
    color: 'blue',
    fontWeight: 'bold',
    padding: 20,
  },
});

export default ListItem;
