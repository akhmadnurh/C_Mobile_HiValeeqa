import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'react-native-elements';
import {
  ScrollView,
  NativeViewGestureHandler,
  PanGestureHandler,
  TapGestureHandler,
} from 'react-native-gesture-handler';

function ChangePasswordScreen() {
  return (
    <ScrollView>
      <View style={{backgroundColor: '#e87c80'}}>
        <View style={{height: 40}} />
        <View style={styles.curves} />
        <View style={styles.container}>
          <Input
            label="Password Saat Ini"
            labelStyle={{color: '#dedede'}}
            inputContainerStyle={{
              borderBottomColor: '#dedede',
            }}
          />
        </View>
        <View style={styles.container}>
          <Input
            label="Password Baru"
            labelStyle={{color: '#dedede'}}
            inputContainerStyle={{
              borderBottomColor: '#dedede',
            }}
          />
        </View>
        <View style={styles.container}>
          <Input
            label="Konfirmasi Password Baru"
            labelStyle={{color: '#dedede'}}
            inputContainerStyle={{
              borderBottomColor: '#dedede',
            }}
          />
        </View>
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

export default ChangePasswordScreen;
