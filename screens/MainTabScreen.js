import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import OrderScreen from './OrderScreen';
import WishlistScreen from './WishlistScreen';
import AccountScreen from './AccountScreen';

const HomeStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#FF8195"
      inactiveColor="#dedede"
      barStyle={{backgroundColor: '#fff'}}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({color}) => (
            <Icon name="receipt" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({color}) => (
            <Icon name="heart" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: 'Akun',
          tabBarIcon: ({color}) => (
            <Icon name="person" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: '#fff', elevation: 5},
      headerTintColor: '#000',
    }}>
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        title: 'HI VALEEQA',
        headerTitleStyle: {fontWeight: '700'},
        headerRight: () => (
          <Icon.Button
            name="basket"
            size={26}
            color="#FF8195"
            style={{paddingEnd: 0, backgroundColor: '#fff'}}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);
