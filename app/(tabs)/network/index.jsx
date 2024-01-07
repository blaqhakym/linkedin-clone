import { View, Text, Pressable, FlatList, SectionListComponent, Alert} from "react-native";
import { ScrollView,  } from "react-native-virtualized-view";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import UserProfile from "../../../components/UserProfile";
import ConnectionRequest from "../../../components/ConnectionRequest";

const network = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [users, setUsers] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // ger userId stored inside jwt token stored in local storage so as to fetch user and users
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUserId();
  }, []);


  // fetch user
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`http://10.0.2.2:3000/users/profile/${userId}`);
        const userData = await res.data.user;
        setUser(userData);
      } catch (err) {
        console.log(err);
      }
    };

    if (userId) fetchUserProfile();
  }, [userId]);


//fetch all users not in connections
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      await axios
        .get(`http:10.0.2.2:3000/users/${userId}`)
        .then((res) => {
          const data = res.data.data
          setUsers(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
        })
    };
    if (userId) fetchUsers();
  }, [userId]);


  //fetch connection requests
  useEffect(() => {
    if (userId) {
      fetchConnectionRequests();
    }
  }, [userId]);

  const fetchConnectionRequests = async () => {
     await axios.get(
        `http://10.0.2.2:3000/connections/requests/${userId}`, 
     ).then(({data}) => {
       setConnectionRequests(data.requests)
      }).catch(err=>console.log(err))  
  };

 
  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      <Pressable
        onPress={() => router.push("(tabs)/network/connections")}
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Manage My Network
        </Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </Pressable>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View
        style={{
          marginTop: 10,
          marginHorizontal: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Invitations (0)</Text>
        <AntDesign name="arrowright" size={22} color="black" />
      </View>

      <View
        style={{ borderColor: "#E0E0E0", borderWidth: 2, marginVertical: 10 }}
      />

      <View>
        {connectionRequests?.map((item, index) => (
          <ConnectionRequest
            item={item}
            key={index}
            connectionRequest={connectionRequests}
            setConnectionRequests={setConnectionRequests}
            userId={userId}
          />
        ))}
      </View>

      <View style={{ marginHorizontal: 15 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
          <Text>Grow your network faster</Text>
          <Entypo name="cross" size={24} color="black" />
        </View>

        <Text>
          Find and contact the right people. Plus see who's viewed your profile
        </Text>
        <View
          style={{
            backgroundColor: "#FFC72C",
            width: 140,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 25,
            marginTop: 8,
          }}>
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}>
            Try Premium
          </Text>
        </View>
      </View>
      {typeof users === "string" ? <Text>{users}</Text>
        : <FlatList
      data={users}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item, index }) => (
        <UserProfile userId={userId} item={item} key={index} />
      )}
    />}
    </ScrollView>
  );
};

export default network;
