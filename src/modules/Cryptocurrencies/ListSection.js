import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { hp, wp, moneyFormat, round } from '_util';

const ListSection = ({ data, _addToFavourites, _removeFromFavourites }) => {
  const toggleFavourites = item => {
    if (item.favourite) {
      _removeFromFavourites(item.id);
    } else {
      _addToFavourites(item.id);
    }
  };

  return (
    <FlatList
      data={data}
      initialNumToRender={15}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity style={styles.itemButtonContainer}>
            <Image
              style={styles.itemButtonLogo}
              source={{ uri: item.metadata.logo }}
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
              name={item.favourite ? 'star' : 'star-o'}
              color={item.favourite ? 'blue' : 'black'}
              size={15}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#d7dbe0',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default ListSection;
