import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={styles.containerBody}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <View style={styles.containerHeader}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>HI VALEEQA</Text>
          </View>
          <View>
            <Icon name="cart-outline" size={24} />
          </View>
        </View>
        <ScrollView></ScrollView>
        <View style={styles.containerNav}>
          <View style={styles.navItem}>
            <Icon name="home" size={24} color="#FF8195" />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#FF8195',
              }}>
              Home
            </Text>
          </View>
          <View style={styles.navItem}>
            <Icon name="clipboard" size={24} color="#dedede" />
            <Text style={styles.navItemText}>Pesanan</Text>
          </View>
          <View style={styles.navItem}>
            <Icon name="notifications" size={24} color="#dedede" />
            <Text style={styles.navItemText}>Notifikasi</Text>
          </View>
          <View style={styles.navItem}>
            <Icon name="person" size={24} color="#dedede" />
            <Text style={styles.navItemText}>Akun</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerBody: {
    flex: 1,
    backgroundColor: '#FCF6F7',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 6,
  },
  containerNav: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  navItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
  },
  navItemText: {
    fontWeight: 'bold',
    color: '#dedede',
  },
});

export default App;
