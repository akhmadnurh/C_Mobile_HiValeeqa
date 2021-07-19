import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {
  FocusAwareStatusBar,
  deviceHeight,
  deviceWidth,
} from '../global/component';
import {IconButton} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

function WishlistScreen() {
  return (
    <View style={{backgroundColor: '#fff'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
        <WishlistItem />
      </ScrollView>
      {/* <WishlistEmpty /> */}
    </View>
  );
}

function WishlistEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Wishlist Kosong!</Text>
    </View>
  );
}

function WishlistItem() {
  return (
    <View style={styles.list}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={require('../images/dummy.png')}
          style={styles.listImage}
          resizeMode="cover"
        />
        <View style={styles.listContainerText}>
          <View>
            <Text style={{fontSize: 18}}>Yumna Dress</Text>
            <Text>Stok: 10</Text>
          </View>
          <View>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Rp 160000</Text>
          </View>
        </View>
      </View>
      <View style={styles.listContainerButton}>
        <IconButton
          icon="trash-can-outline"
          size={26}
          color="#e87c80"
          onPress={() => console.log('Pressed')}
        />
        <View
          style={{
            borderRadius: 20,
            padding: 9,
          }}>
          <Pressable
            onPress={() => console.log('Pressed')}
            android_ripple={{
              color: 'rgba(232,124,128, 0.32)',
              radius: 30,
              borderless: true,
            }}>
            <Icon name="shopping" size={26} color="#e87c80" />
            <Badge
              value="+"
              textStyle={{color: '#e87c80', fontWeight: 'bold'}}
              badgeStyle={{
                backgroundColor: '#fff',
              }}
              containerStyle={{
                position: 'absolute',
                bottom: -6,
                left: -1,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  listImage: {width: 100, height: 150},
  listContainerText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginStart: 10,
  },
  listContainerButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default WishlistScreen;
