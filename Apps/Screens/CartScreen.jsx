import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Checkbox from "expo-checkbox";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function CartScreen() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s3-eu-west-1.amazonaws.com/api.themeshplatform.com/products.json"
        );
        const data = await response.json();

        // Initialize the cart with data from the API, adding a default quantity of 1
        const cartItems = data.data.map((item) => ({
          id: item.id,
          SKU: item.SKU,
          name: item.name,
          brandName: item.brandName,
          mainImage: item.mainImage,
          price: item.price,
          currency: item.price,
          quantity: 1, // Default quantity
        }));

        setCart(cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
    setSelectedItems((prevSelected) => {
      const { [productId]: _, ...rest } = prevSelected;
      return rest;
    });
  };

  // Toggle item selection
  const toggleSelectItem = (itemId) => {
    setSelectedItems((prevSelected) => ({
      ...prevSelected,
      [itemId]: !prevSelected[itemId],
    }));
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems({});
    } else {
      const allSelected = cart.reduce((acc, item) => {
        acc[item.id] = true;
        return acc;
      }, {});
      setSelectedItems(allSelected);
    }
    setSelectAll(!selectAll);
  };

  // Calculate the total price of selected items
  const total = cart.reduce(
    (sum, item) =>
      selectedItems[item.id]
        ? sum + parseFloat(item.price.amount) * item.quantity
        : sum,
    0
  );

  // Render function for each item in the cart
  const renderItem = ({ item }) => (
    <View
      key={item.id}
      className="flex-row justify-between my-2 bg-gray-100 rounded-lg border-[1px] border-gray-300 p-[5px] h-[140px]"
    >
      <Image
        source={{ uri: item.mainImage }}
        className="w-20 h-20 rounded-lg"
      />
      <View className="flex-1 ml-4">
        <Text className="text-lg font-semibold">{item.name}</Text>
        <Text className="text-gray-500">
          Brand: {item.brandName ? item.brandName : "No Brand"}
        </Text>
        <Text className="text-gray-500">
          {item.price.currency}
          {item.price.amount}
        </Text>
        <Text className="text-gray-500">Quantity: {item.quantity}</Text>
      </View>
      <View className="flex-grow-1 items-center mt-2 absolute top-1 right-2">
        <Checkbox
          value={selectedItems[item.id] || false}
          onValueChange={() => toggleSelectItem(item.id)}
        />
      </View>

      <TouchableOpacity
        onPress={() => removeFromCart(item.id)}
        className="absolute bottom-2 right-2 flex-row items-center p-[3px] bg-red-500 rounded-full"
      >
        <MaterialIcons name="delete" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  return (
    <View className="p-4 flex-1 bg-white ">
      <View style={{ position: "absolute", top: 25, right: 18 }}>
        <Text className="text-2xl font-bold mb-4 ">Cart</Text>
      </View>
      <View className="flex-row items-center mb-4 mt-9 ">
        <Checkbox value={selectAll} onValueChange={handleSelectAll} />
        <Text className="ml-2 text-lg font-semibold">Select All</Text>
      </View>

      {cart.length > 0 ? (
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text className="text-lg mt-4">Your cart is empty.</Text>
      )}

      <View className="mt-2 mb-2 ">
        <Text className="text-xl font-bold">Total:GBP {total.toFixed(2)}</Text>
      </View>
      <TouchableOpacity>
        <View className="p-[15px] bg-red-600 ml-3 mr-3 mb-2 px-2 rounded-md">
          <Text className="text-white font-bold text-[18px] text-center">
            Check Out
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
