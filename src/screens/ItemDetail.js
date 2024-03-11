import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, addToRecentlyVisited, buyNow } from '../features/shop/shopSlice';

const ItemDetail = ({ route }) => {
    const { productId } = route.params;
    const dispatch = useDispatch();
    const product = useSelector(state => state.shop.products.find(product => product.id === productId));
    
    useEffect(() => {
        dispatch(addToRecentlyVisited(productId));
    }, [productId, dispatch]);

    const [isPortrait, setIsPortrait] = useState(Dimensions.get('window').height > Dimensions.get('window').width);

    useEffect(() => {
        const updateOrientation = () => {
            setIsPortrait(Dimensions.get('window').height > Dimensions.get('window').width);
        };
    
        const subscription = Dimensions.addEventListener('change', updateOrientation);
    
        return () => subscription?.remove();
    }, []);
    
    if (!product) {
        return <View style={styles.container}><Text>Producto no encontrado.</Text></View>;
    }

    const finalPrice = product.discountPercentage > 0 ? product.price - (product.price * product.discountPercentage / 100) : product.price;

    const addToCartHandler = () => {
        dispatch(addToCart({...product, quantity: 1}));
    };
    const buyNowHandler = () => {
        dispatch(buyNow({id: product.id}));
    };    

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: product.imageUrl }} style={styles.productImage} resizeMode="contain" />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{product.title}</Text>
                {product.discountPercentage > 0 && (
                    <View style={styles.discountInfo}>
                        <Text style={styles.originalPrice}>${product.price.toFixed(2)}</Text>
                        <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
                    </View>
                )}
                <Text style={styles.finalPrice}>${finalPrice.toFixed(2)}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Añadir al Carrito" onPress={addToCartHandler} />
                    <Button title="Comprar Ahora" onPress={buyNowHandler} color="#FF6347" />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    productImage: {
        width: '100%',
        aspectRatio: 1,
    },
    detailsContainer: {
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    discountInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 18,
        color: 'grey',
        textDecorationLine: 'line-through',
    },
    discountText: {
        fontSize: 18,
        color: '#E47911',
        fontWeight: 'bold',
    },
    finalPrice: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#B12704',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
});

export default ItemDetail;
