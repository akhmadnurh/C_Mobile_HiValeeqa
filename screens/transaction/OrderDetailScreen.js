import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, TextInput} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deviceHeight,
  deviceWidth,
  FocusAwareStatusBar,
  Prices,
} from '../../global/component';
import url from '../../global/url';
import axios from 'axios';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import addWhitelistedNativeProps from "module:react-native-reanimated.Animated.addWhitelistedNativeProps";

function OrderDetailScreen({route, navigation}) {
  const {id, status} = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      axios
        .get(url + '/api/transaction/detail/' + id)
        .then(res => {
          setProducts(res.data.products);
          setBank(res.data.bank);
        })
        .catch(e => {
          console.warn(e);
        })
        .finally(() => {
          setLoading(false);
        });
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ActivityIndicator size="large" color="#e87c80" />
      </View>
    );
  }

  const confirmTransaction = () => {
    Alert.alert('Konfirmasi', 'Apakah anda yakin telah menerima pesanan?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Konfirmasi',
        onPress: () => {
          axios.get(url + '/api/transaction/confirm/' + id).then(res => {
            if (res.data.msg == 'success') {
              Alert.alert('Success', 'Transaksi Berhasil!');
              navigation.navigate('Tabs', {screen: 'Home'});
            } else {
              Alert.alert('Error', 'Gagal Konfirmasi Pesanan');
            }
          });
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <StatusOrder status={status} />
      {/*<ShippingAddress />*/}
      <ItemTransaction data={products} />
      {/* <NoResi /> */}
      <Rekening />
      <InputBank bank={bank} />
      {status === 3 ? (
        <Button
          mode="contained"
          color="#e87c80"
          onPress={confirmTransaction}
          style={{elevation: 0, marginHorizontal: 16, marginTop: 12}}
          labelStyle={{color: '#fff'}}>
          Konfirmasi
        </Button>
      ) : status === 1 ? (
        <Button
          mode="contained"
          color="#dc3545"
          onPress={() => console.log('batalkan')}
          style={{elevation: 0, marginHorizontal: 16, marginTop: 12}}
          labelStyle={{color: '#fff'}}>
          Batalkan
        </Button>
      ) : (
        <View></View>
      )}

      <Button
        mode="outlined"
        icon="whatsapp"
        color="#e87c80"
        onPress={() => Linking.openURL('https://wa.me/6285784197425')}
        style={{marginHorizontal: 16, marginTop: 12, marginBottom: 24}}>
        Hubungi Admin
      </Button>
    </ScrollView>
  );
}

function StatusOrder(props) {
  let msg = 'aa';

  if (props.status == 1) {
    msg = 'Belum Bayar';
  } else if (props.status == 2) {
    msg = 'Sedang Dikemas';
  } else if (props.status == 3) {
    msg = 'Proses Pengiriman';
  } else if (props.status == 4) {
    msg = 'Selesai';
  } else if (props.status == 5) {
    msg = 'Gagal';
  }

  return (
    <View style={[styles.shipContainer, {backgroundColor: '#fae4e5'}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{msg}</Text>
      </View>
    </View>
  );
}

function NoResi() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>No. Resi: JNT123456789</Text>
      </View>
    </View>
  );
}

function ShippingAddress() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Icon name="map-marker-outline" size={24} color="#e87c80" />
        <Text style={styles.title}>Alamat Pengiriman</Text>
      </View>
      <Text style={styles.shipContent}>
        Jl. Mastrip No.164, Krajan Timur, Sumbersari, Kec. Sumbersari, Kabupaten
        Jember, Jawa Timur 68121
      </Text>
    </View>
  );
}

function ItemTransaction(props) {
  let t = 0;
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionHeader}>
        <Text>#1</Text>
      </View>
      {props.data.map(data => {
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
              <Prices
                value={data.price}
                renderText={value => (
                  <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                    {value}
                  </Text>
                )}
              />
              <Text>x{data.count}</Text>
            </View>
          </View>
        );
      })}

      <View style={{paddingHorizontal: 16, marginTop: 8}}>
        <View style={styles.textSubTot}>
          <Text>Subtotal</Text>
          <Prices value={t} renderText={value => <Text>{value}</Text>} />
        </View>
        <View style={styles.textSubTot}>
          <Text>Ongkos Kirim</Text>
          <Prices value={20000} renderText={value => <Text>{value}</Text>} />
        </View>
        <View style={[styles.textSubTot, {marginBottom: 0}]}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>Total Bayar</Text>
          <Prices
            value={t + 20000}
            renderText={value => (
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>{value}</Text>
            )}
          />
        </View>
      </View>
    </View>
  );
}

function InputBank(props) {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Konfirmasi Pembayaran</Text>
      </View>
      <View style={{marginTop: 8, marginStart: 8}}>
        <TextInput
          mode="outlined"
          label="Bank Anda"
          disabled={true}
          value={props.bank.bank}
        />
        <TextInput
          mode="outlined"
          label="Nama (Sesuai Rekening)"
          disabled={true}
          value={props.bank.name}
        />
        <TextInput
          mode="outlined"
          label="Rekening"
          disabled={true}
          value={props.bank.account}
        />
      </View>
    </View>
  );
}

function Rekening() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bank Transfer</Text>
      </View>
      <View style={{marginStart: 9, marginTop: 8}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#6c757d'}}>
          BNI (Akhmad Nur Hidayatulloh)
        </Text>
        <Text style={{fontWeight: 'bold', fontSize: 16}}>89787654324</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    height: deviceHeight / 2,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipContainer: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginStart: 8,
    color: '#000',
  },
  shipContent: {
    marginStart: 30,
    marginTop: 8,
  },
  transactionContainer: {
    margin: 8,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  transactionHeader: {
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingBottom: 8,
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
    marginBottom: 8,
  },
});

export default OrderDetailScreen;
