import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/connection";

const SignUp = ({ route }) => {
  const { email } = route.params;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Senhas não coincidem.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro. Por favor, tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome Completo"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Idade"
        value={age}
        onChangeText={setAge}
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="CEP"
        value={zipCode}
        onChangeText={setZipCode}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirmar Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <LinearGradient
          colors={["#501794", "#3E70A1"]}
          style={styles.gradientBotao}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
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

export default SignUp;