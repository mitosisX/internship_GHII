import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { DeleteItemById, getAllData } from "../Utils/SqliteHandler";
import { useState } from "react";
import { FlatList } from "react-native";

// Query data

export default function CRUDScreen() {
  let [dbData, setDBData] = useState([]);

  const confirmDeleteAlert = (id, index) =>
    Alert.alert(
      "Confirm",
      `Delete item for owner "${dbData[index].fullName}"`,
      [
        {
          text: "Yes",
          onPress: () => {
            DeleteItemById(id);
            console.log(id, "index ", index);
            const splicedData = dbData.splice(index);
            setDBData(splicedData);
          },
          style: "default",
        },

        {
          text: "Cancel",
          // onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );

  const dis = () => {
    getAllData((d) => {
      setDBData(d);
    });
  };

  deleteItem = (id, index) => {
    // console.log(id, " index ", index);
    confirmDeleteAlert(id, index);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => dis()} style={styles.fetchBtn}>
        <Text style={{ fontWeight: "bold" }}>Display</Text>
      </TouchableOpacity>
      <FlatList
        data={dbData}
        renderItem={({ item, index }) => {
          return (
            <View style={{ padding: 10 }}>
              <View
                style={{
                  borderColor: "red",
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <View>
                  <Text style={styles.repoText}>{item.fullName}</Text>
                  <Text style={styles.repoText}>{item.isPrivate}</Text>
                  <Text style={styles.repoText}>{item.login}</Text>
                  <Text style={styles.repoText}>{item.avatarURL}</Text>
                  <Text style={styles.repoText}>{item.type}</Text>
                  <Text style={styles.repoText}>{item.description}</Text>
                </View>
                <TouchableOpacity onPress={() => deleteItem(item.id, index)}>
                  <Image
                    style={{ width: 50, height: 50 }}
                    source={require("../../assets/remove.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fetchBtn: {
    borderWidth: 2,
    paddingHorizontal: 50,
    padding: 5,
    alignSelf: "flex-start",
    borderColor: "#ED1B24",
    borderRadius: 20,
    marginTop: 20,
  },
  repoText: {
    fontWeight: "bold",
  },
});
