import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, StatusBar, Image, Text, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import Modal from 'react-native-modal';
import openMap from 'react-native-open-maps';
import { db } from '../firebase/connection';  // Usando a conexão Firebase configurada

const Mapa = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const markerRefs = useRef({}); // Usar useRef para armazenar referências dos markers

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(true);
    }, [])
  );

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permissão de localização não concedida');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        // Fetch markers do firestore
        const querySnapshot = await getDocs(collection(db, 'empresas'));
        const fetchedMarkers = [];
        querySnapshot.forEach((doc) => {
          fetchedMarkers.push({ id: doc.id, ...doc.data() });
        });
        setMarkers(fetchedMarkers);
      } catch (error) {
        console.error('Erro ao obter a localização:', error);
      }
    })();
  }, []);

  useEffect(() => {
    // Mostrar callout para cada marcador após markers serem atualizados
    markers.forEach(marker => {
      if (markerRefs.current[marker.id]) {
        markerRefs.current[marker.id].showCallout();
      }
    });
  }, [markers]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const handleCloseModal = () => {
    setSelectedMarker(null);
  };

  const handleRoute = () => {
    if (selectedMarker) {
      openMap({ 
        end: `${selectedMarker.latitude},${selectedMarker.longitude}`, 
        travelType: 'drive' 
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {initialRegion && (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
        >
          <Marker
            coordinate={initialRegion}
            title="Sua Localização"
            pinColor="green"
          />
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              onPress={() => handleMarkerPress(marker)}
              ref={(ref) => markerRefs.current[marker.id] = ref} // Atribuir referência
            >
              <View style={styles.marker}>
                <Image source={{ uri: marker.companyLogo }} style={styles.markerImage} />
                <Text style={styles.markerTitle}>{marker.companyName}</Text>
              </View>
              <Callout>
                <View style={styles.callout}>
                  <Text>{marker.companyName}</Text>
                  <Text>{`Distância: ${calculateDistance(initialRegion.latitude, initialRegion.longitude, marker.latitude, marker.longitude).toFixed(2)} km`}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      )}
      <Modal isVisible={!!selectedMarker} onBackdropPress={handleCloseModal}>
        <View style={styles.modalContent}>
          {selectedMarker && (
            <>
              <Image source={{ uri: selectedMarker.companyLogo }} style={styles.companyLogo} />
              <Text style={styles.companyDescription}>{selectedMarker.description}</Text>
              <Button title="Traçar Rota" onPress={handleRoute} />
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  markerTitle: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
  callout: {
    width: 150,
    padding: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  companyLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  companyDescription: {
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Mapa;
