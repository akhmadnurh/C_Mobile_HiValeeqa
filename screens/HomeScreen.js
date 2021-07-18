import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  StatusBar,
} from "react-native";
import { Card } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { useIsFocused } from "@react-navigation/core";
import url from "../url";
import axios from "axios";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function HomeScreen({ navigation }) {
  const [data, setData] = useState();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      axios.get(url+"/api/shop").then(res => {
        setData(res.data.products);
      });
    });



    return unsubscribe;
  }, []);

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
                source={{ uri: url+"/img/produk/" + item.image }}
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
    margin: 0,
    borderWidth: 0,
    borderRadius: 16,
    padding: 0,
    margin: 8,
  },
});

export default HomeScreen;
