import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { hp, wp } from '_util';
import ActionSection from './ActionSection';
import ListSection from './ListSection';

const Cryptocurrencies = ({
  _data,
  _favourites,
  _addToFavourites,
  _removeFromFavourites,
}) => {
  const [data, setData] = useState(_data);

  const [showFavouritesOnly, setshowFavouritesOnly] = useState(false);
  const [showCryptoType, setshowCryptoType] = useState('Cryptocurrencies');
  const [sortByPrice, setSortByPrice] = useState('default');

  useEffect(() => {
    // low performance, need new aproach
    let newData = _data.map(d => {
      return {
        ...d,
      };
    });

    if (_favourites.length > 0) {
      _favourites.forEach(
        f => (newData.find(d => d.id === f).favourite = true),
      );
    }

    switch (showCryptoType) {
      case 'Cryptocurrencies':
        break;

      case 'Coin':
        newData = newData.filter(d => d.metadata.category === 'coin');
        break;

      case 'Token':
        newData = newData.filter(d => d.metadata.category === 'token');
        break;

      default:
        break;
    }

    // if (sortByPrice) {
    //   newData = newData.sort(
    //     (a, b) => a.market.quote.USD.price - b.market.quote.USD.price,
    //   );
    // }

    if (showFavouritesOnly) {
      newData = newData.filter(d => d.favourite === true);
    }

    setData(newData);
  }, [_data, _favourites, showFavouritesOnly, showCryptoType]);

  return (
    <View style={styles.container}>
      <ActionSection
        sortByPrice={sortByPrice}
        setSortByPrice={setSortByPrice}
        showCryptoType={showCryptoType}
        setshowCryptoType={setshowCryptoType}
        showFavouritesOnly={showFavouritesOnly}
        setshowFavouritesOnly={setshowFavouritesOnly}
      />
      <ListSection
        showFavouritesOnly={showFavouritesOnly}
        showCryptoType={showCryptoType}
        data={data}
        _addToFavourites={_addToFavourites}
        _removeFromFavourites={_removeFromFavourites}
      />
    </View>
  );
};

const mapStateToProps = ({ cryptocurrencies }) => ({
  _data: cryptocurrencies.data,
  _favourites: cryptocurrencies.favourites,
});
const mapDispatchToProps = dispatch => ({
  _addToFavourites: id => {
    dispatch({
      type: 'cryptocurrencies/favourite',
      payload: id,
    });
  },
  _removeFromFavourites: id => {
    dispatch({
      type: 'cryptocurrencies/removeFavourite',
      payload: id,
    });
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// eslint-disable-next-line prettier/prettier
export default connect(mapStateToProps, mapDispatchToProps)(Cryptocurrencies);
