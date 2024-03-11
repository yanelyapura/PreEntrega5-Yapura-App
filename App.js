import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import Home from './src/screens/Home';
import ItemDetail from './src/screens/ItemDetail';
import SearchResults from './src/screens/SearchResults';
import LoadingScreen from './src/components/LoadingScreen';
import OrderDetail from './src/screens/OrderDetail';
import Cart from './src/screens/Cart';
import Orders from './src/screens/Orders';
import { Ionicons } from '@expo/vector-icons';
import COLORS from './global/colors';
import { useFonts } from 'expo-font';
import { FONTS } from './global/fonts';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Shop') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Cart') iconName = focused ? 'cart' : 'cart-outline';
          else if (route.name === 'Orders') iconName = focused ? 'list' : 'list-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Shop" component={Home} options={{ title: 'Inicio' }} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Orders" component={Orders} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  if (!fontsLoaded) return <LoadingScreen />;

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.primary },
            headerTintColor: '#fff',
            headerTitleStyle: { fontFamily: 'Lobster' },
          }}
        >
          <Stack.Screen
            name="Root"
            component={MyTabs}
            options={{ headerShown: false }} // Oculta el header para los tabs
          />
          <Stack.Screen name="Home" component={Home} options={{ title: 'MercadoYapu' }} />
          <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ title: 'Detalle del Producto' }} />
          <Stack.Screen name="SearchResults" component={SearchResults} options={{ title: 'Resultados de Búsqueda' }} />
          <Stack.Screen name="OrderDetail" component={OrderDetail} options={{ title: 'Detalle de la orden' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
