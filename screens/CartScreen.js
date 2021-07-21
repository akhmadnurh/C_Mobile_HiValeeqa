import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Pressable, TouchableOpacity, Alert, ToastAndroid,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import {
  FocusAwareStatusBar,
  deviceHeight,
  deviceWidth,
} from "../global/component";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import url from "../global/url";

function CartScreen({ navigation }) {
  const [userId, setUserId] = useState("");
  const [products, setProducts] = useState([]);
  const [available, setAvailable] = useState("");
  const [checkoutStatus, setCheckoutStatus] = useState("");
  const [total, setTotal] = useState("");

  useEffect(() => {
    const unsubsribe = navigation.addListener("focus", () => {
      const getData = async () => {
        try {
          const id = await AsyncStorage.getItem("user_id");
          setUserId(id);
          const data = {
            user_id: id,
          };

          axios.get(url + "/api/cart", { params: data }).then(res => {
            setProducts(res.data.products.products);
            setAvailable(res.data.products.available);
            setCheckoutStatus(res.data.products.checkout_status);

            // Set total
            let total = 0;
            res.data.products.products.map((data, key) => {
              total += (data.quantity * data.price);
            });
            setTotal(total);
          });
        } catch (e) {
          console.log(e);
        }
      };
      getData();
    });

    return unsubsribe;
  });

  const updateProduct = (productId) => {
    const temp = products.filter(product => {
      return product.product_id != productId;
    });

    setProducts(temp);

    // update checkout status
    updateCheckoutStatus(temp);

    ToastAndroid.showWithGravity(
      "Berhasil menghapus item dari Keranjang Belanja.",
      ToastAndroid.SHORT,
      ToastAndroid.TOP,
    );
  };

  const updateCheckoutStatus = (products) => {
    let temp = products.filter((data) => {
      return data.stock < 1;
    });
    const status = temp.length > 0 ? 0 : 1;
    setCheckoutStatus(status);
  };

  const updateTotal = (result, method) => {
    let totalTemp = total;
    if (method == "plus") {
      setTotal(totalTemp + result);
    } else {
      setTotal(totalTemp - result);
    }
  };

  const removeAllCart = () => {
    Alert.alert("Hapus Semua", "Apakah anda yakin ingin menghapus semua keranjang belanja?", [
      {
        text: "Batal",
        style: "cancel",
      },
      {
        text: "Hapus",
        onPress: () => {
          try {
            const data = {
              user_id: userId,
            };
            axios.get(url + "/api/remove-all-cart", { params: data }).then(res => {
              if (res.data.msg == "success") {
                setProducts("");
                Alert.alert("Success", "Semua item di keranjang belanja berhasil dihapus.");
              } else {
                Alert.alert("Error", "Gagal menghapus semua data.");
              }
            });
          } catch (e) {
            console.warn(e);
          }
        },
      },
    ]);
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {products.length < 1 ? (
          <CartEmpty />
        ) : (
          products.map((data, key) => {
            return (
              <CartItem key={key} data={data} index={key}
                        onPress={() => navigation.navigate("Detail", {
                          screen: "DetailScreen",
                          params: { product_id: data.product_id },
                        })} updateProduct={updateProduct} updateTotal={updateTotal} />
            );
          })
        )}
      </ScrollView>
      <View style={styles.containerBtn}>
        <Text style={styles.textTotal}>Total: Rp {total}</Text>
        <View style={{ flexDirection: "row" }}>
          {products.length < 1 ? (
            <Button
              disabled={true}
              mode="outlined"
              color="#e87c80"
              labelStyle={{ color: "#e87c80" }}
              onPress={removeAllCart}
              style={styles.btnDeleteAll}>
              Hapus Semua
            </Button>
          ) : (
            <Button
              mode="outlined"
              color="#e87c80"
              labelStyle={{ color: "#e87c80" }}
              onPress={removeAllCart}
              style={styles.btnDeleteAll}>
              Hapus Semua
            </Button>
          )}
          {checkoutStatus === 1 ? (
            <Button
              mode="contained"
              color="#e87c80"
              labelStyle={{ color: "#fff" }}
              onPress={() => navigation.navigate("Checkout")}
              style={styles.btnCheckout}>
              Checkout
            </Button>
          ) : (
            <Button
              disabled
              mode="contained"
              color="#e87c80"
              labelStyle={{ color: "#fff" }}
              style={styles.btnCheckout}>
              Checkout
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

function CartEmpty() {
  return (
    <View style={styles.empty}>
      <Text>Cart Kosong!</Text>
    </View>
  );
}

function CartItem(props) {
  const [quantity, setQuantity] = useState(props.data.quantity);
  const plusItem = () => {
    const updateData = async () => {
      const data = {
        user_id: await AsyncStorage.getItem("user_id"),
      };
      await axios.get(url + "/api/plus-item-cart/" + props.data.product_id, { params: data }).then(res => {
        if (res.data.msg == "success") {
          setQuantity(quantity + 1);
          props.updateTotal(props.data.price, "plus");
        } else {
          ToastAndroid.showWithGravity("Stok tidak cukup.", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
      });
    };

    updateData();
  };

  const minusItem = () => {
    const updateData = async () => {
      const data = {
        user_id: await AsyncStorage.getItem("user_id"),
      };
      await axios.get(url + "/api/minus-item-cart/" + props.data.product_id, { params: data }).then(res => {
        if (res.data.msg == "success") {
          setQuantity(quantity - 1);
          props.updateTotal(props.data.price, "minus");
        } else {
          ToastAndroid.showWithGravity("Tidak boleh kurang dari 1.", ToastAndroid.SHORT, ToastAndroid.TOP);
        }
      });
    };

    updateData();
  };

  const removeCart = async () => {
    try {
      const data = {
        user_id: await AsyncStorage.getItem("user_id"),
      };
      axios
        .get(url + "/api/remove-cart/" + props.data.product_id, {
          params: data,
        })
        .then(res => {
          props.updateProduct(props.data.product_id);
        });
    } catch (e) {
      console.warn(e.message);
    }
    props.updateProduct(props.data.product_id);
  };

  return (
    <View style={styles.list}>
      <View style={{ flexDirection: "row" }}>
        <Image
          source={{ uri: url + "/img/produk/" + props.data.image }}
          style={styles.listImage}
          resizeMode="cover"
        />
        <View style={styles.listContainerText}>
          <TouchableOpacity onPress={props.onPress}>
            <View>
              <Text style={{ fontSize: 18 }}>{props.data.product_name}
                {props.data.stock < 1 ? (
                  <Text style={{ fontSize: 16 }}> |<Text style={{ color: "#dc3545" }}> Kosong</Text></Text>
                ) : (<View></View>)}
              </Text>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Rp {props.data.price}</Text>
            </View>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.btnWrap, { borderRightWidth: 0 }]}>
              {props.data.stock < 1 ? (
                <Pressable
                  disabled={true}
                  android_ripple={{
                    color: "rgba(232,124,128, 0.26)",
                    borderless: true,
                    radius: 30,
                  }}
                  onPress={minusItem}>
                  <Icon name="minus" size={15} color="#e87c80" />
                </Pressable>
              ) : (
                <Pressable
                  android_ripple={{
                    color: "rgba(232,124,128, 0.26)",
                    borderless: true,
                    radius: 30,
                  }}
                  onPress={minusItem}>
                  <Icon name="minus" size={15} color="#e87c80" />
                </Pressable>
              )}
            </View>
            <Text style={styles.inputQty}>{quantity}</Text>
            <View style={[styles.btnWrap, { borderLeftWidth: 0 }]}>
              {props.data.stock < 1 ? (
                <Pressable
                  disabled={true}
                  android_ripple={{
                    color: "rgba(232,124,128, 0.26)",
                    borderless: true,
                    radius: 30,
                  }}
                  onPress={plusItem}>
                  <Icon name="plus" size={15} color="#e87c80" />
                </Pressable>
              ) : (
                <Pressable
                  android_ripple={{
                    color: "rgba(232,124,128, 0.26)",
                    borderless: true,
                    radius: 30,
                  }}
                  onPress={plusItem}>
                  <Icon name="plus" size={15} color="#e87c80" />
                </Pressable>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listContainerButton}>
        <IconButton
          icon="trash-can-outline"
          color="#e87c80"
          size={24}
          onPress={removeCart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    height: deviceHeight,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderBottomColor: "#eee",
    borderBottomWidth: 2,
  },
  listImage: { width: 100, height: 150 },
  listContainerText: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginStart: 10,
  },
  listContainerButton: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  btnWrap: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: "#e87c80",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputQty: {
    paddingVertical: 1,
    paddingHorizontal: 8,
    borderColor: "#e87c80",
    borderWidth: 1,
    width: 50,
    textAlign: "center",
  },
  containerBtn: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    elevation: 5,
  },
  textTotal: {
    marginBottom: 8,
    fontWeight: "bold",
    fontSize: 20,
  },
  btnCheckout: { borderRadius: 8, flex: 0.6, elevation: 0 },
  btnDeleteAll: {
    borderRadius: 8,
    flex: 0.4,
    elevation: 0,
    marginEnd: 8,
    borderColor: "#e87c80",
  },
});

export default CartScreen;
