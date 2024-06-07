import React, { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import estilosLogin from './LoginStyles';
import { auth } from "../firebase/connection";
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const navigation = useNavigation();
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailSubmit = async () => {
    if (email.trim() !== "" && password.trim() !== "") {
      try {
        // Tenta fazer login com o e-mail e senha fornecidos
        await signInWithEmailAndPassword(auth, email, password);
        // Se o login for bem-sucedido, navega para a próxima tela
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.error("Erro ao fazer login:", error); 
        alert("Falha ao fazer login. Verifique seu e-mail e senha e tente novamente.");
      }
    } else {
      alert('Por favor, preencha seu e-mail e senha.');
    }
  };
  

  const handleRegisterRedirect = () => {
    navigation.navigate('Register');
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
            <Text style={[estilosLogin.acessText, estilosLogin.logoText]}>Acesse</Text>
          </View>
          <Text style={estilosLogin.textLogin}>Faça login ou cadastre-se utilizando seu e-mail</Text>
          <View style={estilosLogin.inputContainer}>
            <FontAwesome name="envelope" size={20} color="#ccc" style={estilosLogin.inputIcon} />
            <TextInput
              style={estilosLogin.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#A4A4A4"
              onChangeText={text => setEmail(text)}
              value={email}
              keyboardType="email-address"
            />
          </View>
          <View style={estilosLogin.inputContainer}>
            <FontAwesome name="lock" size={20} color="#ccc" style={estilosLogin.inputIcon} />
            <TextInput
              style={estilosLogin.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#A4A4A4"
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity style={estilosLogin.button} onPress={navigation.navigate('HomeScreen')}>
            <LinearGradient
              colors={["#501794", "#3E70A1"]}
              style={estilosLogin.gradientBotao}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={estilosLogin.buttonText}>Acessar</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleRegisterRedirect}>
            <Text style={estilosLogin.registerText}>Ainda não é cadastrado? Clique aqui</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;
