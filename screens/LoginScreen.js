import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'react-native-elements';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        inputContainerStyle={styles.input}
        placeholder="Username/Email"
        leftIcon={<Icon name="person" size={20} color="#ccc" />}
      />
      <Input
        inputContainerStyle={styles.input}
        placeholder="Password"
        leftIcon={<Icon name="lock-closed" size={20} color="#ccc" />}
      />
      <Button
        mode="contained"
        color="#FF8195"
        labelStyle={{color: '#fff'}}
        onPress={() => Alert.alert('clicked')}>
        Login
      </Button>
      <View style={{flexDirection: 'row', marginTop: 50}}>
        <Text>Belum Punya Akun? </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('http://10.0.2.2:8000/register')}>
          <Text style={{color: '#FF8195'}}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: '#fff',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 90,
  },
  input: {
    borderColor: '#eee',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
