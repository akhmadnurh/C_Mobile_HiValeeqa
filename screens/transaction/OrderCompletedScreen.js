import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {deviceHeight, deviceWidth} from '../../global/component';

function OrderCompletedScreen() {
  return (
    <ScrollView>
      <OrderList />
    </ScrollView>
  );
}

function OrderList() {
  return (
    <View style={styles.list}>
      <View style={styles.listHeader}>
        <Text>#1</Text>
        <Text style={{color: 'tomato'}}>Selesai</Text>
      </View>
      <View style={styles.listItem}>
        <Image
          source={require('../../images/dummy.png')}
          style={{width: 50, height: 75}}
          resizeMode="cover"
        />
        <View style={styles.listItemText}>
          <Text style={{fontSize: 16}}>Yumna Dress</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rp 120000</Text>
          <Text>x2</Text>
        </View>
      </View>
      <View style={styles.listItem}>
        <Image
          source={require('../../images/dummy.png')}
          style={{width: 50, height: 75}}
          resizeMode="cover"
        />
        <View style={styles.listItemText}>
          <Text style={{fontSize: 16}}>Yumna Dress</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rp 120000</Text>
          <Text>x2</Text>
        </View>
      </View>
      <View style={styles.listItem}>
        <Image
          source={require('../../images/dummy.png')}
          style={{width: 50, height: 75}}
          resizeMode="cover"
        />
        <View style={styles.listItemText}>
          <Text style={{fontSize: 16}}>Yumna Dress</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rp 120000</Text>
          <Text>x2</Text>
        </View>
      </View>
      <View style={styles.textSubTot}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Total Bayar</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rp 110000</Text>
      </View>
      <View style={styles.containerBtn}>
        <Button
          mode="contained"
          color="#e87c80"
          labelStyle={{color: '#fff'}}
          style={{borderRadius: 8, flex: 0.4, elevation: 0}}>
          Rincian Pesanan
        </Button>
      </View>
    </View>
  );
}

function OrderEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Belum Ada Pesanan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    height: deviceHeight / 3,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  list: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    marginTop: 8,
  },
  listHeader: {
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  listItemText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginStart: 12,
  },
  textSubTot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    padding: 16,
  },
  containerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#fff',
    marginTop: 16,
    marginEnd: 8,
  },
});

export default OrderCompletedScreen;
