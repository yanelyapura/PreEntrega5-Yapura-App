import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const OrderItem = ({ order }) => {
    const navigation = useNavigation();
    const { id, date, total, items } = order;
    const handlePress = () => navigation.navigate('OrderDetail', { orderId: id });

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.orderItem}>
            <View style={styles.orderInfo}>
                <Text style={styles.date}>{formatDate(order.date)}</Text>
                <Text style={styles.total}>Total: ${order.total.toFixed(2)}</Text>
            </View>
            <Ionicons
                name="search-outline"
                size={24}
                color="#007AFF"
                onPress={handlePress}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    orderInfo: {
        flex: 1,
    },
    date: {
        fontSize: 16,
        marginBottom: 5,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default OrderItem;