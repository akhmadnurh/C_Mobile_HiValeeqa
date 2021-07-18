import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Image, Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SplashScreen() {
  useEffect(() => {
    try {
      const isLoggedIn = async () => {
        const value = await AsyncStorage.getItem('isLoggedIn');
        if (value !== null) {
          navigation.navigate('Tabs');
        } else {
          navigation.navigate('Login');
        }
      };
      isLoggedIn();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={{width: 130, height: 103}}
        source={require('../images/hi-valeeqa.png')}
      />
      <Text style={styles.title}>HI VALEEQA</Text>
    </View>
  );
}

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 24,
  },
});

export default SplashScreen;
