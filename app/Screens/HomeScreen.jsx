import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { FetchData } from "../Utils/FetchData";
import { CreateTable, InsertData } from "../Utils/SqliteHandler";

export default function HomeScreen() {
  let [data, setData] = useState([]);

  useEffect(() => {
    CreateTable();

    const fetchData = async () => {
      try {
        const response = await fetch("https://api.github.com/repositories");
        const data = await response.json(); // Use .json() to extract JSON data
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.homeView}>
      <TouchableOpacity onPress={() => FetchData()} style={styles.fetchBtn}>
        <Text style={{ fontWeight: "bold" }}>Fetch</Text>
      </TouchableOpacity>

      <Image
        source={{
          uri: "https://avatars.githubusercontent.com/u/1?v=4",
        }}
      />

      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          fullName = item.full_name;
          private_ = item.private + "";
          login = item.owner.login;
          avatar_url = item.owner.avatar_url;
          type = item.owner.type;
          description = item.description;
          return (
            <View
              style={{
                borderColor: "red",
                borderWidth: 1,
                marginBottom: 10,
                borderRadius: 10,
                padding: 10,
              }}
            >
              <Text style={styles.repoText}>FullName: {fullName}</Text>
              <Text style={styles.repoText}>isPrivate: {private_}</Text>
              <Text style={styles.repoText}>Login: {login}</Text>
              <Text style={styles.repoText}>Avatar: {avatar_url}</Text>
              <Text style={styles.repoText}>Type: {type}</Text>
              <Text style={styles.repoText}>Description: {description}</Text>

              {InsertData([
                fullName,
                private_,
                login,
                avatar_url,
                type,
                description,
              ])}
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: {
    alignContent: "center",
    alignItems: "center",
    height: "100%",
    marginTop: "20",
    padding: 10,
  },
  fetchBtn: {
    borderWidth: 2,
    paddingHorizontal: 50,
    padding: 5,
    borderColor: "#ED1B24",
    borderRadius: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  repoText: {
    fontWeight: "bold",
  },
});
