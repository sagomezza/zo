//Import dependencies

// Native dependecies
import React, { useState, useEffect } from 'react';
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
  Modal
} from 'react-native';
// Library dependecies
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";

// Constants dependecies
import { START_SHIFT, READ_ADMIN, READ_CORPO, READOFFICIAL } from "../../config/api/index";
import instance from "../../config/axios";
import * as actions from "../../redux/actions";
import { TIMEOUT } from '../../config/constants/constants';
// Styling dependecies
import styles from './LoginStyles';
import normalize from '../../config/services/normalizeFontSize';
import Button from '../../components/Button';
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

const LoginIndex = (props) => {
  const { navigation, officialProps } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");
  const [showInstructions, setShowInstructions] = useState(true);

  const onLoginPress = async () => {
    try {
      if (email === "" || password === "") {
        setError("Por favor ingresa todos los datos: correo y contraseña")
        return;
      }
      setLoading(true)
      /**
       * TO DO:
       * Implement validate.js here, check if email is an email, and password is alphanumeric
       * If they aren't update  error message and DO NOT CALL THE SIGN IN FUNCTION
       * In case everything is correct call the sign in function and then navigate to Home
       */
      let response = await auth.signInWithEmailAndPassword(email.toString(), password.toString())

      console.log(response.user.uid)
      // console.log(response.user.toJSON().stsTokenManager.accessToken)
      let fbToken = response.user.toJSON().stsTokenManager.accessToken
      if (Platform.OS === 'android' && Platform.Version < 23) {
        await AsyncStorage.setItem('firebaseToken', fbToken)

      } else {
        await SecureStore.setItemAsync('firebaseToken', fbToken)
      }


      let readOff = await instance.post(
        READOFFICIAL,
        { 
          email: email,
          uid:  response.user.uid
        },
        { timeout: TIMEOUT }
      )
      await startShift();
      props.setOfficial(readOff.data.data)
      setLoading(false)
      navigation.dispatch(CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }]
      }));

    } catch (err) {
      try {
        let readOff = await instance.post(
          READ_ADMIN,
          { email: email },
          { timeout: TIMEOUT }
        )
        let data = readOff.data.data
        readOff = await instance.post(
          READ_CORPO,
          { name: data.context },
          { timeout: TIMEOUT }
        )
        data.hqs = readOff.data.data.hqs
        props.setOfficial(data)
        setLoading(false)
        navigation.dispatch(CommonActions.reset({
          index: 1,
          routes: [{ name: 'Home' }]
        }));

      } catch (err) {
        setLoading(false)
        setError("El usuario y/o la contraseña que ingresaste son incorrectos.")
        console.log(err?.response)
      }
    }
  }

  const startShift = async () => {
    try {
      const response = await instance.post(START_SHIFT, {
        email: email,
        date: new Date(),
      });

    } catch (err) {
      console.log(err)
      console.log(err?.response)

    }
  }

  const { width, height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: '#00A9A0' }} >
      <ImageBackground style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }} source={require('../../../assets/images/Login.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={{ height: '18%', marginBottom: '3%' }}>
              <Image style={{ width: normalize(200), height: '70%' }} resizeMode={"contain"} source={require('../../../assets/images/icon.png')} />
            </View>
            <View style={{ height: '10%', width: '60%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text style={styles.loginText} >I  N  I  C  I  O     D  E     S  E  S  I  Ó  N</Text>
            </View>
            <View style={{ width: '100%', height: '25%', alignContent: 'center', alignItems: 'center' }}>
              <View>
                <Text style={styles.titleInputText}>Correo</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Ingresa tu correo"}
                    placeholderTextColor="#C9C1C1"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    value={email}
                    onChangeText={(text) => setEmail(text.trim())}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.titleInputText}>Contraseña</Text>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={"Ingresa tu contraseña"}
                    placeholderTextColor="#C9C1C1"
                    autoCapitalize={"none"}
                    autoCorrect={false}
                    value={password}
                    onChangeText={(text) => setPassword(text.trim())}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View>
                {error !== "" && <Text style={styles.alertText}>{error}</Text>}
              </View>
            </View>
            <View style={{ width: '55%', height: '10%', justifyContent: 'center', alignContent: 'center', marginTop: '6%' }}>
              <Button onPress={() => { onLoginPress(); }}
                title="I N G R E S A R"
                color='#FFE828'
                style={{
                  borderWidth: normalize(1),
                  borderColor: "#707070",
                  alignSelf: 'center',
                  width: '80%',
                  height: '60%',
                }}
                textStyle={{ color: "#00A9A0", fontFamily: 'Montserrat-Bold', fontSize: width * 0.032 }}
                activityIndicatorStatus={loading}
              />
              <TouchableOpacity style={{ alignSelf: 'center' }}>
                <Text style={styles.restoreText}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={showInstructions}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'

            }}>
              <View style={{
                margin: '4%',
                justifyContent: 'space-between',
                height: ' 70%',
                alignItems: 'center'
              }}>
                <MaterialIcons
                  name="warning"
                  color="#00A9A0"
                  size={75}
                />
                <Text style={styles.modalTextAlert}> Hola, para iniciar: </Text>
                <Text style={styles.modalTextAlert}> 1. Recuerda revisar la conexión a internet de tu dispositivo </Text>
                <Text style={styles.modalTextAlert}> 2. Inicia sesión con tu usuario y contraseña. </Text>
                <Text style={styles.modalTextAlert}> 3. Luego del cierre del día, recuerda cerrar tu sesión </Text>




              </View>
              <View style={{ height: '12%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                    setShowInstructions(false);
                  }}
                  title="E N T E N D I D O"
                  color="#00A9A0"
                  style={
                    styles.modalButton
                  }
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Bold'
                  }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
};

const mapStateToProps = (state) => {
  return {
    officialProps: state.official
  }
}

export default connect(mapStateToProps, actions)(LoginIndex);