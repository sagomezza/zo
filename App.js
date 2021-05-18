import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text, AsyncStorage } from 'react-native';
import SnackBar from 'react-native-snackbar-component'
import normalize from './src/config/services/normalizeFontSize';
import NoConnectionModal from './src/components/NoConnectionModal';
import { Provider } from "react-redux";
import store from './src/config/store'
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/components/AuthContext";
import { auth } from "./src/config/firebase";
import RootStack from "./src/navigators/RootStack"
import * as Font from 'expo-font';
import { AppLoading } from "expo";
import instance from "./src/config/axios";
import { READ_OFFICIAL } from "./src/config/api";
import { READ_ADMIN, READ_CORPO, STORAGE_KEY } from "./src/config/api/index";
import { setOfficial, setExpoToken } from "./src/redux/actions";
import * as Network from 'expo-network';
import moment from 'moment';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import * as Sentry from 'sentry-expo';



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const fetchFont = () => {
  return Font.loadAsync({
    'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
    'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
  })
}

const App = () => {
  const [fontLoaded, setfontLoaded] = useState(false);
  const [currentUser, setUser] = useState("");
  const [initialRouteName, setInitialRouteName] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [lastLoginAt, setLastLoginAt] = useState('');
  const [logoutSnackbar, setLogoutSnackbar] = useState(false)
  const [officialData, setOfficialData] = useState({});
  const officialScheduleStart = officialData.schedule !== undefined ? officialData.schedule.start : "NONE";
  const dateNow = new Date()
  let diffOfficialScheduleStart = moment(dateNow).diff(officialScheduleStart, 'hours', true);



  // const saveLastLoginAt = async (lastLoginAt) => {
  //   try {
  //     await AsyncStorage.setItem(STORAGE_KEY, lastLoginAt)
  //   } catch {

  //   }
  // }
  

  const checkInternetReachable = () => {
    // console.log("-------Connection Information------")
    Network.getNetworkStateAsync().then(state => {
      // console.log('Connection type:', state.type);
      // console.log('Is connected?:', state.isConnected);
      // console.log('Is internet reachable?:', state.isInternetReachable);
      state.isConnected === false ? setIsConnected(false) : setIsConnected(true);
    });
  }

  const checkOfficialHours = () => {

    // console.log(diffOfficialScheduleStart)
    if (
      Number(diffOfficialScheduleStart) === 7.25 ||
      Number(diffOfficialScheduleStart) === 7.5 ||
      Number(diffOfficialScheduleStart) === 7.75 ||
      Number(diffOfficialScheduleStart) === 8 
    ) {
      setLogoutSnackbar(true);

    }

  }

  useEffect(() => {
    checkInternetReachable();
    checkOfficialHours();
  }, [diffOfficialScheduleStart])

  Sentry.init({
    dsn: 'https://022b0475f7b147aba62d6d1988bf95df@o479500.ingest.sentry.io/5644578',
    enableInExpoDevelopment: true,
    debug: false, // Sentry will try to print out useful debugging information if something goes wrong with sending an event. Set this to `false` in production.
  });

  const readUser = async (userEmail) => {
    //console.log("USER. ", userEmail);
    if (userEmail) {
      try {
        const response = await instance.post(READ_OFFICIAL, {
          email: userEmail
        });
        if (response.data.response) {
          store.dispatch(setOfficial(response.data.data));
          console.log(response)
          setOfficialData(response.data.data)
        }
      } catch (error) {
        try {
          let readOff = await instance.post(
            READ_ADMIN,
            { email: userEmail })
          let data = readOff.data.data
          readOff = await instance.post(
            READ_CORPO,
            { name: data.context }
          )
          data.hq = readOff.data.data.hqs
          store.dispatch(setOfficial(data));
          setOfficialData(data)

        } catch (err) {
          console.log(err)
          console.log(err?.response)
        }

        //console.log("err: ", error);
      }
    }
    setLoginState(false);
  }
  const changeMe = 'heyyou'

  const updateUserState = useCallback((user) => {
    // console.log("[App/updateUserState] ", user);
    // if (user.lastLoginAt !== null ) saveLastLoginAt(user.lastLoginAt);
    if (user) {
      // console.log("[metadata] ", auth.currentUser.metadata);
      // console.log(user.lastLoginAt)
      setUser(user);
      setInitialRouteName("Home");
      readUser(user.email);
    } else {
      setUser(null);
      setInitialRouteName("Login");
      setLoginState(false);
    }

  }, [changeMe]);


  useEffect(() => {
    setLoginState(true);
    // const userLastLoginAt =  AsyncStorage.getItem(STORAGE_KEY)
    // if (userLastLoginAt !== null) setLastLoginAt(userLastLoginAt)
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(updateUserState);
    // unsubscribe to the listener when unmounting
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });
    // unsubscribe to the listener when unmounting
    return () => {
      unsubscribe();
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, [changeMe]);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      store.dispatch(setExpoToken(token));
    } else {
      //alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  if (loginState || initialRouteName === "") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={50} color={"#00A9A0"} />
      </View>
    );
  }

  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFont}
      onError={() => console.log('ERROR')}
      onFinish={() => {
        setfontLoaded(true)
      }}
    />;
  }

  return (
    isConnected ? (
      <Provider store={store}>
        <AuthProvider value={{ currentUser }}>
          <NavigationContainer >
            <RootStack initialRouteName={initialRouteName} />

          </NavigationContainer>
          <SnackBar
            visible={logoutSnackbar}
            textMessage="Recuerda realizar el cierre de caja y posterior cierre de sesión antes de terminar tu turno."
            actionHandler={() => { setLogoutSnackbar(false) }}
            actionText="Entendido"
            backgroundColor="#FFF200"
            accentColor="#00A9A0"
            messageColor="#00A9A0"
            messageStyle={{ fontSize: 60 }}
            containerStyle={{ height: 90 }}
          />
        </AuthProvider>
      </Provider>) : (
      <NoConnectionModal onCheck={checkInternetReachable} />
    )

  );


}

export default App;