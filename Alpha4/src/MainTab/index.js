// MainTab.js

import React, {useEffect} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as NavigationBar from "expo-navigation-bar";

import HomeScreen from "../HomeScreen";
import Mapa from "../Mapa";
import Cadastro from "../Cadastro";
import ExibirItems from "../ExibirItens";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

const MainTab = () => {
    // APENAS UMA DEPENDENCIA PRA ALTERAR A COR DA BARRA DE NAVEGAÇÃO
  useEffect(() => {
  async function setNavigationBarColor() {
    await NavigationBar.setBackgroundColorAsync("#123754");
    await NavigationBar.setButtonStyleAsync("light");
  }

  setNavigationBarColor();
  }, [])
  // -------------------------------------------------------


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: "#123754", borderTopWidth: 0 },
        tabBarActiveTintColor: "#74C0FA",
        tabBarInactiveTintColor: "#B2B2B2",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Mapa') {
            iconName = 'map';
          } else if (route.name === 'Cadastro') {
            iconName = 'wpforms';
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Mapa" component={Mapa} />
      <Tab.Screen name="Cadastro" component={Cadastro} />
      <Tab.Screen name="Itens Pendentes" component={ExibirItems} options={{
        tabBarIcon: ({ color, size }) => {
          return <FontAwesome name="list" color={color} size={size} />;
        }
      }} />
    </Tab.Navigator>
  );
};

export default MainTab;
