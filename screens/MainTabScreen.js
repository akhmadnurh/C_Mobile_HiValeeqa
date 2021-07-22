import React from 'react';
import {TouchableOpacity, Text, View, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Icons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import WishlistScreen from './WishlistScreen';
import DetailScreen from './DetailScreen';
import AccountScreen from './AccountScreen';
import LoginScreen from './LoginScreen';
import ProfileScreen from './accounts/ProfileScreen';
import AddressScreen from './accounts/AddressScreen';
import ChangePasswordScreen from './accounts/ChangePasswordScreen';
import SplashScreen from './SplashScreen';
import CartScreen from './CartScreen';
import CheckoutScreen from './CheckoutScreen';
import PaymentPendingScreen from './transaction/PaymentPendingScreen';
import ShipmentPendingScreen from './transaction/ShipmentPendingScreen';
import ShipmentProcessScreen from './transaction/ShipmentProcessScreen';
import OrderCompletedScreen from './transaction/OrderCompletedScreen';
import OrderCanceledScreen from './transaction/OrderCanceledScreen';
import OrderDetailScreen from './transaction/OrderDetailScreen';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const CartStack = createStackNavigator();
const AccountStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const TransactionStack = createStackNavigator();
const OrderDetailStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Top = createMaterialTopTabNavigator();

const MainTabScreen = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tabs" component={TabScreen} />
      <Stack.Screen name="Detail" component={DetailStackScreen} />
      <Stack.Screen name="Cart" component={CartStackScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailStackScreen} />
    </Stack.Navigator>
  );
};

export default MainTabScreen;

const TabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#e87c80"
    inactiveColor="#dedede"
    barStyle={{backgroundColor: '#fff'}}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Beranda',
        tabBarIcon: ({color}) => <Icons name="home" color={color} size={24} />,
      }}
    />
    <Tab.Screen
      name="Transaction"
      component={TransactionStackScreen}
      options={{
        tabBarLabel: 'Pesanan',
        tabBarIcon: ({color}) => (
          <Icons name="receipt" color={color} size={24} />
        ),
      }}
    />
    <Tab.Screen
      name="Wishlist"
      component={WishlistStackScreen}
      options={{
        tabBarLabel: 'Wishlist',
        tabBarIcon: ({color}) => <Icons name="heart" color={color} size={24} />,
      }}
    />
    <Tab.Screen
      name="Account"
      component={AccountStackScreen}
      options={{
        tabBarLabel: 'Akun',
        tabBarIcon: ({color}) => (
          <Icons name="person" color={color} size={24} />
        ),
      }}
    />
  </Tab.Navigator>
);

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#fff', elevation: 2},
        headerTintColor: '#000',
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'HI VALEEQA',
          headerTitleStyle: {fontWeight: '700'},
          headerRightContainerStyle: {
            paddingEnd: 20,
          },
        }}
      />
    </HomeStack.Navigator>
  );
};

const DetailStackScreen = () => (
  <DetailStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 2},
      headerTintColor: '#000',
    }}>
    <DetailStack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{
        title: 'Detail',
        headerRightContainerStyle: {
          paddingEnd: 20,
        },
      }}
    />
  </DetailStack.Navigator>
);

const TransactionStackScreen = () => (
  <TransactionStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 0},
      headerTintColor: '#000',
    }}>
    <TransactionStack.Screen
      name="TransactionScreen"
      component={TransactionTab}
      options={{
        title: 'Pesanan',
      }}
    />
  </TransactionStack.Navigator>
);

const TransactionTab = () => (
  <Top.Navigator
    tabBarOptions={{
      activeTintColor: '#e87c80',
      inactiveTintColor: 'rgba(0,0,0,0.75)',
      scrollEnabled: true,
      indicatorStyle: {backgroundColor: '#e87c80'},
    }}>
    <Top.Screen
      name="PaymentPending"
      component={PaymentPendingScreen}
      options={{title: 'Belum Bayar'}}
    />
    <Top.Screen
      name="ShipmentPending"
      component={ShipmentPendingScreen}
      options={{title: 'Dikemas'}}
    />
    <Top.Screen
      name="ShipmentProcess"
      component={ShipmentProcessScreen}
      options={{title: 'Dikirim'}}
    />
    <Top.Screen
      name="OrderCompleted"
      component={OrderCompletedScreen}
      options={{title: 'Selesai'}}
    />
    <Top.Screen
      name="OrderCanceled"
      component={OrderCanceledScreen}
      options={{title: 'Batal'}}
    />
  </Top.Navigator>
);

const CartStackScreen = () => (
  <CartStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 2},
      headerTintColor: '#000',
    }}>
    <CartStack.Screen
      name="CartScreen"
      component={CartScreen}
      options={{
        title: 'Cart',
      }}
    />
    <CartStack.Screen
      name="Checkout"
      component={CheckoutScreen}
      options={{
        title: 'Checkout',
      }}
    />
  </CartStack.Navigator>
);

const AccountStackScreen = () => (
  <AccountStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#e87c80', elevation: 0},
      headerTintColor: '#fff',
    }}>
    <AccountStack.Screen
      name="AccountScreen"
      component={AccountScreen}
      options={{
        title: 'Akun',
      }}
    />
    <AccountStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        title: 'Profil',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
    <AccountStack.Screen
      name="Address"
      component={AddressScreen}
      options={{
        title: 'Alamat Pengiriman',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
    <AccountStack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{
        title: 'Ganti Password',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
  </AccountStack.Navigator>
);

const WishlistStackScreen = () => (
  <WishlistStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#e87c80', elevation: 0},
      headerTintColor: '#fff',
    }}>
    <WishlistStack.Screen
      name="WishlistScreen"
      component={WishlistScreen}
      options={{
        title: 'Wishlist',
        headerRightContainerStyle: {
          marginEnd: 20,
        },
      }}
    />
  </WishlistStack.Navigator>
);

const OrderDetailStackScreen = () => (
  <OrderDetailStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 0},
      headerTintColor: '#000',
    }}>
    <OrderDetailStack.Screen
      name="OrderDetailScreen"
      component={OrderDetailScreen}
      options={{
        title: 'Rincian Pesanan',
      }}
    />
  </OrderDetailStack.Navigator>
);
