import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, Linking } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { FocusAwareStatusBar } from "../global/component";
import url from "../global/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function CheckoutScreen({ navigation }) {
  const [products, setProducts] = useState("");
  const [profile, setProfile] = useState("");
  const [subTotal, setSubTotal] = useState(0);

  // Bank
  const [account, setAccount] = useState("");
  const [bank, setBank] = useState("");
  const [name, setName] = useState("");

  const updateAccount = (data) => {
    setAccount(data);
  };

  const updateBank = (data) => {
    setBank(data);
  };

  const updateName = (data) => {
    setName(data);
  };

  const checkout = () => {
    // Check data if ''
    if (account === "" || bank === "" || name === "") {
      Alert.alert("Error", "Pastikan semua masukan sudah terisi.");
    } else {
      Alert.alert("Konfirmasi", "Apakah anda yakin ingin melanjutkan transaksi?", [
          {
            text: "Batal",
            style: "cancel",
          },
          {
            text: "Konfirmasi",
            onPress: () => {
              const checkoutProcess = async () => {
                try {
                  const id = await AsyncStorage.getItem("user_id");
                  const data = {
                    user_id: id,
                    name: name,
                    accountNumber: account,
                    bankName: bank,
                  };
                  axios.post(url + "/api/checkout", data).then(res => {
                    if (res.data.msg == "success") {
                      navigation.reset({
                        index: 0,
                        routes: [
                          { name: "Tabs" },
                        ],
                      });
                    } else {
                      Alert.alert("Error", "Checkout gagal.");
                    }
                  });
                } catch (e) {
                  console.warn(e);
                }
              };
              checkoutProcess();
            },
          },
        ],
      );
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getData = async () => {
        try {
          const id = await AsyncStorage.getItem("user_id");
          const data = {
            user_id: id,
          };

          axios.get(url + "/api/billing", { params: data }).then(res => {
            setProducts(res.data.products);
            setProfile(res.data.user);

            // Sub total
            let total = 0;
            res.data.products.map(data => {
              total += (data.quantity * data.price);
            });
            setSubTotal(total);
          });
        } catch (e) {
          console.warn(e);
        }
      };
      getData();
    });
    return unsubscribe;
  }, []);


  return (
    <ScrollView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ShippingAddress data={profile} />
      <ItemTransaction data={products} subTotal={subTotal} />
      <Rekening />
      <InputBank account={updateAccount} bank={updateBank} name={updateName} />
      <Button
        mode="contained"
        color="#e87c80"
        style={{ elevation: 0, marginHorizontal: 16, marginTop: 12 }}
        onPress={checkout}
        labelStyle={{ color: "#fff" }}>
        Konfirmasi
      </Button>
      <Button
        mode="outlined"
        icon="whatsapp"
        color="#e87c80"
        onPress={() => Linking.openURL('https://wa.me/6285784197425')}
        style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 24 }}>
        Hubungi Admin
      </Button>
    </ScrollView>
  );
}

function ShippingAddress(props) {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Icon name="map-marker-outline" size={24} color="#e87c80" />
        <Text style={styles.title}>Alamat Pengiriman</Text>
      </View>
      <Text style={styles.shipContent}>
        {props.data.address}, Desa {props.data.village}, Kecamatan {props.data.district}, {props.data.city},
        Provinsi {props.data.province} {props.data.postal_code}
      </Text>
    </View>
  );
}

function ItemTransaction(props) {
  const data = Array.from(props.data);
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionHeader}>
        <Text>TRANSAKSI</Text>
      </View>
      {data.map((data) => {
        return (
          <View style={styles.listItem}>
            <Image
              source={{ uri: url + "/img/produk/" + data.image }}
              style={{ width: 50, height: 75 }}
              resizeMode="cover"
            />
            <View style={styles.listItemText}>
              <Text style={{ fontSize: 16 }}>{data.product_name}</Text>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rp {data.price}</Text>
              <Text>x{data.quantity}</Text>
            </View>
          </View>
        );
      })}
      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <View style={styles.textSubTot}>
          <Text>Subtotal</Text>
          <Text>Rp {props.subTotal}</Text>
        </View>
        <View style={styles.textSubTot}>
          <Text>Ongkos Kirim</Text>
          <Text>Rp 20000</Text>
        </View>
        <View style={[styles.textSubTot, { marginBottom: 0 }]}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total Bayar</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rp {props.subTotal + 20000}</Text>
        </View>
      </View>
    </View>
  );
}

function InputBank(props) {
  const updateBank = (value) => {
    props.bank(value);
  };

  const updateAccount = (value) => {
    props.account(value);
  };

  const updateName = (value) => {
    props.name(value);
  };
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Konfirmasi Pembayaran</Text>
      </View>
      <View style={{ marginTop: 8, marginStart: 8 }}>
        <TextInput mode="outlined" label="Bank Anda" onChangeText={(value) => updateBank(value)} />
        <TextInput mode="outlined" label="Nama (Sesuai Rekening)" onChangeText={(value) => updateName(value)} />
        <TextInput mode="outlined" label="Rekening" onChangeText={(value) => updateAccount(value)} />
      </View>
    </View>
  );
}

function Rekening() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Bank Transfer</Text>
      </View>
      <View style={{ marginStart: 9, marginTop: 8 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#6c757d" }}>
          BNI (Akhmad Nur Hidayatulloh)
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>89787654324</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shipContainer: {
    backgroundColor: "#fff",
    padding: 16,
    margin: 8,
    borderRadius: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginStart: 8,
    color: "#000",
  },
  shipContent: {
    marginStart: 30,
    marginTop: 8,
  },
  transactionContainer: {
    margin: 8,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  transactionHeader: {
    paddingHorizontal: 16,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
    paddingBottom: 8,
  },
  listItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  listItemText: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginStart: 12,
  },
  textSubTot: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
});

export default CheckoutScreen;
