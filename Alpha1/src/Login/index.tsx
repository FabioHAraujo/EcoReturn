import React, { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebase/connection';
import { getAuth, fetchSignInMethodsForEmail } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [email, setEmail] = useState("");

  const handleEmailSubmit = async () => {
    const auth = getAuth();
    try {
      const methods = await fetchSignInMethodsForEmail(auth, email);
      if (methods.length > 0) {
        // Email already registered
        navigation.navigate('SignIn', { email });
      } else {
        // New email
        navigation.navigate('SignUp', { email });
      }
    } catch (error) {
      console.error(error);
      alert('Ocorreu um erro. Por favor, tente novamente.');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../../assets/background.png")}
        style={styles.background}
      >
        <LinearGradient
          colors={["transparent", "#000"]}
          style={styles.gradient}
        />
        <LinearGradient
          colors={["#000", "transparent"]}
          style={styles.gradientTop}
        />
        <View style={styles.logoContainer}>
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="recycle" size={24} color="#229954" />
            <Text style={[styles.logoTitle, styles.logoText]}>EcoReturn</Text>
          </View>
          <Text style={[styles.logoSubtitle, styles.logoText]}>RECICLANDO</Text>
          <Text style={[styles.logoSubtitle, styles.logoText]}>O FUTURO</Text>
        </View>
        <View style={styles.loginContainer}>
          <View style={{width: '100%'}}>
            <Text style={[styles.acessText, styles.logoText]}>Acesse</Text>
          </View>
          <Text style={styles.textLogin}>Faça Login ou Cadastre-se Utilizando Seu E-mail</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A4A4A4"
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleEmailSubmit}>
            <LinearGradient
              colors={["#501794", "#3E70A1"]}
              style={styles.gradientBotao}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.buttonText}>Acessar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "80%",
  },
  gradientTop:{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0, // Alterado de bottom para top
    height: "20%", // Alterado para 20% da altura da tela
  },
  logoContainer: {
    position: "absolute",
    top: 20,
    left: 20,
    marginTop: 30,
  },
  logoText: {
    fontFamily: "Poppins-Black",
    color: "white", // Altere para a cor desejada
  },
  logoTitle: {
    fontSize: 17,
    marginLeft: 10
  },
  logoSubtitle: {
    fontSize: 7,
    fontWeight: 'bold',
    marginLeft: 80,
    marginTop: -5,
    padding: 2
  },
  loginContainer: {
    marginTop: -100,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: '85%',
    backgroundColor: "#190733",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: 'white',
  },
  button: {
    backgroundColor: "#229954",
    borderRadius: 15,
    width: '85%',
    height: 50,
  },
  gradientBotao: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: "100%", // Ocupa 100% do TouchableOpacity
    height: 50,
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-Black",
    textAlign: 'center',
  },
  acessText:{
    fontSize: 62,
    marginLeft: '8%'
  },
  textLogin:{
    color: '#fff',
    width: '85%',
    fontFamily: 'Poppins-Black',
    fontWeight: 'bold',
    marginBottom: 15,
  }
});

export default Login;