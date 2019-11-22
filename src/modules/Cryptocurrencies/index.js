import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { hp, wp } from '_util';
import ActionSection from './ActionSection';
import ListSection from './ListSection';

// class Cryptocurrencies extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [...props._data],
//       showFavouritesOnly: false,
//       showCryptoType: 'Cryptocurrencies',
//       sortByPrice: 'default',
//     };
//   }

//   setSortByPrice = str => {
//     this.setState({ sortByPrice: str });
//   };

//   setshowCryptoType = str => {
//     this.setState({ showCryptoType: str });
//   };

//   setshowFavouritesOnly = bool => {
//     this.setState({ showFavouritesOnly: bool });
//   };

//   shouldComponentUpdate(nextProps, nextState) {
//     const { _favourites } = this.props;
//     const {
//       sortByPrice,
//       showCryptoType,
//       showFavouritesOnly,
//       data,
//     } = this.state;

//     if (_favourites !== nextProps._favourites) {
//       return true;
//     }
//     if (sortByPrice !== nextState.sortByPrice) {
//       return true;
//     }
//     if (showCryptoType !== nextState.showCryptoType) {
//       return true;
//     }
//     if (showFavouritesOnly !== nextState.showFavouritesOnly) {
//       return true;
//     }

//     if (data !== nextState.data) {
//       return true;
//     }

//     return false;
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       this.state.showCryptoType !== prevState.showCryptoType ||
//       this.state.showFavouritesOnly !== prevState.showFavouritesOnly ||
//       this.state.sortByPrice !== prevState.sortByPrice
//     ) {
//       let data = this.props._data;
//       if (this.state.showCryptoType !== prevState.showCryptoType) {
//         switch (prevState.showCryptoType) {
//           case 'Cryptocurrencies':
//             break;

//           case 'Coin':
//             data = data.filter(d => d.metadata.category === 'coin');
//             break;

//           case 'Token':
//             data = data.filter(d => d.metadata.category === 'token');
//             break;

//           default:
//             break;
//         }
//         this.setState({ data });
//       }
//     }
//   }

//   render() {
//     const {
//       setSortByPrice,
//       setshowCryptoType,
//       setshowFavouritesOnly,
//       state,
//       props,
//     } = this;
//     const { _favourites, _removeFromFavourites, _addToFavourites } = props;
//     const { sortByPrice, showCryptoType, showFavouritesOnly, data } = state;

//     return (
//       <View style={styles.container}>
//         <ActionSection
//           sortByPrice={sortByPrice}
//           setSortByPrice={setSortByPrice}
//           showCryptoType={showCryptoType}
//           setshowCryptoType={setshowCryptoType}
//           showFavouritesOnly={showFavouritesOnly}
//           setshowFavouritesOnly={setshowFavouritesOnly}
//         />
//         <ListSection
//           showFavouritesOnly={showFavouritesOnly}
//           showCryptoType={showCryptoType}
//           data={data}
//           _addToFavourites={_addToFavourites}
//           _removeFromFavourites={_removeFromFavourites}
//           _favourites={_favourites}
//         />
//       </View>
//     );
//   }
// }

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

      return newData;
    });

    // setData(newData);
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
