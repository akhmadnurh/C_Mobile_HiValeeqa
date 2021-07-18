import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  Linking,
} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function AccountScreen() {
  const pressContoh = () => {
    return Alert.alert('Ini contoh', 'Berhasih di klik');
  };

  return (
    <View style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={styles.container}>
        <Avatar.Icon size={50} icon="folder" />
        <View style={styles.personName}>
          <Text style={{fontSize: 14, fontWeight: 'bold', color: '#fff'}}>
            Akhmad Nur Hidayatulloh
          </Text>
          <Text style={{fontWeight: '400', color: '#fff'}}>user@email.com</Text>
        </View>
      </View>
      <View style={styles.curves} />
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Profil</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Alamat Pengiriman</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Ganti Password</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL('https://wa.me/6285784197425')}
        android_ripple="#eee">
        <Icon name="logo-whatsapp" size={22} style={{marginEnd: 8}} />
        <Text>Chat Admin</Text>
      </Pressable>
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL('https://www.instagram.com/hi.valeeqa/')}
        android_ripple="#eee">
        <Icon name="logo-instagram" size={22} style={{marginEnd: 8}} />
        <Text>Instagram</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.list2}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text style={{color: '#dc3545'}}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 30,
    flexDirection: 'row',
  },
  personName: {
    marginLeft: 12,
  },
  list: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  list2: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    height: 5,
    backgroundColor: '#eee',
  },
  curves: {
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default AccountScreen;
