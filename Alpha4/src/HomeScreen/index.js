import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/connection';
import styles from './HomeScreenStyles'; // Importa os estilos
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      fetchResults();
    } else {
      setResults([]);
      setDropdownVisible(false);
    }
  }, [search]);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('light-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, []) // array de dependências vazio para executar apenas uma vez
  );

  const fetchResults = async () => {
    setLoading(true);

    const q = query(
      collection(db, 'items'),
      where('keywords', 'array-contains', search.toLowerCase())
    );

    try {
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setResults(items.slice(0, 4)); // Limita a 4 resultados
      setDropdownVisible(true);
    } catch (error) {
      console.error('Erro na busca:', error);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <ImageBackground
        source={require("../../assets/backPesquisa.jpg")}
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
        <View style={styles.containerPesquisa}>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar..."
            placeholderTextColor="#A4A4A4"
            value={search}
            onChangeText={text => setSearch(text)}
          />
          {loading && <ActivityIndicator size="large" color="#ffffff" />}
          {dropdownVisible && !loading && (
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => console.log(item)}>
                  <Image source={{ uri: item.imagem }} style={styles.itemImage} />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName}>{item.nome}</Text>
                    <Text style={styles.itemDescription}>{item.descricao}</Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.dropdown}
            />
          )}
        </View>
        <Text style={[styles.homeText, {    fontFamily: "Poppins-Black"}]}>Pesquise para Reciclar</Text>
      </ImageBackground>
    </View>
  );
};


export default HomeScreen;