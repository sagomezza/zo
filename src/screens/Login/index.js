//Import dependencies

// Native dependecies
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
// Library dependecies
import { auth } from "../../config/firebase";
import * as SecureStore from "expo-secure-store";
import { connect } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
// Constants dependecies
import {
  START_SHIFT,
  READ_ADMIN,
  READ_CORPO,
  READ_OFFICIAL,
  REVOKE_CURRENT_SESSIONS,
} from "../../config/api/index";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { TIMEOUT } from "../../config/constants/constants";
// Styling dependecies
import styles from "./LoginStyles";
import normalize from "../../config/services/normalizeFontSize";
import Button from "../../components/Button";
import CustomModal from "../../components/CustomModal";

import { ImageBackground } from "react-native";
import { Dimensions } from "react-native";
import store from "../../config/store";
import * as Device from "expo-device";
import * as Sentry from "@sentry/browser";

const LoginIndex = (props) => {
  const { navigation, officialProps } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  const handleEmail = (text) => {
    let email = text.trim()
    setEmail(email)
  }

  const firstLogin = async () => {
    try {
      if (email === "" || password === "") {
        setError("Por favor ingresa todos los datos: correo y contraseña");
        return;
      }
      setLoading(true);
      let response = await auth.signInWithEmailAndPassword(
        email.toString(),
        password.toString()
      );
      props.setUid(response.user.uid);
      await revokeCurrentSessions(response.user.uid);
    } catch (err) {
      setLoading(false);
      Sentry.captureException(err);
      setError("El usuario y/o la contraseña que ingresaste son incorrectos.");
    }
  };

  const onLoginPress = async () => {
    try {
      if (email === "" || password === "") {
        setError("Por favor ingresa todos los datos: correo y contraseña");
        return;
      }
      setLoading(true);
      /**
       * TO DO:
       * Implement validate.js here, check if email is an email, and password is alphanumeric
       * If they aren't update  error message and DO NOT CALL THE SIGN IN FUNCTION
       * In case everything is correct call the sign in function and then navigate to Home
       */
      let response = await auth.signInWithEmailAndPassword(
        email.toString(),
        password.toString()
      );
      let fbToken = response.user.toJSON().stsTokenManager.accessToken;
      if (Platform.OS === "android" && Platform.Version < 23) {
        await AsyncStorage.setItem("firebaseToken", fbToken);
      } else {
        await SecureStore.setItemAsync("firebaseToken", fbToken);
      }
      if (response) {
        let readOff = await instance.post(
          READ_OFFICIAL,
          {
            email: email,
          },
          { timeout: TIMEOUT }
        );
        await startShift();
        props.setOfficial(readOff.data.data);
        store.dispatch(actions.setOfficial(readOff.data.data));
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Home" }],
          })
        );
      }

    } catch (err) {
      Sentry.captureException(err)
      try {
        let readOff = await instance.post(
          READ_ADMIN,
          { email: email },
          { timeout: TIMEOUT }
        );
        let data = readOff.data.data;
        readOff = await instance.post(
          READ_CORPO,
          { name: data.context },
          { timeout: TIMEOUT }
        );
        data.hqs = readOff.data.data.hqs;
        props.setOfficial(data);
        setLoading(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "Home" }],
          })
        );
      } catch (err) {
        Sentry.captureException(err)
        setLoading(false);
        setError(
          "El usuario y/o la contraseña que ingresaste son incorrectos."
        );
        console.log(err?.response)
      }
    }
  };

  const revokeCurrentSessions = async (uid) => {
    try {
      const response = await instance.post(REVOKE_CURRENT_SESSIONS, {
        uid: uid,
        deviceId: `${Device.brand}-${Device.modelName}-${Device.deviceName}-${Device.deviceYearClass}`,
      });
      onLoginPress();
    } catch (err) {
      Sentry.captureException(err);
      onLoginPress();
      // setLoading(false);
      // console.log(err);
      // console.log(err?.response);
    }
  };

  const startShift = async () => {
    try {
      const response = await instance.post(START_SHIFT, {
        email: email,
        date: new Date(),
      });
    } catch (err) {
      Sentry.captureException(err)
      // console.log(err);
      // console.log(err?.response);
    }
  };

  const { width, height } = Dimensions.get("window");

  return (
    <View style={{ flex: 1, backgroundColor: "#00A9A0" }}>
      <ImageBackground
        style={styles.backgroundImage}
        source={require("../../../assets/images/Login.png")}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={{ height: "18%", marginBottom: "3%" }}>
              <Image
                style={{ width: normalize(200), height: "70%" }}
                resizeMode={"contain"}
                source={require("../../../assets/images/icon.png")}
              />
            </View>
            <View style={styles.loginTextContainer} >
              <Text style={styles.loginText}>
                INICIO DE SESIÓN
              </Text>
            </View>
            <View style={styles.inputsContainer}>
              <View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Email"}
                    placeholderTextColor="#8F8F8F"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    value={email}
                    onChangeText={handleEmail}
                  />
                </View>
              </View>
              <View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Contraseña"}
                    placeholderTextColor="#8F8F8F"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    value={password}
                    onChangeText={(text) => setPassword(text.trim())}
                    secureTextEntry={true}
                  />
                </View>
              </View>

            </View>
            <View style={styles.buttonContainer}>
              <View>
                {error !== "" && <Text style={styles.alertText}>{error}</Text>}
              </View>
              <Button
                onPress={firstLogin}
                title="ENTRAR"
                color="#FFF200"
                style={styles.button}
                textStyle={styles.buttonText}
                activityIndicatorStatus={loading}
              />
              <TouchableOpacity style={{ alignSelf: "center" }}>
                <Text style={styles.restoreText}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <CustomModal
        visible={showInstructions}
        type='workerInstructions'
        onClose={() => {
          setShowInstructions(false);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    officialProps: state.official,
  };
};

export default connect(mapStateToProps, actions)(LoginIndex);
