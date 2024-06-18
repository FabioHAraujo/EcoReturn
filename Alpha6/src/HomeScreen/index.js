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
  Modal,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/connection";
import styles from "./HomeScreenStyles"; // Importa os estilos
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import openMap from "react-native-open-maps";
import { normalizeText } from 'normalize-text';

const Separador = () => <View style={{marginBottom: 5}} />;

const HomeScreen = () => {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Black": require("../../assets/fonts/Poppins-Black.ttf"),
  });
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permissão de localização não concedida");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      } catch (error) {
        console.error("Erro ao obter a localização:", error);
      }
    })();
  }, []);

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
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("transparent");
      StatusBar.setTranslucent(true);
    }, [])
  );

  const fetchResults = async () => {
    setLoading(true);
  
    // Normaliza a string de pesquisa
    const normalizedSearch = normalizeText(search.trim().toLowerCase());
    console.log("Pesquisa normalizada:", normalizedSearch);
  
    try {
      // Busca todos os documentos da coleção 'items'
      const itemsQuery = query(collection(db, "items"));
      const itemsSnapshot = await getDocs(itemsQuery);
      const items = [];
      const itemTypes = new Set();
  
      // Itera sobre cada documento da coleção
      itemsSnapshot.forEach((doc) => {
        const data = doc.data();
        // Para cada documento, itera sobre as keywords
        data.keywords.forEach(keyword => {
          // Normaliza cada keyword para comparar com a string de pesquisa normalizada
          const normalizedKeyword = normalizeText(keyword.trim().toLowerCase());
          // Compara se a keyword normalizada contém a string de pesquisa normalizada
          if (normalizedKeyword.includes(normalizedSearch)) {
            items.push(data);
            itemTypes.add(data.tipo);
            return; // Sai do loop interno ao encontrar uma correspondência
          }
        });
      });
  
      console.log("Itens encontrados:", items);
      console.log("Tipos de itens:", Array.from(itemTypes));
  
      if (itemTypes.size > 0) {
        // Busca as empresas que aceitam os tipos dos itens encontrados
        const companiesQuery = query(
          collection(db, "empresas"), // Nome correto da coleção
          where(
            "itensAceitos",
            "array-contains-any",
            Array.from(itemTypes)
          )
        );
  
        const companiesSnapshot = await getDocs(companiesQuery);
        const companies = [];
        companiesSnapshot.forEach((doc) => {
          const data = doc.data();
          console.log("Empresa encontrada:", data); // Adiciona log para cada empresa encontrada
          companies.push(data);
        });
  
        console.log("Empresas encontradas:", companies);
  
        setResults(companies.slice(0, 4)); // Limita a 4 resultados
        setDropdownVisible(true);
      } else {
        setResults([]);
        setDropdownVisible(false);
      }
    } catch (error) {
      console.error("Erro na busca:", error);
    }
  
    setLoading(false);
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleCompanyPress = (company) => {
    setSelectedCompany(company);
  };

  const handleCloseModal = () => {
    setSelectedCompany(null);
  };

  const handleRoute = () => {
    if (selectedCompany) {
      openMap({
        end: `${selectedCompany.latitude},${selectedCompany.longitude}`,
        travelType: "drive",
      });
    }
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
            onChangeText={(text) => setSearch(text)}
          />
          {loading && <ActivityIndicator size="large" color="#ffffff" />}
          {dropdownVisible && !loading && (
            <FlatList
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => handleCompanyPress(item)}
                >
                  <Image
                    source={{ uri: item.companyLogo }}
                    style={styles.itemImage}
                  />
                  <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName}>{item.companyName}</Text>
                    <Text style={styles.itemDescription}>
                      {item.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              style={styles.dropdown}
            />
          )}
        </View>
        <Text
          style={[styles.homeText, { fontFamily: "Poppins-Black" }]}
        >
          Pesquise para Reciclar
        </Text>
      </ImageBackground>

      {/* Modal */}
      <Modal
        visible={!!selectedCompany}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCompany && (
              <>
                <Image
                  source={{ uri: selectedCompany.companyLogo }}
                  style={styles.companyLogo}
                />
                <Text style={styles.companyDescription}>
                  {selectedCompany.description}
                </Text>
                {userLocation && (
                  <Text>
                    Distância:{" "}
                    {calculateDistance(
                      userLocation.latitude,
                      userLocation.longitude,
                      selectedCompany.latitude,
                      selectedCompany.longitude
                    ).toFixed(2)}{" "}
                    km
                  </Text>
                )}
                <Button title="Traçar Rota" onPress={handleRoute} />
                <Separador />
                <Button title="Fechar" onPress={handleCloseModal} />
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
