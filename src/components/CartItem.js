import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateCartItemQuantity, removeFromCart } from '../features/shop/shopSlice';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    const increaseQuantityHandler = () => {
        dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity + 1 }));
    };

    const decreaseQuantityHandler = () => {
        if (item.quantity > 1) {
            dispatch(updateCartItemQuantity({ productId: item.id, quantity: item.quantity - 1 }));
        }
    };

    const removeItemHandler = () => {
        dispatch(removeFromCart(item.id));
    };

    return (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.itemDetails}>
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={decreaseQuantityHandler} style={styles.quantityButton}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityInput}>{item.quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantityHandler} style={styles.quantityButton}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={removeItemHandler} style={styles.removeButton}>
                <Text style={styles.removeButtonText}>Quitar</Text>
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        marginVertical: 10,
        padding: 10,
        alignItems: 'center',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        borderRadius: 40,
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qty: {
        fontSize: 14,
    },
    price: {
        fontSize: 14,
        color: '#E47911',
    },
    removeButton: {
        marginLeft: 10,
        backgroundColor: '#ff5252',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#fff',
        fontSize: 12,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    quantityButton: {
        backgroundColor: '#eee',
        padding: 5,
    },
    quantityInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 5,
        width: 50,
        textAlign: 'center',
    },
});

export default CartItem;
