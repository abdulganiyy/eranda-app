import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

// import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/auth";
import { useColorScheme } from "react-native";
import Colors from "@/constants/Colors";
import Button from "@/components/inputs/Button";
import { router, useLocalSearchParams } from "expo-router";
import { useAppSelector } from "@/redux/hooks";
import { useQuery, useMutation } from "react-query";
import conversationService from "@/services/conversation";
import { socket } from "@/utils/constant";

export default function ConversationScreen() {
  //   const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const params = useLocalSearchParams();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<any>([]);

  // console.log(user);
  useEffect(() => {
    socket?.on("connection", () => {
      console.log("connected");
    });

    // socket?.emit("message", "hello");

    socket?.on("message", (message: any) => {
      if (message?.text) {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      }
      // console.log(message, "socket message");
    });

    return () => {
      socket?.off("message");
    };
  }, [socket]);

  const { data, isLoading, error, refetch } = useQuery(
    ["conversation", { participants: [`${user?.id}`, params?.id] }],
    conversationService.create,
    {
      onSuccess: (data) => {
        // console.log(data);
        setMessages(data?.messages);
      },
      onError: () => {
        console.error("Unable to get conversation");
      },
    }
  );

  const { mutate, ...result } = useMutation(conversationService.sendMessage, {
    onSuccess: (data) => {
      setText("");
      refetch();
      // console.log(data);
      // setMessages((prevMessages: any) => [...prevMessages, data]);
      // socket.emit("message", data);
      // socket.emit("message", data);
    },
    onError: () => {
      console.error("Unable to process operation at this time");
    },
  });

  // console.log(data);

  // function handleKeyDown(e) {
  //   if (e.nativeEvent.key == "Enter") {
  //   }
  // }

  // useEffect(() => {
  //   socket.on("message", (message: any) => {
  //     setMessages((prevMessages: any) => [...prevMessages, message]);
  //     console.log(message);
  //   });
  // }, [socket]);

  // return <View></View>;

  const renderItem = ({ item }: any) => (
    <View
      style={[
        styles.messageBox,
        user?.id == item?.sender?.id
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" },
      ]}
    >
      <View
        style={[
          {
            backgroundColor: "green",
            padding: 5,
            borderRadius: 5,
            width: "auto",
            alignSelf: "flex-start",
          },
          user?.id === item?.sender?.id
            ? { borderBottomRightRadius: 0 }
            : { borderBottomLeftRadius: 0 },
        ]}
      >
        <Text style={{ color: "white" }}>{item?.text}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            router.push("/(tabs)/home");
          }}
        >
          <Text>Go back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.userContainer}>
            <View style={styles.userDefaultImage}>
              <Text>
                {`${params?.firstName}`.toUpperCase().slice(0, 1) +
                  `${params?.lastName}`.toUpperCase().slice(0, 1)}
              </Text>
            </View>
            <Text>{params?.firstName + " " + params?.lastName}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.messages}>
          {/* {messages?.map((message: any, i: number) => {
            return (
              <View
                key={i}
                style={[
                  styles.messageBox,
                  user?.id == message?.sender?.id
                    ? { justifyContent: "flex-end" }
                    : { justifyContent: "flex-start" },
                ]}
              >
                <View
                  style={[
                    {
                      backgroundColor: "green",
                      padding: 5,
                      borderRadius: 5,
                      width: "auto",
                      alignSelf: "flex-start",
                    },
                    user?.id === message?.sender?.id
                      ? { borderBottomRightRadius: 0 }
                      : { borderBottomLeftRadius: 0 },
                  ]}
                >
                  <Text style={{ color: "white" }}>{message?.text}</Text>
                </View>
              </View>
            );
          })} */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        </View>
        <View style={styles.textboxContainer}>
          <TextInput
            onChangeText={(value) => setText(value)}
            value={text}
            placeholderTextColor="#bbb"
            placeholder="Type message..."
            style={styles.textbox}
            onSubmitEditing={() => {
              mutate({
                conversationId: data?.conversation?.id,
                text,
                sender: `${user?.id}`,
                receiver: params?.id,
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backBtn: {
    width: "20%",
  },
  headerContent: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    // backgroundColor: "green",
  },
  messages: {
    flex: 1,
    rowGap: 5,
    marginBottom: 10,
    // backgroundColor: "green",
  },
  messageBox: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    // backgroundColor: "red",
  },
  textboxContainer: {
    // backgroundColor: "green",
    // height: 40,
  },
  textbox: {
    backgroundColor: "green",
    height: 40,
    borderRadius: 5,
    padding: 5,
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
});
