import React, { useState, useEffect } from "react";
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
import { useNavigation, useRoute } from '@react-navigation/native'; 
import estilosLogin from "../Login/LoginStyles";
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from "../firebase/connection"; 

const PasswordScreen = () => { 
  const navigation = useNavigation(); 
  const route = useRoute();
  const { email } = route.params;

  const [fontsLoaded] = useFonts({ 
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"), 
  }); 
  const [password, setPassword] = useState("");

  const handlePasswordSubmit = () => { 
    if (password.trim() !== "") { 
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          // Navega para a tela principal ou outra tela
          console.log(user);
          navigation.navigate('MainTab'); // Ajuste para o nome da tela principal
        })
        .catch((error) => {
          alert("Erro ao fazer login. Verifique suas credenciais.");
          console.error("Error logging in: ", error);
        });
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
            <Text style={[estilosLogin.acessText, estilosLogin.logoText]}>Acesse</Text> 
          </View> 
          <Text style={estilosLogin.textLogin}>Insira sua senha</Text> 
          <View style={estilosLogin.inputContainer}> 
            <FontAwesome name="envelope" size={20} color="#ccc" style={estilosLogin.inputIcon} /> 
            <TextInput 
              style={estilosLogin.input} 
              placeholder="Digite seu e-mail" 
              placeholderTextColor="#A4A4A4" 
              value={email} 
              editable={false}
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
              secureTextEntry 
            /> 
          </View>
          <TouchableOpacity style={estilosLogin.button} onPress={handlePasswordSubmit}> 
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

export default PasswordScreen;