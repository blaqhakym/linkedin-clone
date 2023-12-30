import { View, Text, Pressable } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  return (
    <View>
      <Text>na tab index be this</Text>
      <Pressable
        onPress={async () => {
          try {
            await AsyncStorage.removeItem("authToken");
            router.push("../../(authenticate)/login");
          } catch (error) {
            console.log(error);
          }
        }}
        style={{ backgroundColor: "red", width: "fit-content" }}>
        <Text style={{ color: "white" }}>Log out</Text>
      </Pressable>
    </View>
  );
};

export default index;
