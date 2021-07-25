import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ImageBackground,
  SectionList,
} from 'react-native';
import {Badge, Card} from 'react-native-elements';
import {SafeAreaView} from 'react-native-safe-area-context';
import url from '../global/url';
import axios from 'axios';
import {Chip, IconButton} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FocusAwareStatusBar, Prices} from '../global/component';
import {ScrollView} from 'react-native-gesture-handler';

function HomeScreen({navigation}) {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getProducts = async () => {
        const id = await AsyncStorage.getItem('user_id');
        const data = {
          user_id: id,
        };
        try {
          axios.get(url + '/api/shop', {params: data}).then(res => {
            setData(res.data.products);
            setCart(res.data.cart);
          });
        } catch (e) {
          console.warn(e);
        }
      };

      getProducts();
    });
    return unsubscribe;
  }, []);

  // Badge
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <IconButton
            icon="shopping-outline"
            size={26}
            color="#e87c80"
            style={{paddingEnd: 0, backgroundColor: '#fff'}}
            onPress={() => navigation.navigate('Cart', {screen: 'CartScreen'})}
          />
          {cart < 1 ? (
            <View></View>
          ) : (
            <Badge
              value={cart}
              badgeStyle={{backgroundColor: '#000'}}
              containerStyle={{
                position: 'absolute',
                top: 9,
                right: 1,
              }}
            />
          )}
        </View>
      ),
    });
  });

  return (
    <SafeAreaView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/* <View style={{flex: 1, flexDirection: 'row'}}>
        {data.map((item, key) => {
          return (
            <Card key={key} containerStyle={styles.card}>
              <Pressable
                style={{padding: 0}}
                android_ripple={{color: '#f2f2f2'}}
                onPress={() =>
                  navigation.navigate('Detail', {
                    screen: 'DetailScreen',
                    params: {
                      product_id: item.product_id,
                    },
                  })
                }>
                <Card.Image
                  resizeMode="cover"
                  style={styles.cardImage}
                  source={{uri: url + '/img/produk/' + item.image}}
                />
                <Card.Title style={{marginTop: 8, marginBottom: 0}}>
                  {item.product_name}
                </Card.Title>
                <Prices
                  value={item.price}
                  renderText={value => (
                    <Card.Title style={{marginVertical: 8}}>{value}</Card.Title>
                  )}
                />
              </Pressable>
            </Card>
          );
        })}
      </View> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        style={styles.container}
        data={data}
        numColumns={2}
        ListFooterComponent={<View style={{height: 30}} />}
        ListHeaderComponent={() => (
          <View>
            <Text style={styles.title}>Produk Terbaru</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{flexDirection: 'row', marginBottom: 30}}>
              {data.map((item, key) => {
                return (
                  <ImageBackground
                    key={key}
                    resizeMode="cover"
                    source={{uri: url + '/img/produk/' + item.image}}
                    style={styles.imageBg}
                    imageStyle={{
                      borderRadius: 20,
                    }}>
                    <Pressable
                      android_ripple={{color: 'rgba(255,255,255,.32)'}}
                      onPress={() =>
                        navigation.navigate('Detail', {
                          screen: 'DetailScreen',
                          params: {
                            product_id: item.product_id,
                          },
                        })
                      }>
                      <View style={styles.titleContainer}>
                        <Text style={styles.productTop}>
                          {item.product_name}
                        </Text>
                        <Prices
                          value={item.price}
                          renderText={value => (
                            <View style={styles.priceContainer}>
                              <Text style={styles.priceText}>{value}</Text>
                            </View>
                          )}
                        />
                      </View>
                    </Pressable>
                  </ImageBackground>
                );
              })}
            </ScrollView>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Semua</Text>
            </View>
          </View>
        )}
        renderItem={({item}) => (
          <Card containerStyle={styles.card}>
            <Pressable
              style={{padding: 0}}
              android_ripple={{color: '#f2f2f2'}}
              onPress={() =>
                navigation.navigate('Detail', {
                  screen: 'DetailScreen',
                  params: {
                    product_id: item.product_id,
                  },
                })
              }>
              <Card.Image
                resizeMode="cover"
                style={styles.cardImage}
                source={{uri: url + '/img/produk/' + item.image}}
              />
              <Card.Title
                style={{marginTop: 8, marginBottom: 0, fontWeight: 'normal'}}>
                {item.product_name}
              </Card.Title>
              <Prices
                value={item.price}
                renderText={value => (
                  <Card.Title style={{marginVertical: 8}}>{value}</Card.Title>
                )}
              />
            </Pressable>
          </Card>
        )}
        keyExtractor={item => item.product_id}
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
    marginBottom: 12,
  },
  card: {
    elevation: 0,
    borderWidth: 0,
    borderRadius: 16,
    padding: 0,
    marginHorizontal: 4,
    marginVertical: 8,
  },
  cardImage: {
    width: 174,
    height: 240,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageBg: {
    width: 168,
    height: 252,
    marginEnd: 20,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 24,
    paddingBottom: 18,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(0,0,0,.15)',
    borderRadius: 20,
  },
  productTop: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  priceContainer: {
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: 10,
    marginEnd: 20,
  },
  priceText: {
    marginHorizontal: 16,
    marginVertical: 6,
    fontWeight: 'bold',
  },
  chip: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 16,
    width: '25%',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  chipText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
