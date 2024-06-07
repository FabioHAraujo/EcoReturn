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
import estilosLogin from "../Login/LoginStyles";
import { auth } from "../firebase/connection";
import { signInWithEmailAndPassword } from 'firebase/auth';

const PasswordScreen = ({ route }) => {
  const navigation = useNavigation();
  const { email } = route.params;
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    if (senha.trim() !== "") {
      try {
        await signInWithEmailAndPassword(auth, email, senha);
        navigation.navigate('MainTab');
      } catch (error) {
        alert('Erro ao fazer login. Por favor, verifique sua senha.');
      }
    } else {
      alert('Por favor, preencha sua senha.');
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
          <View style={{ flexDirection: 'row' }}>
            <FontAwesome name="recycle" size={24} color="#229954" />
            <Text style={[estilosLogin.logoTitle, estilosLogin.logoText]}>EcoReturn</Text>
          </View>
          <Text style={[estilosLogin.logoSubtitle, estilosLogin.logoText]}>RECICLANDO</Text>
          <Text style={[estilosLogin.logoSubtitle, estilosLogin.logoText]}>O FUTURO</Text>
        </View>
        <View style={estilosLogin.loginContainer}>
          <View style={{width: '100%'}}>
            <Text style={[estilosLogin.acessText, estilosLogin.logoText]}>Bem-Vindo de Volta, {email}</Text>
          </View>
          <Text style={estilosLogin.textLogin}>Insira sua senha para continuar</Text>
          <TextInput
            style={estilosLogin.input}
            placeholder="Senha"
            placeholderTextColor="#A4A4A4"
            secureTextEntry
            onChangeText={text => setSenha(text)}
            value={senha}
          />
          <TouchableOpacity style={estilosLogin.button} onPress={handleLogin}>
            <LinearGradient
              colors={["#501794", "#3E70A1"]}
              style={estilosLogin.gradientBotao}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={estilosLogin.buttonText}>Entrar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default PasswordScreen;
