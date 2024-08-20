import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import PostedItem from "./postItem";

export default function LatestItemList({ latestItemList }) {
  return (
    <View className="mt-3">
      <Text>ItemList</Text>
      <FlatList
        data={latestItemList}
        contentContainerStyle={{ paddingBottom: 120 }}
        numColumns={2}
        renderItem={({ item }) => <PostedItem item={item} />}
      />
    </View>
  );
}
