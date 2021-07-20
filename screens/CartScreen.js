import React from 'react';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import {
  FocusAwareStatusBar,
  deviceHeight,
  deviceWidth,
} from '../global/component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';

function CartScreen() {
  return (
    <View style={{flex: 1}}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CartItem />
        <CartItem />
        <CartItem />
        <CartItem />
      </ScrollView>
      <View style={styles.containerBtn}>
        <Text style={styles.textTotal}>Total: Rp 230000</Text>
        <View style={{flexDirection: 'row'}}>
          <Button
            mode="outlined"
            color="#e87c80"
            labelStyle={{color: '#e87c80'}}
            onPress={() => console.log('click')}
            style={styles.btnDeleteAll}>
            Hapus Semua
          </Button>
          <Button
            // card == empty ? disabled : hapus disabled
            disabled
            mode="contained"
            color="#e87c80"
            labelStyle={{color: '#fff'}}
            onPress={() => console.log('click')}
            style={styles.btnCheckout}>
            Checkout
          </Button>
        </View>
      </View>
    </View>
  );
}

function CartEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Cart Kosong!</Text>
    </View>
  );
}

function CartItem() {
  return (
    <View style={styles.list}>
      <View style={{flexDirection: 'row'}}>
        <Image
          source={require('../images/dummy.png')}
          style={styles.listImage}
          resizeMode="cover"
        />
        <View style={styles.listContainerText}>
          <View>
            <Text style={{fontSize: 18}}>Yumna Dress 1</Text>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Rp 160000</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={[styles.btnWrap, {borderRightWidth: 0}]}>
              <Pressable
                android_ripple={{
                  color: 'rgba(232,124,128, 0.26)',
                  borderless: true,
                  radius: 30,
                }}
                onPress={() => console.log('ngurang')}>
                <Icon name="minus" size={15} color="#e87c80" />
              </Pressable>
            </View>
            <TextInput
              keyboardType="numeric"
              value="120"
              style={styles.inputQty}
            />
            <View style={[styles.btnWrap, {borderLeftWidth: 0}]}>
              <Pressable
                android_ripple={{
                  color: 'rgba(232,124,128, 0.26)',
                  borderless: true,
                  radius: 30,
                }}
                onPress={() => console.log('nambah')}>
                <Icon name="plus" size={15} color="#e87c80" />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listContainerButton}>
        <IconButton
          icon="trash-can-outline"
          color="#e87c80"
          size={24}
          onPress={() => console.log('hapus')}
        />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  btnWrap: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: '#e87c80',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputQty: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: '#e87c80',
    borderWidth: 1,
    width: 50,
    textAlign: 'center',
  },
  containerBtn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 5,
  },
  textTotal: {
    marginBottom: 8,
    fontWeight: 'bold',
    fontSize: 20,
  },
  btnCheckout: {borderRadius: 8, flex: 0.6, elevation: 0},
  btnDeleteAll: {
    borderRadius: 8,
    flex: 0.4,
    elevation: 0,
    marginEnd: 8,
    borderColor: '#e87c80',
  },
});

export default CartScreen;
