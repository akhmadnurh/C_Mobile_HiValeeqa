import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Input} from 'react-native-elements';
import {useIsFocused} from '@react-navigation/core';

function FocusAwareStatusBar() {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar barStyle="light-content" backgroundColor="#e87c80" />
  ) : null;
}

function ChangePasswordScreen() {
  return (
    <View style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar />
      <View style={{height: 40}} />
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Password Saat Ini"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Password Baru"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Konfirmasi Password Baru"
          labelStyle={{color: '#000'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
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
