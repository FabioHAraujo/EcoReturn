import React, { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import estilosLogin from "./LoginStyles";
import { ref, get } from "firebase/database";
import { database } from "../firebase/connection";

const Login = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    if (email.trim() !== "") {
      const usersRef = ref(database, "usuarios");
      get(usersRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            let userExists = false;
            snapshot.forEach((childSnapshot) => {
              const userData = childSnapshot.val();
              if (userData.email === email) {
                userExists = true;
                return true; // Encontrou, sair do loop
              }
            });

            if (userExists) {
              navigation.navigate("PasswordScreen", { email: email });
            } else {
              navigation.navigate("Register", { email: email });
            }
          } else {
            navigation.navigate("Register", { email: email });
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    } else {
      alert("Por favor, preencha seu e-mail.");
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={estilosLogin.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../../assets/background.png")}
        style={estilosLogin.background}
      >
        <LinearGradient
          colors={["transparent", "#000"]}
          style={estilosLogin.gradient}
        />
        <LinearGradient
          colors={["#000", "transparent"]}
          style={estilosLogin.gradientTop}
        />
        <View style={estilosLogin.logoContainer}>
          <View style={{ flexDirection: "row" }}>
            <FontAwesome name="recycle" size={24} color="#229954" />
            <Text style={[estilosLogin.logoTitle, estilosLogin.logoText]}>
              EcoReturn
            </Text>
          </View>
          <Text style={[estilosLogin.logoSubtitle, estilosLogin.logoText]}>
            RECICLANDO
          </Text>
          <Text style={[estilosLogin.logoSubtitle, estilosLogin.logoText]}>
            O FUTURO
          </Text>
        </View>
        <View style={estilosLogin.loginContainer}>
          <View style={{ width: "100%" }}>
            <Text style={[estilosLogin.acessText, estilosLogin.logoText]}>
              Acesse
            </Text>
          </View>
          <Text style={estilosLogin.textLogin}>
            Faça login ou cadastre-se utilizando seu e-mail
          </Text>
          <View style={estilosLogin.inputContainer}>
            <FontAwesome
              name="envelope"
              size={20}
              color="#ccc"
              style={estilosLogin.inputIcon}
            />
            <TextInput
              style={estilosLogin.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A4A4A4"
              onChangeText={(text) => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
          </View>
          <TouchableOpacity
            style={estilosLogin.button}
            onPress={handleEmailSubmit}
          >
            <LinearGradient
              colors={["#501794", "#3E70A1"]}
              style={estilosLogin.gradientBotao}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={estilosLogin.buttonText}>Acessar</Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* Botões de Login Social */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
              <FontAwesome name="google" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
              <FontAwesome name="facebook" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  googleButton: {
    backgroundColor: "#DB4437", // Cor do Google
  },
  facebookButton: {
    backgroundColor: "#4267B2", // Cor do Facebook
  },
});

export default Login;
