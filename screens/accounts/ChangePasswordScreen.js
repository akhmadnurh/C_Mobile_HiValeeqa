import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../../global/url';
import {FocusAwareStatusBar} from '../../global/component';

function ChangePasswordScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getUserId = async () => {
        setUserId(await AsyncStorage.getItem('user_id'));
      };
      getUserId();
    });

    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={changePassword}>
          <Text style={{color: '#fff'}}>Simpan</Text>
        </TouchableOpacity>
      ),
    });
  });

  const changePassword = () => {
    // Verify Password
    if (newPassword === '' || verifyPassword === '' || oldPassword == '') {
      Alert.alert('Error', 'Dimohon untuk mengisi semua data terlebih dahulu');
    } else {
      if (newPassword !== verifyPassword) {
        Alert.alert('', 'Password tidak sesuai.');
      } else {
        const data = {
          user_id: userId,
          newPassword: newPassword,
          passwordNow: oldPassword,
        };
        // Change password
        axios.post(url + '/api/change-password', data).then(res => {
          if (res.data.msg == 'success') {
            Alert.alert('Success', 'Password berhasil diperbarui.');
            setVerifyPassword('');
            setOldPassword('');
            setNewPassword('');
          } else {
            Alert.alert('Error', 'Password lama tidak sesuai.');
          }
        });
      }
    }
  };

  return (
    <View style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={{height: 40}} />
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Password Saat Ini"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          onChangeText={value => setOldPassword(value)}
          secureTextEntry={true}
          value={oldPassword}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Password Baru"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          onChangeText={value => setNewPassword(value)}
          secureTextEntry={true}
          value={newPassword}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Konfirmasi Password Baru"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          onChangeText={value => setVerifyPassword(value)}
          secureTextEntry={true}
          value={verifyPassword}
        />
      </View>
      <View style={{backgroundColor: '#fff', height: 200}} />
    </View>
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

export default ChangePasswordScreen;
