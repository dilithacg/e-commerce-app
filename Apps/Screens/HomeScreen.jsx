import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../Components/HomeScreen/Header";
import PostedItem from "../Components/HomeScreen/postItem";

export default function HomeScreen() {
  const [latestItemList, setLatestItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json"
        );
        const data = await response.json();

        // Log the raw data to inspect it
        console.log("Fetched data:", data);

        setLatestItemList(data.data); // Assuming the API returns an object with a 'products' array

        // Log the products array to ensure it's correctly set
        console.log("Products array:", data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHeader = () => (
    <View>
      <Header />
    </View>
  );
  return (
    <FlatList
      className="py-8 px-6 bg-white flex-1"
      ListHeaderComponent={renderHeader}
      data={latestItemList}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => <PostedItem item={item} />}
      overScrollMode="never"
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    />
  );
}
