import React, { useState, useEffect } from "react";
import { 
  ImageBackground, 
  StatusBar, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Modal,
  Pressable
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
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal de erro

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
          console.error("Error logging in: ", error);
          setModalVisible(true); // Exibir modal de erro
        });
    } else { 
      alert('Por favor, preencha sua senha.'); 
    } 
  };

  const closeModal = () => {
    setModalVisible(false);
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
      {/* Modal de erro */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Seus dados não conferem, por favor, tente novamente.</Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View> 
  ); 
}; 

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#3E70A1',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordScreen;
