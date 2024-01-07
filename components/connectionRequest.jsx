import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ConnectionRequest = ({ item, setConnectionRequests, userId }) => {
  const acceptConnection = async (requestId) => {
    await axios
      .patch("http://10.0.2.2:3000/connections/accept", { requestId, userId })
      .then(({ data }) =>
        setConnectionRequests((pre) =>
          pre.filter((request) => request._id !== item._id)
        )
      ).catch(err=>console.log(err));
  };

  return (
    <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={{ uri: item?.profileImage }}
        />

        <Text style={{ width: 200 }}>
          {item?.name} is Inviting you to connect
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 7 }}>
          <Pressable
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Feather name="x" size={22} color="black" />
          </Pressable>

          <Pressable
            onPress={() => acceptConnection(item._id)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: "#E0E0E0",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Ionicons name="ios-checkmark-outline" size={22} color="#0072b1" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default ConnectionRequest;
