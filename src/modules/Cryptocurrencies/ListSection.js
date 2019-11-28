import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import ListItem from './ListItem';

const Seperator = () => <View style={styles.separator} />;

const ListSection = ({
  data,
  _addToFavourites,
  _removeFromFavourites,
  _favourites,
}) => {
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
      ItemSeparatorComponent={Seperator}
      renderItem={({ item }) => (
        <ListItem
          _favourites={_favourites}
          toggleFavourites={toggleFavourites}
          item={item}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  seperator: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e4',
    marginLeft: 10,
  },
});

export default ListSection;
