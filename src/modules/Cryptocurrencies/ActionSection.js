import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { hp, wp } from '_util';
import Modal from 'react-native-modal';
import Context from './Context';

const ActionSection = () => {
  const {
    showFavouritesOnly,
    setshowFavouritesOnly,
    showCryptoType,
    setshowCryptoType,
    sortByPrice,
    setSortByPrice,
  } = useContext(Context);

  const toggleFavSort = () => {
    showFavouritesOnly
      ? setshowFavouritesOnly(false)
      : setshowFavouritesOnly(true);
  };

  const togglePriceSort = () => {
    setSortByPrice(prevState => {
      return prevState === 'default'
        ? 'as'
        : prevState === 'as'
        ? 'ds'
        : prevState === 'ds'
        ? 'default'
        : 'default';
    });
  };

  const [showCryptoModal, setShowCryptoModal] = useState(false);

  const toggleCryptoModal = () => {
    setShowCryptoModal(prevState => !prevState);
  };

  const cryptoTypeActive = type => showCryptoType === type;

  return (
    <ScrollView horizontal={true} style={styles.sortContainer}>
      <Modal
        style={styles.modal}
        isVisible={showCryptoModal}
        onBackButtonPress={toggleCryptoModal}
        onBackdropPress={toggleCryptoModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text>Looking For</Text>
          </View>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setshowCryptoType('Cryptocurrencies');
              toggleCryptoModal();
            }}>
            <Text
              style={cryptoTypeActive('Cryptocurrencies') && styles.sortActive}>
              All Cryptocurrencies
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setshowCryptoType('Coin');
              toggleCryptoModal();
            }}>
            <Text style={cryptoTypeActive('Coin') && styles.sortActive}>
              Coins
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => {
              setshowCryptoType('Token');
              toggleCryptoModal();
            }}>
            <Text style={cryptoTypeActive('Token') && styles.sortActive}>
              Tokens
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity onPress={toggleFavSort} style={styles.sortButton}>
        <FontAwesome
          name={showFavouritesOnly ? 'star' : 'star-o'}
          color={showFavouritesOnly ? 'blue' : 'black'}
          size={15}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={() => setShowCryptoModal(true)}>
        <Text style={styles.sortButtonText}>{showCryptoType}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={togglePriceSort} style={styles.sortButton}>
        <FontAwesome
          name={
            sortByPrice === 'default'
              ? 'arrows-h'
              : sortByPrice === 'as'
              ? 'chevron-up'
              : sortByPrice === 'ds'
              ? 'chevron-down'
              : 'arrows-h'
          }
          color={showFavouritesOnly ? 'blue' : 'black'}
          size={15}
        />
        <Text style={[styles.sortButtonText, styles.sortByPriceText]}>
          Price
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    width: wp(100),
    paddingVertical: 10,
    maxHeight: hp(6),
  },
  sortButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginHorizontal: 10,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sortButtonText: {
    fontWeight: '500',
  },
  modal: {
    // margin: 0,
  },
  modalContainer: {
    backgroundColor: 'white',
  },
  modalHeader: {
    padding: 10,
    backgroundColor: '#ededed',
  },
  modalButton: {
    padding: 10,
  },
  sortActive: {
    color: 'blue',
  },
  sortByPriceText: {
    marginHorizontal: 5,
  },
});

export default ActionSection;
