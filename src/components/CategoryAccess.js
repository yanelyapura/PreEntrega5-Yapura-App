import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CategoryAccess = ({ navigation }) => {
  const categories = useSelector((state) => state.shop.categories);

  const handlePressCategory = (categoryId) => {
    navigation.navigate('SearchResults', { categoryId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categorías Principales</Text>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryContainer}
            onPress={() => handlePressCategory(item.id)}
          >
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.icon}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
        )}
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
  categoryContainer: {
    marginRight: 15,
    alignItems: 'center',
    width: 100,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 50, 
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryAccess;
