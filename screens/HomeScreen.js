import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import { Badge, Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/core";
import url from "../global/url";
import axios from "axios";
import { IconButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FocusAwareStatusBar } from "../global/component";

function HomeScreen({ navigation }) {
  const [data, setData] = useState("");
  const [cart, setCart] = useState("");
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getProducts = async () => {
        const id = await AsyncStorage.getItem("user_id");
        const data = {
          user_id: id,
        };
        try {
          axios.get(url + "/api/shop", { params: data }).then(res => {
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
    const unsubscribe = navigation.addListener("focus", () => {
      navigation.setOptions({
        headerRight: () => (
          <View>
            <IconButton
              icon="shopping-outline"
              size={26}
              color="#e87c80"
              style={{ paddingEnd: 0, backgroundColor: "#fff" }}
              onPress={() => console.log("Pressed")}
            />
            {cart > 0 ? (
              <Badge
                value={cart}
                badgeStyle={{ backgroundColor: "#000" }}
                containerStyle={{
                  position: "absolute",
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
    return unsubscribe;
  });

  return (
    <SafeAreaView>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#fff" />
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: "center" }}
        style={styles.container}
        data={data}
        numColumns={2}
        ListFooterComponent={<View style={{ height: 30 }} />}
        ListHeaderComponent={() => (
          <Text style={styles.title}>Produk Terbaru</Text>
        )}
        renderItem={({ item }) => (
          <Card containerStyle={styles.card}>
            <Pressable
              style={{ padding: 24 }}
              android_ripple={{ color: "#f2f2f2" }}
              onPress={() =>
                navigation.navigate("Detail", {
                  screen: "DetailScreen",
                  params: {
                    product_id: item.product_id,
                  },
                })
              }>
              <Card.Image
                style={{ width: 120, borderRadius: 10 }}
                source={{ uri: url + "/img/produk/" + item.image }}
              />
              <Card.Title style={{ marginTop: 8, marginBottom: 0 }}>
                {item.product_name}
              </Card.Title>
              <Card.Title style={{ marginTop: 8, marginBottom: 0 }}>
                Rp {item.price}
              </Card.Title>
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
    fontWeight: "bold",
  },
  card: {
    elevation: 0,
    borderWidth: 0,
    borderRadius: 16,
    padding: 0,
    margin: 8,
  },
});

export default HomeScreen;
