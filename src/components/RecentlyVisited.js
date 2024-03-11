import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { createSelector } from 'reselect';

const selectRecentlyVisitedIds = (state) => state.shop.recentlyVisited;

const selectProducts = (state) => state.shop.products;

const selectRecentlyVisitedProducts = createSelector(
  [selectRecentlyVisitedIds, selectProducts],
  (recentlyVisitedIds, products) => recentlyVisitedIds.map(id => products.find(product => product.id === id))
);

const RecentlyVisited = () => {
  const recentlyVisited = useSelector(selectRecentlyVisitedProducts);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Visitados Recientemente</Text>
      <FlatList
        horizontal
        data={recentlyVisited}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    header: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default RecentlyVisited;
