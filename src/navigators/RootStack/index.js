import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from "../../screens/Login";

import HomeStack from "../HomeStack";
import MainDrawer from "../MainDrawer/MainDrawer";
// import HeaderTitle from "components/StackHeader";

const Stack = createStackNavigator();

const RootStack = ({ initialRouteName }) => {
  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      // headerMode='none'
      screenOptions={{
        //headerTitle: (props) => <HeaderTitle {...props} />,
        headerStyle: {
          backgroundColor: "#2DD47F",
          height: 100,
        },
        // headerTitleAlign: "center",
        headerTitleAlign: "left",
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
        // headerLeftContainerStyle: { borderWidth: 2, borderColor: "red" },
        headerTitleContainerStyle: { left: "15%" },
        // headerLeft: () => (
        //     <MaterialIcons.Button
        //         name={"arrow-back"}
        //         backgroundColor="lightgray"
        //         size={40}
        //         onPress={() => {
        //             navigation.goBack();
        //         }}
        //     />
        // ),
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          //title: "Mi perfil",
        }}
      />
      
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          // title: "Home",
        }}
      />
      {/* <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{
          headerShown: false,
          // title: "Home",
        }}
      /> */}
    </Stack.Navigator>
  );
};

export default RootStack;
