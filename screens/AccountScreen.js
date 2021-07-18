import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Alert,
  Linking,
} from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function AccountScreen({ navigation }) {
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        const getUserdata = async () => {
          const user_id = await AsyncStorage.getItem("user_id");
          const data = {
            user_id: JSON.parse(user_id),
          };
          axios.get("http://10.0.2.2:8000/api/profile", { params: data }).then(res => {
            setUserdata(res.data.user);
            console.log(res.data.user);
          });
        };

        getUserdata();
      } catch (e) {
        console.warn(e.message);
      }
    });
    return unsubscribe;
  }, []);

  const logout = () => {
    AsyncStorage.clear();
    navigation.navigate("Login");
  };

  const pressContoh = () => {
    return Alert.alert("Ini contoh", "Berhasih di klik");
  };

  return (
    <View style={{ backgroundColor: "#e87c80" }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={styles.container}>
        <Avatar.Icon size={50} icon="folder" />
        <View style={styles.personName}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#fff" }}>
            {userdata.name}
          </Text>
          <Text style={{ fontWeight: "400", color: "#fff" }}>{userdata.email}</Text>
        </View>
      </View>
      <View style={styles.curves} />
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Profil</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Alamat Pengiriman</Text>
        <Icon name="chevron-forward-outline" size={22} color="#dedede" />
      </Pressable>
      <Pressable
        style={styles.list}
        onPress={pressContoh}
        android_ripple="#eee">
        <Text>Ganti Password</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL("https://wa.me/6285784197425")}
        android_ripple="#eee">
        <Icon name="logo-whatsapp" size={22} style={{ marginEnd: 8 }} />
        <Text>Chat Admin</Text>
      </Pressable>
      <Pressable
        style={styles.list2}
        onPress={() => Linking.openURL("https://www.instagram.com/hi.valeeqa/")}
        android_ripple="#eee">
        <Icon name="logo-instagram" size={22} style={{ marginEnd: 8 }} />
        <Text>Instagram</Text>
      </Pressable>
      <View style={styles.divider} />
      <Pressable
        style={styles.list2}
        onPress={logout}
        android_ripple="#eee">
        <Text style={{ color: "#dc3545" }}>Logout</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    marginBottom: 30,
    flexDirection: "row",
  },
  personName: {
    marginLeft: 12,
  },
  list: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  list2: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomColor: "#eeeeee",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  divider: {
    height: 5,
    backgroundColor: "#eee",
  },
  curves: {
    height: 40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default AccountScreen;
