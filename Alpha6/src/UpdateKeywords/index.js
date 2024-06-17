import React from 'react';
import { Button, Alert, View, Text } from 'react-native';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/connection';

const UpdateKeywords = () => {
  const updateKeywords = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'items'));
      querySnapshot.forEach(async (documentSnapshot) => {
        const data = documentSnapshot.data();
        const keywords = [
          ...data.nome.split(' ').map(word => word.toLowerCase()),
          ...data.descricao.split(' ').map(word => word.toLowerCase()),
          ...data.tipo.split(' ').map(word => word.toLowerCase())
        ];
        await updateDoc(doc(db, 'items', documentSnapshot.id), { keywords });
      });
      Alert.alert('Sucesso', 'Keywords atualizadas com sucesso.');
    } catch (error) {
      console.error('Erro ao atualizar keywords:', error);
      Alert.alert('Erro', 'Houve um erro ao atualizar as keywords.');
    }
  };

  return (
    <View style={{marginTop: 30}}>
      <Button title="Atualizar Keywords" onPress={updateKeywords} />   
    </View>
  )
};

export default UpdateKeywords;