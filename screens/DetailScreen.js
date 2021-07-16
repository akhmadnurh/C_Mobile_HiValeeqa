import React from 'react';
import {View, Text, Image, StyleSheet, Alert} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from 'react-native-paper';

const DetailScreen = ({route}) => {
  const {name, price, material, color, image, stok} = route.params;
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.img}>
        <Image resizeMode="cover" source={{uri: image}} />
      </View>
      <View style={styles.title}>
        <Text style={{fontSize: 24, fontWeight: '700'}}>Rp {price}</Text>
        <Text style={{fontSize: 16, fontWeight: '600', marginTop: 4}}>
          {name}
        </Text>
      </View>
      <View style={styles.description}>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 16}}>
          Detail Produk
        </Text>
        <View style={styles.list}>
          <Text style={styles.listTitle}>Bahan</Text>
          <Text style={styles.listText}>{material}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listTitle}>Warna</Text>
          <Text style={styles.listText}>{color}</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.listTitle}>Stok</Text>
          <Text style={styles.listText}>{stok}</Text>
        </View>
        <View>
          <Text style={styles.describeExtra}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Repellendus corporis reiciendis quisquam vel hic recusandae suscipit
            laborum magni maiores commodi doloribus tempora unde nihil fugiat
            alias, pariatur ut explicabo eveniet.
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 8,
            marginVertical: 16,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Button
            icon="heart"
            mode="outlined"
            color="#FF8195"
            style={{
              borderRadius: 8,
              marginRight: 8,
              justifyContent: 'center',
              borderColor: '#FF8195',
            }}
            onPress={() => Alert.alert('clicked')}>
            Wishlist
          </Button>
          <Button
            mode="contained"
            color="#FF8195"
            labelStyle={{color: '#fff'}}
            style={{borderRadius: 8, flex: 0.8}}
            onPress={() => Alert.alert('clicked')}>
            Add to Cart
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  img: {
    backgroundColor: '#fff',
    height: 300,
    alignItems: 'center',
  },
  list: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
  },
  listTitle: {
    marginRight: 40,
  },
  listText: {
    color: '#6c757d',
  },
  title: {
    backgroundColor: '#fff',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginVertical: 1,
  },
  describeExtra: {
    lineHeight: 20,
    paddingVertical: 12,
    paddingHorizontal: 4,
  },
  description: {
    backgroundColor: '#fff',
    marginTop: 4,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default DetailScreen;
