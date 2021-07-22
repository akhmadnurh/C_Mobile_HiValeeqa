import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';
import {
  deviceHeight,
  deviceWidth,
  FocusAwareStatusBar,
} from '../../global/component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../../global/url';
import axios from 'axios';

function ShipmentProcessScreen({navigation}) {
  const [transactions, setTransactions] = useState([]);
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getData = async () => {
        try {
          const id = await AsyncStorage.getItem('user_id');
          const data = {
            user_id: id,
          };
          setLoading(true);
          axios
            .get(url + '/api/transaction/shipment-process', {params: data})
            .then(res => {
              setTransactions(res.data.payments.transactions);
              setDetails(res.data.payments.details);
            })
            .catch(err => {
              console.warn(err);
            })
            .finally(() => {
              setLoading(false);
            });
        } catch (e) {
          console.warn(e);
        }
      };
      getData();
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.empty}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      {transactions.length < 1 ? (
        <OrderEmpty />
      ) : (
        transactions.map((data, key) => {
          return (
            <OrderList
              key={key}
              index={key}
              onPress={() =>
                navigation.navigate('OrderDetail', {
                  screen: 'OrderDetailScreen',
                  params: {id: data.transaction_id, status: 3},
                })
              }
              id={data.transaction_id}
              detail={details[key]}
              total={data.total}
              receipt={data.receipt_number}
            />
          );
        })
      )}
    </ScrollView>
  );
}

function OrderList(props) {
  let t = 0;
  return (
    <View style={styles.list}>
      <View style={styles.listHeader}>
        <Text>#{props.id}</Text>
        <Text style={{color: 'tomato'}}>Proses Pengiriman</Text>
      </View>
      {props.detail.map(data => {
        t += data.price * data.count;
        return (
          <View style={styles.listItem}>
            <Image
              source={{uri: url + '/img/produk/' + data.image}}
              style={{width: 50, height: 75}}
              resizeMode="cover"
            />
            <View style={styles.listItemText}>
              <Text style={{fontSize: 16}}>{data.product_name}</Text>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                Rp {data.price}
              </Text>
              <Text>x{data.count}</Text>
            </View>
          </View>
        );
      })}

      <View style={styles.textSubTot}>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Total Bayar</Text>
        <Text style={{fontSize: 16, fontWeight: 'bold'}}>Rp {t}</Text>
      </View>
      <View style={styles.textResi}>
        <Text>
          No. Resi: <Text style={{fontWeight: 'bold'}}>{props.receipt}</Text>
        </Text>
      </View>
      <View style={styles.containerBtn}>
        <Button
          mode="contained"
          color="#e87c80"
          labelStyle={{color: '#fff'}}
          style={{borderRadius: 8, flex: 0.4, elevation: 0}}
          onPress={props.onPress}>
          Rincian Pesanan
        </Button>
      </View>
    </View>
  );
}

function OrderEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Tidak Ada Pesanan</Text>
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
  textResi: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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

export default ShipmentProcessScreen;
