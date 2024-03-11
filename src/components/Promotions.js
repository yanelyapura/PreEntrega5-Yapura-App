import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';
import { createSelector } from 'reselect';


const selectAllProducts = (state) => state.shop.products;

const selectProductsWithDiscount = createSelector(
  [selectAllProducts],
  (products) => products.filter((product) => product.discountPercentage > 0)
);

const Promotions = () => {
  const productsWithDiscount = useSelector(selectProductsWithDiscount);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Promociones Especiales</Text>
      <FlatList
        horizontal
        data={productsWithDiscount}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#eaeaea',
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    alignItems: 'center',
  },
});

export default Promotions;
