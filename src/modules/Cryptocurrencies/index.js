import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { hp, wp } from '_util';
import ActionSection from './ActionSection';
import ListSection from './ListSection';
import usePrevious from '../../util/usePrevious';

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
  const prevSortByPrice = usePrevious(sortByPrice);

  useEffect(() => {
    setData(prevData => {
      let newData = _data.map(d => {
        return {
          ...d,
        };
      });

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

      if (showFavouritesOnly) {
        newData = newData.filter(item => _favourites.includes(item.id));
      }

      console.log(prevSortByPrice, sortByPrice);

      if (prevSortByPrice !== sortByPrice) {
        switch (sortByPrice) {
          case 'as':
            newData = newData.sort(
              (a, b) => a.market.quote.USD.price - b.market.quote.USD.price,
            );
            break;

          case 'ds':
            newData = newData.sort(
              (a, b) => b.market.quote.USD.price - a.market.quote.USD.price,
            );
            break;

          case 'default':
            break;

          default:
            break;
        }
      }

      return newData;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_data, _favourites, showFavouritesOnly, showCryptoType, sortByPrice]);

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
        _favourites={_favourites}
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
