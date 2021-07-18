import React from 'react';
import {View, StyleSheet, Text, StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/core';
import {Avatar, RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {Input} from 'react-native-elements';
import {ScrollView} from 'react-native-gesture-handler';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function ProfileScreen() {
  const [value, setValue] = React.useState('male');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: '#e87c80'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={styles.containerAvatar}>
        <Avatar.Icon icon="folder" size={80} />
      </View>
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Username"
          disabled={true}
          disabledInputStyle={{
            color: '#000',
            fontWeight: 'normal',
            fontSize: 18,
          }}
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#fff',
            paddingBottom: 0,
          }}
          value="user"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Nama Lengkap"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="Akhmad Nur Hidayatulloh"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Email"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
          }}
          value="user@email.com"
        />
      </View>
      <View style={styles.container}>
        <Input
          label="No. Hp"
          labelStyle={{color: '#dedede'}}
          inputContainerStyle={{
            borderBottomColor: '#dedede',
            marginBottom: 0,
          }}
          value="08123456789"
        />
      </View>
      <View
        style={[styles.container, {paddingHorizontal: 20, paddingBottom: 30}]}>
        <View>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <RadioButton.Group
            onValueChange={newValue => setValue(newValue)}
            value={value}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton color="#e87c80" value="male" />
              <Text>Laki - Laki</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <RadioButton color="#e87c80" value="female" />
              <Text>Perempuan</Text>
            </View>
          </RadioButton.Group>
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
    marginBottom: 8,
  },
  curves: {
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default ProfileScreen;
