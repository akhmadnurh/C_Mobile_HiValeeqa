import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Card} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import DetailScreen from './DetailScreen';

function HomeScreen({navigation}) {
  const [data, setData] = useState([
    {
      id: 1,
      name: 'Yumna Dress 1',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      id: 2,
      name: 'Yumna Dress 2',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      id: 3,
      name: 'Yumna Dress 3',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      id: 4,
      name: 'Yumna Dress 4',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      id: 5,
      name: 'Yumna Dress 5',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
    {
      id: 6,
      name: 'Yumna Dress 6',
      price: 120000,
      material: 'Katun',
      color: 'Pink',
      stok: 10,
      image:
        'https://images.unsplash.com/photo-1626322751504-930506dd41ca?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
    },
  ]);

  return (
    <SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'center'}}
        style={styles.container}
        data={data}
        numColumns={2}
        ListFooterComponent={<View style={{height: 30}} />}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Produk Terbaru</Text>
        )}
        renderItem={({item}) => (
          <Card containerStyle={styles.card}>
            <Pressable
              style={{padding: 24}}
              android_ripple={{color: '#f2f2f2'}}
              onPress={() =>
                navigation.navigate('Detail', {
                  screen: 'DetailScreen',
                  params: {
                    name: item.name,
                    price: item.price,
                    material: item.material,
                    color: item.color,
                    image: item.image,
                    stok: item.stok,
                  },
                })
              }>
              <Card.Image
                style={{width: 120, borderRadius: 10}}
                source={{uri: item.image}}
              />
              <Card.Title style={{marginTop: 8, marginBottom: 0}}>
                {item.name}
              </Card.Title>
              <Card.Title style={{marginTop: 8, marginBottom: 0}}>
                Rp {item.price}
              </Card.Title>
            </Pressable>
          </Card>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    elevation: 0,
    margin: 0,
    borderWidth: 0,
    borderRadius: 16,
    padding: 0,
    margin: 8,
  },
});

export default HomeScreen;
