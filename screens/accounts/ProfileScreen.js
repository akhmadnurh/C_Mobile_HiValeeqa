import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, StyleSheet, Text, StatusBar, Button, TouchableOpacity, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/core";
import { Avatar, RadioButton } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import url from "../../url";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

function ProfileScreen({ navigation }) {
  const [userdata, setUserdata] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [noHP, setNoHP] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      try {
        const getProfile = async () => {
          const id = await AsyncStorage.getItem("user_id");
          setUserId(id);
          const data = {
            user_id: id,
          };
          axios.get(url + "/api/profile", { params: data }).then(res => {
            setUserdata(res.data.user);
            setGender(res.data.user.gender);
            setName(res.data.user.name);
            setEmail(res.data.user.email);
            setNoHP(res.data.user.whatsapp);
          });
        };
        getProfile();
      } catch (err) {
        console.warn(err.message);
      }
    });
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={updateProfile}>
          <Text style={{ color: "#fff" }}>Simpan</Text>
        </TouchableOpacity>
      ),
    });
  });

  const updateProfile = () => {
    const data = {
      user_id: userId,
      name: name,
      email: email,
      nohp: noHP,
      gender: gender,
    };
    // console.log(data)
    try {
      axios.post(url + "/api/profile", data).then(res => {
        if (res.data.msg == "success") {
          Alert.alert("", "Data berhasil diperbarui.");
        } else {
          Alert.alert("", "Data berhasil diperbarui.");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: "#e87c80" }}>
      <FocusAwareStatusBar barStyle="light-content" backgroundColor="#e87c80" />
      <View style={styles.containerAvatar}>
        <Avatar.Icon icon="folder" size={80} />
      </View>
      <View style={styles.curves} />
      <View style={styles.container}>
        <Input
          label="Username"
          disabled={true}
          disabledInputStyle={{
            color: "#000",
            fontWeight: "normal",
            fontSize: 18,
          }}
          labelStyle={{ color: "#dedede" }}
          inputContainerStyle={{
            borderBottomColor: "#fff",
            paddingBottom: 0,
          }}
          value={userdata.username}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Nama Lengkap"
          labelStyle={{ color: "#dedede" }}
          inputContainerStyle={{
            borderBottomColor: "#dedede",
          }}
          value={name} onChangeText={(value) => setName(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="Email"
          labelStyle={{ color: "#dedede" }}
          inputContainerStyle={{
            borderBottomColor: "#dedede",
          }}
          value={email} onChangeText={(value) => setEmail(value)}
        />
      </View>
      <View style={styles.container}>
        <Input
          label="No. Hp"
          labelStyle={{ color: "#dedede" }}
          inputContainerStyle={{
            borderBottomColor: "#dedede",
            marginBottom: 0,
          }}
          value={noHP} onChangeText={(value) => setNoHP(value)}
        />
      </View>
      <View
        style={[styles.container, { paddingHorizontal: 20, paddingBottom: 30 }]}>
        <View>
          <Text style={styles.label}>Jenis Kelamin</Text>
          <RadioButton.Group
            onValueChange={value => setGender(value)}
            value={gender}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton color="#e87c80" value="L" />
              <Text>Laki - Laki</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton color="#e87c80" value="P" />
              <Text>Perempuan</Text>
            </View>
          </RadioButton.Group>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  container1: {
    paddingVertical: 16,
    backgroundColor: "#fff",
    paddingBottom: 16,
  },
  containerAvatar: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontWeight: "bold",
    color: "#dedede",
    marginBottom: 8,
  },
  curves: {
    height: 40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default ProfileScreen;
