import React, { useState } from "react";
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import estilosLogin from "../Login/LoginStyles";
import { auth } from "../firebase/connection";
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = ({ route }) => {
  const navigation = useNavigation();
  const { email: preFilledEmail } = route.params;
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });

  const [nome, setNome] = useState('');
  const [cep, setCep] = useState('');
  const [email, setEmail] = useState(preFilledEmail);
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    if (nome && cep && email && senha) {
      try {
        await createUserWithEmailAndPassword(auth, email, senha);
        // Após o cadastro, você pode salvar informações adicionais do usuário no Firestore.
        alert('Usuário cadastrado com sucesso!');
        navigation.navigate('Login');
      } catch (error) {
        alert('Erro ao cadastrar. Por favor, tente novamente.');
      }
    } else {
      alert('Por favor, preencha todos os campos.');
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
        source={require("../../assets/backCadastro.png")}
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
          <View style={estilosLogin.containerRegistro}>
            <Text style={[estilosLogin.textLogin, {fontSize: 22}]}>Preencha os dados para criar sua conta</Text>
            <Text style={estilosLogin.textoCadastro}>Nome Completo:</Text>
            <View style={estilosLogin.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#ccc" style={estilosLogin.inputIcon} />
              <TextInput
                style={estilosLogin.input}
                placeholder="Fulano de Tal"
                placeholderTextColor="#A4A4A4"
                onChangeText={text => setNome(text)}
                value={nome}
                keyboardType="default"
              />
            </View>
            <Text style={estilosLogin.textoCadastro}>CEP:</Text>
            <View style={estilosLogin.inputContainer}>
              <Ionicons name="map-outline" size={20} color="#ccc" style={estilosLogin.inputIcon} />
              <TextInput
                style={estilosLogin.input}
                placeholder="93525-075"
                placeholderTextColor="#A4A4A4"
                onChangeText={text => setCep(text)}
                value={cep}
                keyboardType="numeric"
              />
            </View>
            <Text style={estilosLogin.textoCadastro}>E-mail:</Text>
            <View style={estilosLogin.inputContainer}>
              <Ionicons name="mail-open-outline" size={20} color="#ccc" style={estilosLogin.inputIcon} />
              <TextInput
                style={estilosLogin.input}
                placeholder="meu-email@meu.com.br"
                placeholderTextColor="#A4A4A4"
                onChangeText={text => setEmail(text)}
                value={email}
                keyboardType="email-address"
              />
            </View>
            <Text style={estilosLogin.textoCadastro}>Senha:</Text>
            <View style={estilosLogin.inputContainer}>
              <MaterialCommunityIcons name="form-textbox-password" size={20} color="#ccc" style={estilosLogin.inputIcon} />
              <TextInput
                style={estilosLogin.input}
                placeholder="@Sua!Senh4Forte"
                placeholderTextColor="#A4A4A4"
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry 
              />
            </View>
            <Text style={estilosLogin.textoCadastro}>Repita sua Senha:</Text>
            <View style={estilosLogin.inputContainer}>
              <MaterialCommunityIcons name="form-textbox-password" size={20} color="#ccc" style={estilosLogin.inputIcon} />
              <TextInput
                style={estilosLogin.input}
                placeholder="@Sua!Senh4Forte Novamente"
                placeholderTextColor="#A4A4A4"
                onChangeText={text => setConfirmarSenha(text)}
                value={confirmarSenha}
                secureTextEntry
              />
            </View>
            <TouchableOpacity style={estilosLogin.button} onPress={handleRegister}>
              <LinearGradient
                colors={["#501794", "#3E70A1"]}
                style={estilosLogin.gradientBotao}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text style={estilosLogin.buttonText}>Cadastrar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Register;
