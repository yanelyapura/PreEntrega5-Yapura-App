import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectProductRecommendations } from '../selectors/selectors';
import ProductCard from './ProductCard';

const ProductRecommendations = () => {
  const recommendations = useSelector(selectProductRecommendations);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recomendaciones de Productos</Text>
      <FlatList
        horizontal
        data={recommendations}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsHorizontalScrollIndicator={false}
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

export default ProductRecommendations;