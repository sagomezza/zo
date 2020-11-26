import React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
// import { MaterialIcons } from "@expo/vector-icons";
import Home from "../../screens/Home/HomeIndex";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        //headerTitle: (props) => <HeaderTitle {...props} />,
        headerStyle: {
          backgroundColor: "#2DD47F",
          // backgroundColor: "#f0f0f0",
          height: 100 ,
        },
        // headerTitleAlign: "center",
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerLeft: null,
          // headerLeft: () => (
          //   <MaterialIcons.Button
          //     name="menu"
          //     // color={"#009387"}
          //     backgroundColor="lightgray"
          //     size={25}
          //     onPress={() => navigation.openDrawer()}
          //   />
          // ),
        }}
      />

    </Stack.Navigator>
  );
};

export default HomeStack;
