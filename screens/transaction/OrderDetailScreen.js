import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { deviceHeight, deviceWidth, FocusAwareStatusBar } from "../../global/component";
import url from "../../global/url";
import axios from "axios";
import Animated from "react-native-reanimated";

// import addWhitelistedNativeProps from "module:react-native-reanimated.Animated.addWhitelistedNativeProps";

function OrderDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      axios.get(url + "/api/transaction/detail/" + id).then(res => {
        setProducts(res.data.products);
      }).catch(e => {
        console.warn(e);
      }).finally(() => {
        setLoading(false);
      });
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      {/*<StatusOrder status={status}/>*/}
      {/*<ShippingAddress />*/}
      <ItemTransaction data={products}/>
      {/* <NoResi /> */}
      <Rekening />
      {/* <InputBank /> */}
      {/* <Button
        mode="contained"
        color="#e87c80"
        style={{elevation: 0, marginHorizontal: 16, marginTop: 12}}
        labelStyle={{color: '#fff'}}>
        Konfirmasi
      </Button> */}
      <Button
        mode="outlined"
        icon="whatsapp"
        color="#e87c80"
        style={{ marginHorizontal: 16, marginTop: 12, marginBottom: 24 }}>
        Hubungi Admin
      </Button>
    </ScrollView>
  );
}

function StatusOrder(props) {
  return (
    <View style={[styles.shipContainer, { backgroundColor: "#fae4e5" }]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{props.status}</Text>
        {/* <Text style={styles.title}>Barang Dikemas</Text>
        <Text style={styles.title}>Proses Dikirim</Text>
        <Text style={styles.title}>Selesai</Text>
        <Text style={styles.title}>Gagal</Text> */}
      </View>
    </View>
  );
}

function NoResi() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>No. Resi: JNT123456789</Text>
      </View>
    </View>
  );
}

function ShippingAddress() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Icon name="map-marker-outline" size={24} color="#e87c80" />
        <Text style={styles.title}>Alamat Pengiriman</Text>
      </View>
      <Text style={styles.shipContent}>
        Jl. Mastrip No.164, Krajan Timur, Sumbersari, Kec. Sumbersari, Kabupaten
        Jember, Jawa Timur 68121
      </Text>
    </View>
  );
}

function ItemTransaction(props) {
  let t = 0
  return (
    <View style={styles.transactionContainer}>
      <View style={styles.transactionHeader}>
        <Text>#1</Text>
      </View>
      {props.data.map(data => {
        t += (data.price * data.count)
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
              <Text>x{data.count}</Text>
            </View>
          </View>
        )
      })}

      <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
        <View style={styles.textSubTot}>
          <Text>Subtotal</Text>
          <Text>Rp {t}</Text>
        </View>
        <View style={styles.textSubTot}>
          <Text>Ongkos Kirim</Text>
          <Text>Rp 20000</Text>
        </View>
        <View style={[styles.textSubTot, { marginBottom: 0 }]}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Total Bayar</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Rp {t+20000}</Text>
        </View>
      </View>
    </View>
  );
}

function InputBank() {
  return (
    <View style={styles.shipContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Konfirmasi Pembayaran</Text>
      </View>
      <View style={{ marginTop: 8, marginStart: 8 }}>
        <TextInput mode="outlined" label="Bank Anda" />
        <TextInput mode="outlined" label="Nama (Sesuai Rekening)" />
        <TextInput mode="outlined" label="Rekening" />
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
  loading: {
    flex: 1,
    height: deviceHeight / 2,
    width: deviceWidth,
    alignItems: "center",
    justifyContent: "flex-end",
  },
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

export default OrderDetailScreen;
