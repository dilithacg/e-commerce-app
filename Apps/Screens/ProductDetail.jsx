import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/slices/cartSlice";

export default function ProductDetail() {
  const route = useRoute();
  const { product } = route.params;
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    //loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    dispatch(addToCart({ ...product, quantity: 1 }));
  };

  const sizeString =
    product.sizes && product.sizes.length > 0
      ? product.sizes.join(", ")
      : "No sizes available";

  return (
    <View className="flex-1 ">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <Image
          source={{ uri: product.mainImage }}
          className="h-[320px] w-full"
        />

        <View className="p-3 bg-gray-100">
          <Text className="text-[20px] font-bold">{product.name}</Text>
          <View className="flex-row">
            <Text className="text-[17px] m-1 text-red-500 font-extrabold">
              {product.price.currency} {product.price.amount}
            </Text>
          </View>

          <View className="items-baseline">
            <View className="flex-row">
              <Text className="text-black text-[14px]">Stock Status: </Text>
              <Text
                className={`text-[15px] font-semibold ${
                  product.stockStatus === "IN STOCK"
                    ? "text-black bg-yellow-300 px-2 rounded-md"
                    : "text-white bg-red-500 px-2 rounded-md"
                }`}
              >
                {product.stockStatus}
              </Text>
            </View>
            <Text className="mt-2 p-1 px-2 text-red-500 bg-red-200 rounded-full">
              {product.brandName ? product.brandName : "No Brand"}
            </Text>
          </View>
          <View className="mt-2 flex-row">
            <Text className="text-[18px] font-semibold">Colour: </Text>
            <Text className="text-[18px] font-semibold text-gray-500">
              {product.colour}
            </Text>
          </View>
          <View className="mt-2">
            <Text className="text-[18px] font-semibold">Available Sizes:</Text>
            <Text className="px-2 text-gray-500 text-[14px]">{sizeString}</Text>
          </View>

          <Text className="mt-3 font-semibold text-[18px]">Description:</Text>
          <View className="px-2 ">
            <Text className="text-[17px] text-gray-500 text-justify">
              {product.description}
            </Text>
          </View>
          <Text className="text-[17px] text-gray-500 text-justify">
            SKU: {product.SKU}
          </Text>
        </View>
      </ScrollView>
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between p-3 bg-white border-t border-gray-200">
        <TouchableOpacity className="bg-red-600 flex-1 rounded-md p-3 mr-2">
          <Text className="text-center text-white text-[17px] font-semibold">
            Buy Now
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white flex-1 rounded-md p-3 ml-2 border border-red-600"
          onPress={handleAddToCart}
        >
          <Text className="text-center text-red-600 text-[17px] font-semibold">
            Add To Cart
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
