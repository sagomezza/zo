import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeIndex from '../../screens/Home/index'
import HomeStack from "../HomeStack/index";
import DrawerContent from '../../components/DrawerContent';
import LogoutIndex from '../../screens/Logout/LogoutIndex';

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name='Back' component={HomeStack} />
            <Drawer.Screen name="Logout" component={LogoutIndex} />

        </Drawer.Navigator>
    );
}

export default MainDrawer;


// const MainDrawer = ({ navigation }) => {
//   return (
//     <Drawer.Navigator
//       initialRouteName={initialRouteName}
//       screenOptions={{
//         //headerTitle: (props) => <HeaderTitle {...props} />,
//         headerStyle: {
//           backgroundColor: "#2DD47F",
//           // backgroundColor: "#f0f0f0",
//           height: 100 ,
//         },
//         // headerTitleAlign: "center",
//         headerTitleAlign: "center",
//         headerTitleStyle: {
//           color: "white",
//         },
//         headerTintColor: "white",
//         headerBackTitleVisible: false,
//       }}
//       // drawerContent={(props) => {
//       //   const filteredProps = {
//       //     ...props,
//       //     state: {
//       //       ...props.state,
//       //       routeNames: props.state.routeNames.filter(
//       //         // To hide single option
//       //         // (routeName) => routeName !== 'HiddenPage1',
//       //         // To hide multiple options you can add & condition
//       //         (routeName) => {
//       //           console.log(routeName)
//       //           routeName !== 'Home'
//       //         },
//       //       ),
//       //       routes: props.state.routes.filter(
//       //         (route) =>{
//       //           console.log(2)
//       //           console.log(route)
//       //           route.name !== 'Home'
//       //         },
//       //       ),
//       //     },
//       //   };
//       //   return (
//       //     <DrawerContentScrollView {...filteredProps}>
//       //       <DrawerItemList {...filteredProps} />
//       //     </DrawerContentScrollView>
//       //   );
//       // }}
//     >
//       <Drawer.Screen
//         name="Home"
//         component={HomeIndex}
//         options={{
//           headerShown: false,
//           headerLeft: null,
//           sideMenu: null,
//           // drawerLabel: () => null
//           // headerLeft: () => (
//           //   <MaterialIcons.Button
//           //     name="menu"
//           //     // color={"#009387"}
//           //     backgroundColor="lightgray"
//           //     size={25}
//           //     onPress={() => navigation.openDrawer()}
//           //   />
//           // ),
//         }}
//       />
//       <Drawer.Screen
//         name="Logout"
//         component={LogoutIndex}
//         options={{
//           headerShown: false,
//           headerLeft: null,
//         }}
//       />
//       <Drawer.Screen
//         name="UserInput"
//         component={UserInput}
//         options={{
//           headerShown: false,
//           headerLeft: null,
//         }}
//       />
//       <Drawer.Screen
//         name="UserOut"
//         component={UserOut}
//         options={{
//           headerShown: false,
//           headerLeft: null,
//         }}
//       />
//       <Drawer.Screen
//         name="QRscanner"
//         component={Qr}
//         options={{
//           headerShown: false,
//           headerLeft: null,
//         }}
//       />
      
//     </Drawer.Navigator>
//   );
// };

// export default MainDrawer;
