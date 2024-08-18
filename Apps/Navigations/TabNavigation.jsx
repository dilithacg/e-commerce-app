import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../Screens/CartScreen";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import HomeScreenStackNav from "./HomeScreenStackNav";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff0000",
      }}
    >
      <Tab.Screen
        name="home-nav"
        component={HomeScreenStackNav}
        options={({ route }) => ({
          tabBarStyle: { display: getRoutName(route) },
          headerShown: false,
          tabBarLabel: ({ color }) => (
            <Text style={{ color: color, fontSize: 13, marginBottom: 3 }}>
              Home
            </Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        })}
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
const getRoutName = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log(routeName);
  if (routeName?.includes("productdetail")) {
    return "none";
  }
  return "flex";
};
