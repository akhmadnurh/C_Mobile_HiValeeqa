import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Dimensions,
  Alert,
  Linking,
  TouchableOpacity, View,
} from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    try {
      const isLoggedIn = async () => {
        const value = await AsyncStorage.getItem("isLoggedIn");
        if (value !== null) {
          navigation.navigate("Tabs");
        }
      };
      isLoggedIn();
    } catch (error) {
      console.log(error);
    }
  }, [navigation]);

  const submitData = () => {
    const data = {
      userEmail: username,
      password: password,
    };
    axios.post("http://10.0.2.2:8000/api/login", data).then(res => {
      if (res.data.msg == "user") {
        AsyncStorage.setItem("user_id", JSON.stringify(res.data.userdata.user_id));
        AsyncStorage.setItem("email", res.data.userdata.email);
        AsyncStorage.setItem("password", res.data.userdata.password);
        AsyncStorage.setItem("role", JSON.stringify(res.data.userdata.role));
        AsyncStorage.setItem("isLoggedIn", "1");
        navigation.navigate("Tabs");
      } else if (res.data.msg == "error-verification") {
        Alert.alert("Login Failed", "Email belum diverifikasi");
      } else {
        Alert.alert("Login Failed", "Username/Password salah");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Input
        inputContainerStyle={styles.input}
        placeholder="Username/Email"
        leftIcon={<Icon name="person" size={20} color="#ccc" />} onChangeText={(value) => setUsername(value)} />
      <Input
        inputContainerStyle={styles.input} secureTextEntry={true}
        placeholder="Password"
        leftIcon={<Icon name="lock-closed" size={20} color="#ccc" secureTextEntry={true} />}
        onChangeText={(value) => setPassword(value)}
      />
      <Button
        mode="contained"
        color="#FF8195"
        labelStyle={{ color: "#fff" }}
        onPress={submitData}>
        Login
      </Button>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <Text>Belum Punya Akun? </Text>
        <TouchableOpacity
          onPress={() => Linking.openURL("http://10.0.2.2:8000/register")}>
          <Text style={{ color: "#FF8195" }}>Daftar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

let deviceWidth = Dimensions.get("window").width;
let deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 90,
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
});

export default LoginScreen;
