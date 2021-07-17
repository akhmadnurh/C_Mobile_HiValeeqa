import React from 'react';
import {ScrollView, View, Text, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainTabScreen from './screens/MainTabScreen';

const App = () => {
  return (
    <NavigationContainer>
      <MainTabScreen />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    backgroundColor: '#FCF6F7',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 6,
  },
  containerNav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  navItemText: {
    fontWeight: 'bold',
    color: '#dedede',
  },
});

export default App;
