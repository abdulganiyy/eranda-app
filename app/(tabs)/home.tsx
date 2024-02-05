// import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import React, { useState } from "react";
import { TextInput, FlatList, StyleSheet } from "react-native";
import Card from "@/components/Card";
import SearchBar from "@/components/SearchBar";
import Avatar from "@/components/Avatar";
import { useAppSelector } from "@/redux/hooks";
import errandService from "@/services/errand";
import { useQuery } from "react-query";

const HomeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const user = useAppSelector((state) => state.auth.user);
  // const [data, setData] = useState([
  //   {
  //     id: "1",
  //     title: "Groceries Shopping",
  //     description: "I do groceries shopping for homes and offices",
  //     price: 2000,
  //     currency: "₦",
  //   },
  //   {
  //     id: "2",
  //     title: "Home Cleaning",
  //     description: "Washing of home,offices,public places.",
  //     price: 3000,
  //     currency: "₦",
  //   },
  //   {
  //     id: "3",
  //     title: "Groceries Shopping",
  //     description: "I do groceries shopping for homes and offices",
  //     price: 2000,
  //     currency: "₦",
  //   },
  //   {
  //     id: "4",
  //     title: "Home Cleaning",
  //     description: "Washing of home,offices,public places.",
  //     price: 3000,
  //     currency: "₦",
  //   },
  //   {
  //     id: "5",
  //     title: "Groceries Shopping",
  //     description: "I do groceries shopping for homes and offices",
  //     price: 2000,
  //     currency: "₦",
  //   },
  //   {
  //     id: "6",
  //     title: "Home Cleaning",
  //     description: "Washing of home,offices,public places.",
  //     price: 3000,
  //     currency: "₦",
  //   },
  //   // Add more data as needed
  // ]);

  const { data, isLoading, error } = useQuery("data", errandService.getErrands);

  // console.log(data);

  const renderItem = ({ item }: any) => <Card {...item} />;

  if (isLoading)
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );

  // if (error) return <Text>Unable to retrieve feeds</Text>;

  return (
    <View style={styles.container}>
      <Text
        style={styles.welcomeText}
        lightColor="rgba(0,0,0,0.8)"
        darkColor="rgba(0,0,0,0.8)"
      >
        Welcome {user?.firstName}
      </Text>
      <SearchBar
        placeholder="Search services..."
        onChangeText={(text: string) => setSearchText(text)}
        value={searchText}
        lightTheme
      />
      <FlatList
        data={data?.filter((item: any) =>
          item.title.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    padding: 16,
    paddingTop: 50,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  welcomeText: {
    paddingBottom: 20,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default HomeScreen;

// export default function TabOneScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab One</Text>
//       <View
//         style={styles.separator}
//         lightColor="#eee"
//         darkColor="rgba(255,255,255,0.1)"
//       />
//       <Link href="/login">
//         <Text>Click</Text>
//       </Link>
//       {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });
