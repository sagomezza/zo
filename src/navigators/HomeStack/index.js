import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeIndex from "../../screens/Home/index";
import UserInput from "../../screens/UserInput/UserInputIndex";
import UserOut from "../../screens/UserExit/UserExitIndex";
import Qr from "../../screens/Qr/QRIndex";
import { createDrawerNavigator} from "@react-navigation/drawer"; 
import CashBalance from "../../screens/CashBalance/PdfIndex";
import Transactions from "../../screens/Transactions/TransactionsIndex";
import ActiveServices from "../../screens/ActiveServices/ActiveServicesIndex";
import NewsReport from "../../screens/NewsReport/NewsReportIndex";
import MonthlyPayments from "../../screens/MonthlyPayments/MonthlyPaymentsIndex";
import Blacklist from '../../screens/Blacklist/index';
import FAQs from '../../screens/FAQs';
import LogoutIndex from '../../screens/Logout/LogoutIndex';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2DD47F",
          height: 100 ,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          color: "white",
        },
        headerTintColor: "white",
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="Home1"
        component={HomeIndex}
        options={{
          headerShown: false,
          headerLeft: null,
          sideMenu: null,
        }}
      />
      <Stack.Screen
        name="UserInput"
        component={UserInput}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="UserOut"
        component={UserOut}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="QRscanner"
        component={Qr}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="CashBalance"
        component={CashBalance}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Transactions"
        component={Transactions}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="ActiveServices"
        component={ActiveServices}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="NewsReport"
        component={NewsReport}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="MonthlyPayments"
        component={MonthlyPayments}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Blacklist"
        component={Blacklist}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="FAQs"
        component={FAQs}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      <Stack.Screen
        name="Logout"
        component={LogoutIndex}
        options={{
          headerShown: false,
          headerLeft: null,
        }}
      />
      
    </Stack.Navigator>
  );
};

export default HomeStack;
