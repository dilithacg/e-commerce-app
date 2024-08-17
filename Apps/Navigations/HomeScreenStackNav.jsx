import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../Screens/HomeScreen";
import ProductDetail from "../Screens/ProductDetail";

const Stack = createStackNavigator();

export default function HomeScreenStackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="productdetail"
        component={ProductDetail}
        options={{
          headerStyle: {
            backgroundColor: "#e11d27",
          },
          headerTintColor: "#fff",
          headerTitle: "Detail",
        }}
      />
    </Stack.Navigator>
  );
}
