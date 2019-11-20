import React, { useState, useRef } from 'react';
import { ScrollView, Text, StyleSheet, View, FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const HorizontalText = ({}) => {
  const [data, setData] = useState([
    { label: 'BTC Dominance', value: '65.87%' },
    { label: 'ETH Dominance', value: '8.44%' },
    { label: 'Cryptocurrencies', value: '3104' },
    { label: 'Market Pairs', value: '20880' },
    { label: 'Market Cap', value: '27.39M BTC' },
    { label: '24th Volume', value: '8.59M BTC' },
  ]);

  const flatref = useRef(null);

  const onScrollHandler = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {};

  return (
    <FlatList
      ref={flatref}
      style={styles.container}
      horizontal={true}
      data={data}
      keyExtractor={item => item.label}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      ItemSeparatorComponent={() => {
        return <Entypo name="dot-single" size={20} />;
      }}
      pagingEnabled={true}
      onScroll={onScrollHandler}
      renderItem={({ item }) => (
        <View style={styles.textContainer}>
          <Text style={styles.label}>{item.label}: </Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentContainerStyle: {},
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  label: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
  },
  value: {
    color: 'blue',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default HorizontalText;
