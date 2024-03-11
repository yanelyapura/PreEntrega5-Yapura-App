import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar'; 
import Promotions from '../components/Promotions'; 
import RecentlyVisited from '../components/RecentlyVisited'; 
import ProductRecommendations from '../components/ProductRecommendations'; 
import CategoryAccess from '../components/CategoryAccess'; 

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchBar navigation={navigation} />
        <Promotions />
        <RecentlyVisited />
        <ProductRecommendations />
        <CategoryAccess navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9FAFB",
      //paddingTop: 50,
      paddingHorizontal: 10, 
    },
  });
export default Home;
