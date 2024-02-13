import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import CRUDScreen from "../Screens/CRUDScreen";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();
export default function TabNavigation() {
  return (
    <Tab.Navigator activeColor="#307DE1">
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: (color, size) => (
            <FontAwesome name="home" size={24} color={"black"} />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="CRUD"
        component={CRUDScreen}
        options={{
          tabBarIcon: (color, size) => (
            <FontAwesome name="bookmark" size={24} color={"black"} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}
