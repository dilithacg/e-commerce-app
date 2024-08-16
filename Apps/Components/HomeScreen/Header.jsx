import { View, Text, TextInput } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

export default function Header() {
  return (
    <View
      className="p-[10px] px-5 flex flex-row 
    items-center bg-gray-100 mt-5 rounded-full
    border-[2px] border-gray-300 mb-3"
    >
      <Feather name="search" size={24} color="red" />
      <TextInput
        placeholder="Search"
        className="ml-2 text-[18px]"
        onChangeText={(value) => console.log(value)}
      />
    </View>
  );
}
