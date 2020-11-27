import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, ActivityIndicator } from 'react-native'
import { Provider } from "react-redux";
import store from './src/config/store'
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/components/AuthContext";
import { auth } from "./src/config/firebase";
import RootStack from "./src/navigators/RootStack"
import Screen from './src/screens/Menu/MenuStyles';
import * as Font from 'expo-font';
import {AppLoading} from "expo";

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
  const [initialRouteName, setInitialRouteName] = useState("Login");
  const [loginState, setLoginState] = useState(false);

  
  
  const updateUserState = useCallback((user) => {
    // console.log("[App/updateUserState] ", user);
    if (user) {
      // console.log("[metadata] ", auth.currentUser.metadata);
      // console.log(user)
      setUser(user);
      setInitialRouteName("Home");
    } else {
      setUser(null);
      setInitialRouteName("Login");
    }
    setLoginState(false);
  }, []);

  useEffect(() => {
    setLoginState(true);
    // listen for auth state changes
    const unsubscribe = auth.onAuthStateChanged(updateUserState);
    // unsubscribe to the listener when unmounting

    return () => unsubscribe();
  }, []);

  if (loginState || initialRouteName === "") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={50} color={"#2DD47F"} />
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
    <Provider store={store}>
      <AuthProvider value={{ currentUser }}>
        <NavigationContainer>
          <RootStack initialRouteName={initialRouteName} />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );

  
}

export default App;