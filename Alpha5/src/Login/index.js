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
import estilosLogin from './LoginStyles';


const Login = () => {
  const navigation = useNavigation();
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    if (email.trim() !== "") {
      navigation.navigate('MainTab');
    } else {
      alert('Por favor, preencha seu e-mail.');
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
          <TouchableOpacity style={estilosLogin.button} onPress={handleEmailSubmit}>
            <LinearGradient
              colors={["#501794", "#3E70A1"]}
              style={estilosLogin.gradientBotao}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={estilosLogin.buttonText}>Acessar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;