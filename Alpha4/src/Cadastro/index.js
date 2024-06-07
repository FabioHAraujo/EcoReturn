import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StatusBar,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/connection";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from '@react-navigation/native';

const Cadastro = () => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  const [imagem, setImagem] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('#f7f7f7');
      StatusBar.setTranslucent(true);
    }, []) // array de dependências vazio para executar apenas uma vez
  );


  const handleAddItem = async () => {
    if (!nome || !descricao || !tipo || !imagem) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e adicione uma imagem."
      );
      return;
    }

    // Função para extrair palavras-chave
    const extractKeywords = (text) => {
      return text.toLowerCase().split(" ");
    };

    const keywords = [
      ...extractKeywords(nome),
      ...extractKeywords(descricao),
      ...extractKeywords(tipo),
    ];

    try {
      await addDoc(collection(db, "items"), {
        nome,
        descricao,
        tipo,
        keywords,
        imagem, // Certifique-se de que a imagem é uma URL ou base64 válida
      });
      Alert.alert("Item adicionado!", "Seu item foi adicionado com sucesso.");
      setNome("");
      setDescricao("");
      setTipo("");
      setImagem(null);
    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
    }
  };

  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resultado);

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri); // Defina a imagem como URI
    }
  };

  const tirarFoto = async () => {
    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(resultado);

    if (!resultado.canceled) {
      setImagem(resultado.assets[0].uri); // Defina a imagem como URI
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        translucent
        backgroundColor="#f7f7f7"
        barStyle="dark-content"
      />
      <Text style={styles.header}>Cadastro de Item</Text>
      <Text style={styles.headerSub}>Está procurando algum item e não encontrou ele por aqui? Digite o nome dele, coloque uma descrição, tente nos passar o tipo do material
      e adicione uma imagem (você também pode tirar uma foto dele) e certamente lhe ajudaremos
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do item"
        value={nome}
        onChangeText={(texto) => setNome(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={descricao}
        onChangeText={(texto) => setDescricao(texto)}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo de material"
        value={tipo}
        onChangeText={(texto) => setTipo(texto)}
      />
      <View style={styles.imageContainer}>
        {imagem && <Image source={{ uri: imagem }} style={styles.image} />}
        <TouchableOpacity onPress={escolherImagem} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={tirarFoto} style={styles.imageButton}>
          <Text style={styles.imageButtonText}>Tirar Foto</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Adicionar Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    marginTop: 30,
    backgroundColor: "#f7f7f7",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  headerSub:{
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 18,
    textAlign: 'justify',
    marginBottom: 24,
    color: "#333",
  },  
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    borderRadius: 8,
    width: "100%",
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  imageButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  imageButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Cadastro;
