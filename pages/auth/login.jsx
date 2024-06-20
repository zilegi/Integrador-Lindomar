import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, Image } from "react-native";
import styles from "./styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    AsyncStorage.setItem("token", token)
      .then(() => {
        if (token != null) {
          console.log("Token SignIn: ", token);
          console.log("Token Sucesso!");
        }
      })
      .catch((erro) => {
        console.error("O Erro é", erro);
      });
  }, [token]);

  const fatchToken = async () => {
    try {
      const response = await axios.post("https://gizile.pythonanywhere.com/api/token/", {
        username: user,
        password: pass,
      });
      console.log(response);
      console.log(response.data.access);
      setToken(response.data.access);
      navigation.navigate("Home");
    } catch (erro) {
      console.error("O Errro é: ", erro);
    }
  };

  return (
    <View style={styles.container}>
      <View>
      <Text style={styles.tituloprin}>✯Seja bem-vindo a pladaforma SmartCity!</Text>
      <Text style={styles.titulo}>Login</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="login"
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        placeholder="senha"
        onChangeText={setPass}
        value={pass}
      />
      <Pressable style={styles.botao} onPress={fatchToken}>
        <Text style={styles.texto}>Entrar</Text>
      </Pressable>
    </View>
  );
}
