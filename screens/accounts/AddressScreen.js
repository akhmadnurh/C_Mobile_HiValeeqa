import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import url from '../../global/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FocusAwareStatusBar} from '../../global/component';

function AddressScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [postalCode, setPostalCode] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      try {
        const getAddress = async () => {
          const id = await AsyncStorage.getItem('user_id');
          setUserId(id);
          const data = {
            user_id: id,
          };
          axios.get(url + '/api/address', {params: data}).then(res => {
            setAddress(res.data.address.address);
            setVillage(res.data.address.village);
            setDistrict(res.data.address.district);
            setCity(res.data.address.city);
            setProvince(res.data.address.province);
            setPostalCode(res.data.address.postal_code);
          });
        };
        getAddress();
      } catch (e) {
        console.warn(e);
      }
    });

    return unsubscribe;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={saveAddress}>
          <Text style={{color: '#fff'}}>Simpan</Text>
        </TouchableOpacity>
      ),
    });
  });

  const saveAddress = () => {
    try {
      const data = {
        user_id: userId,
        province: province,
        city: city,
        district: district,
        village: village,
        address: address,
        postal_code: postalCode,
      };

      axios.post(url + '/api/address', data).then(res => {
        if (res.data.msg == 'success') {
          Alert.alert('', 'Data berhasil diperbarui.');
        } else {
          Alert.alert('Error', 'Data gagal diperbarui.');
        }
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={{height: 40}} />
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Provinsi"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={province}
          onChangeText={value => setProvince(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kabupaten"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={city}
          onChangeText={value => setCity(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kecamatan"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={district}
          onChangeText={value => setDistrict(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kelurahan"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={village}
          onChangeText={value => setVillage(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Alamat Lengkap"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={address}
          onChangeText={value => setAddress(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Kode Pos"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value={postalCode}
          onChangeText={value => setPostalCode(value)}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  container1: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    paddingBottom: 16,
  },
  containerAvatar: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    color: '#dedede',
  },
  curves: {
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default AddressScreen;
