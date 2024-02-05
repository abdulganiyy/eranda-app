import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Button from "@/components/inputs/Button";
import { router } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
// import { socket } from "@/utils/constant";
import { useQuery } from "react-query";
import conversationService from "@/services/conversation";

export default function TabTwoScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [conversations, setConversations] = useState<any>([]);

  const { data, isLoading, error } = useQuery(
    ["conversations"],
    conversationService.getUserConversations,
    {
      onSuccess: (data) => {
        // console.log(data);
        setConversations(data);
      },
      onError: () => {
        console.error("Unable to get conversations");
      },
    }
  );

  // useEffect(() => {
  //   socket.on("connection", () => {
  //     console.log("connected");
  //   });

  //   socket.emit("message", "hello");

  //   socket.on("message", (message: any) => {
  //     // setMessages((prevMessages) => [...prevMessages, message]);
  //     console.log(message);
  //   });
  //   return () => {
  //     socket.off("message");
  //   };
  // }, [socket]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => {
        router.push({
          pathname: `/conversation`,
          params: {
            id: item?.participants[0]?.id,
            firstName: item?.participants[0]?.firstName,
            lastName: item?.participants[0]?.lastName,
          },
        });
      }}
    >
      <View style={styles.userDefaultImage}>
        <Text>
          {`${item?.participants[0].firstName}`.toUpperCase().slice(0, 1) +
            `${item?.participants[0].lastName}`.toUpperCase().slice(0, 1)}
        </Text>
      </View>
      <Text>
        {item?.participants[0].firstName + " " + item?.participants[0].lastName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  wrapper: {
    width: "90%",
    rowGap: 20,
  },
  paragraphWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userDefaultImage: {
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ACEECE",
    borderRadius: 20,
  },
  userContainer: {
    // flexDirection: "row",
    alignItems: "center",
    gap: 5,
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  conversation: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderTopWidth: 1,
    borderTopColor: "gray",
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: "gray",
  },
});
