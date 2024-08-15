import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CartScreen from "../Screens/CartScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff0000",
      }}
    >
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 13, marginBottom: 3 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="cart"
        component={CartScreen}
        options={{
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 13, marginBottom: 3 }}>
              Cart
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-cart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
