import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/connection";
import { LinearGradient } from "expo-linear-gradient";

const SignIn = ({ route }) => {
  const { email } = route.params;
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <LinearGradient
          colors={["#501794", "#3E70A1"]}
          style={styles.gradientBotao}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Login</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  button: {
    width: "100%",
    height: 50,
  },
  gradientBotao: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    width: "100%",
    height: 50,
  },
  buttonText: {
    color: "white",
  },
});

export default SignIn;