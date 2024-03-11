import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const ProductDetailCard = ({ productId, quantity }) => {
  const product = useSelector(state => state.shop.products.find(product => product.id === productId));

  if (!product) {
    return null; 
  }

  const { title, price, imageUrl } = product;
  const totalPrice = price * quantity;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text>Cantidad: {quantity}</Text>
        <Text>Precio Unitario: ${price.toFixed(2)}</Text>
        <Text>Total: ${totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ProductDetailCard;
