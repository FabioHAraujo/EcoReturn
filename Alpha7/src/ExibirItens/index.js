import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { collection, onSnapshot, updateDoc, doc } from 'firebase/firestore';
import Modal from 'react-native-modal';
import RNPickerSelect from 'react-native-picker-select';
import { db } from '../firebase/connection';

const ExibirItems = () => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);

  useEffect(() => {
    const unsubscribeItems = onSnapshot(collection(db, 'items'), (querySnapshot) => {
      const fetchedItems = [];
      querySnapshot.forEach((doc) => {
        fetchedItems.push({ id: doc.id, ...doc.data() });
      });
      setItems(fetchedItems);
    });

    return () => unsubscribeItems();
  }, []);

  useEffect(() => {
    const unsubscribeEmpresas = onSnapshot(collection(db, 'empresas'), (querySnapshot) => {
      const fetchedEmpresas = [];
      querySnapshot.forEach((doc) => {
        fetchedEmpresas.push({ id: doc.id, ...doc.data() });
      });
      setEmpresas(fetchedEmpresas);
    });

    return () => unsubscribeEmpresas();
  }, []);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleAddMaterial = async () => {
    if (selectedEmpresa) {
      const empresaRef = doc(db, 'empresas', selectedEmpresa.id);
      await updateDoc(empresaRef, {
        itensAceitos: [...selectedEmpresa.itensAceitos, selectedItem.tipo],
      });
      setModalVisible(false);
      setSelectedItem(null);
      setSelectedEmpresa(null);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleItemPress(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.description}>{item.descricao}</Text>
        <Text style={styles.type}>{item.tipo}</Text>
        {item.imagem && <Image source={{ uri: item.imagem }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );

  const availableEmpresas = empresas.filter(
    (empresa) => !empresa.itensAceitos.includes(selectedItem?.tipo)
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
      />
      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Conhece uma empresa filiada que aceita este material? Selecione-a abaixo e clique para adicionar.</Text>
          <RNPickerSelect
            onValueChange={(value) => setSelectedEmpresa(value)}
            items={availableEmpresas.map((empresa) => ({
              label: empresa.companyName || "Empresa sem nome",
              value: empresa,
              key: empresa.id,
            }))}
            style={pickerSelectStyles}
            placeholder={{ label: "Selecione uma empresa", value: null }}
          />
          <Text style={styles.modalDescription}>Empresas que já aceitam este material não podem ser cadastradas.</Text>
          <Button title="Adicionar" onPress={handleAddMaterial} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
  },
  type: {
    fontSize: 14,
    marginBottom: 8,
    fontStyle: 'italic',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    marginVertical: 10,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    width: '100%',
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    width: '100%',
    marginBottom: 20,
  },
});

export default ExibirItems;
