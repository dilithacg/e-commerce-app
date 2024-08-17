import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function PostedItem({ item }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-1 m-2 p-2 rounded-xl border-[1px]
        border-slate-300 bg-gray-100"
      onPress={() =>
        navigation.push("productdetail", {
          product: item,
        })
      }
    >
      <Image
        source={{ uri: item.mainImage }}
        className="w-full 
          h-[140px] rounded-lg"
      />
      <View className="mt-1">
        <Text className="text-gray-400 mt-1 p-[1px] ">
          {item.brandName ? item.brandName : "No Brand"}
        </Text>
        <Text className="text-[15px] font-semibold mt-1 p-[1px]">
          {item.name}
        </Text>
        <View className="flex-row gap-1 mb-1">
          <Text className="text-[15px] font-bold text-red-500">
            {item.price.currency}
          </Text>
          <Text className="text-[15px] font-bold text-red-500">
            {item.price.amount}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
