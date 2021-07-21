import React, {useState, useEffect, useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import {
  FocusAwareStatusBar,
  deviceHeight,
  deviceWidth,
} from '../global/component';
import {IconButton} from 'react-native-paper';
import {Badge} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import url from '../global/url';

function WishlistScreen({navigation}) {
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getData = async () => {
        const id = await AsyncStorage.getItem('user_id');
        setUserId(id);
        const data = {
          user_id: id,
        };
        try {
          axios.get(url + '/api/wishlist', {params: data}).then(res => {
            setCart(res.data.data.cart);
            setProducts(res.data.data.products);
          });
        } catch (e) {
          console.warn(e);
        }
      };

      getData();
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <IconButton
            icon="shopping"
            size={26}
            color="#fff"
            style={{paddingEnd: 0, backgroundColor: '#e87c80'}}
            onPress={() => navigation.navigate('Cart', {screen: 'CartScreen'})}
          />
          {cart > 0 ? (
            <Badge
              value={cart}
              badgeStyle={{backgroundColor: '#000'}}
              containerStyle={{
                position: 'absolute',
                top: 9,
                right: 1,
              }}
            />
          ) : (
            <View></View>
          )}
        </View>
      ),
    });
  });

  const updateProduct = productId => {
    const temp = products.filter(product => {
      return product.product_id != productId;
    });

    setProducts(temp);
    ToastAndroid.showWithGravity(
      'Berhasil menghapus item dari Wishlist.',
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const updateCart = () => {
    try {
      axios.get(url + '/api/wishlist', {params: {user_id: userId}}).then(res => {
        setCart(res.data.data.cart);
      });
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={{backgroundColor: '#fff'}}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {products.length < 1 ? (
          <WishlistEmpty />
        ) : (
          products.map((data, key) => {
            return (
              <WishlistItem
                key={key}
                index={key}
                image={data.image}
                name={data.product_name}
                stock={data.stock}
                price={data.price}
                productId={data.product_id}
                onPress={() => {
                  navigation.navigate('Detail', {
                    screen: 'DetailScreen',
                    params: {
                      product_id: data.product_id,
                    },
                  });
                }}
                product={updateProduct}
                cart={updateCart}
              />
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

function WishlistEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Wishlist Kosong!</Text>
    </View>
  );
}

function WishlistItem(props) {
  const addToCart = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const data = {
        user_id: user_id,
      };
      axios.get(url + "/api/add-to-cart/" + props.productId, { params: data }).then(res => {
        if (res.data.msg == "success") {

          ToastAndroid.showWithGravity("Produk berhasil ditambahkan ke Keranjang Belanja", ToastAndroid.SHORT, ToastAndroid.TOP);
        } else {
          ToastAndroid.showWithGravity("Produk gagal ditambahkan ke Keranjang Belanja", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
        props.cart()
      });

    } catch (e) {
      console.warn(e);
    }
  };

  const removeWishlist = async () => {
    try {
      const user_id = await AsyncStorage.getItem('user_id');
      const data = {
        user_id: user_id,
      };
      axios
        .get(url + '/api/r-wishlist/' + props.productId, {
          params: data,
        })
        .then(res => {
          props.product(props.productId);
        });
    } catch (e) {
      console.warn(e.message);
    }
  };

  return (
    <View style={styles.list}>
      <TouchableOpacity onPress={props.onPress}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Image
            source={{uri: url + '/img/produk/' + props.image}}
            style={styles.listImage}
            resizeMode="cover"
          />
          <View style={styles.listContainerText}>
            <View>
              <Text style={{fontSize: 18}}>{props.name}</Text>
              <Text>Stok: {props.stock}</Text>
            </View>
            <View>
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                Rp {props.price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.listContainerButton}>
        <IconButton
          icon="trash-can-outline"
          size={26}
          color="#e87c80"
          onPress={removeWishlist}
        />
        <View
          style={{
            borderRadius: 20,
            padding: 9,
          }}>
          <Pressable
            onPress={addToCart}
            android_ripple={{
              color: 'rgba(232,124,128, 0.32)',
              radius: 30,
              borderless: true,
            }}>
            <Icon name="shopping-outline" size={26} color="#e87c80" />
            <Badge
              value="+"
              textStyle={{color: '#e87c80', fontWeight: 'bold'}}
              badgeStyle={{
                backgroundColor: '#fff',
              }}
              containerStyle={{
                position: 'absolute',
                bottom: -6,
                left: -1,
              }}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 2,
  },
  listImage: {width: 100, height: 150},
  listContainerText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginStart: 10,
  },
  listContainerButton: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default WishlistScreen;
