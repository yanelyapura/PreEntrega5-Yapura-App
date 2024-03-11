import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CartItem from '../components/CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, acceptCartTransaction } from '../features/shop/shopSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.shop.cart);

  const removeItemHandler = (id) => {
    dispatch(removeFromCart(id)); 
  };

  const confirmOrderHandler = () => {
    dispatch(acceptCartTransaction()); 
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => removeItemHandler(item.id)}
          />
        )}
      />
      <View style={styles.summary}>
        <Text style={styles.total}>Total: ${calculateTotal().toFixed(2)}</Text>
        <TouchableOpacity onPress={confirmOrderHandler} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar Orden</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    marginTop: 20,
    alignItems: 'center',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Cart;
