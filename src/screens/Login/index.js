//Import dependencies

//-------- Native dependecies ------------
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Platform,
  Image,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
//-------- Library dependecies ------------
import axios from 'axios';
import { auth } from '../../config/firebase';
import * as SecureStore from 'expo-secure-store';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
//-------- Constants dependecies ------------
import {
  API,
  READOFFICIAL
} from '../../config/constants/api'
import { START_SHIFT, READ_ADMIN, READ_CORPO } from "../../config/api/index";
import * as actions from "../../redux/actions";
import { TIMEOUT } from '../../config/constants/constants';
//-------- Styling dependecies ------------
import styles from './LoginStyles';
import normalize from '../../config/services/normalizeFontSize';
import Button from '../../components/Button';
import instance from '../../config/axios';
import { ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

const LoginIndex = (props) => {
  const { navigation, officialProps } = props;

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState("")

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
      // console.log(response.user.toJSON().stsTokenManager.accessToken)
      let fbToken = response.user.toJSON().stsTokenManager.accessToken
      if (Platform.OS === 'android' && Platform.Version < 23) {
        await AsyncStorage.setItem('firebaseToken', fbToken)
      } else {
        await SecureStore.setItemAsync('firebaseToken', fbToken)
      }
      let readOff = await axios.post(
        `${API}${READOFFICIAL}`,
        { email: email },
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
        let readOff = await axios.post(
          `${API}${READ_ADMIN}`,
          { email: email },
          { timeout: TIMEOUT }
        )
        let data = readOff.data.data
        readOff = await axios.post(
          `${API}${READ_CORPO}`,
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

  const { height } = Dimensions.get('window');

  return (
    <View style={{ flex: 1, backgroundColor: '#00A9A0' }} >
      <ImageBackground style={{
        flex: 1,
        width: '100%',
        height: '100%',
        height
      }} source={require('../../../assets/images/Login.png')}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <View style={{ height: normalize(180), marginBottom: '3%' }}>
              <Image style={{ width: normalize(200), height: normalize(120) }} resizeMode={"contain"} source={require('../../../assets/images/icon.png')} />
            </View>
            <View style={{ height: normalize(100) }}>
              <Text style={styles.loginText} >I  N  I  C  I  O     D  E     S  E  S  I  Ó  N</Text>
            </View>
            <View style={{ width: '100%', height: normalize(240), alignContent: 'center', alignItems: 'center' }}>
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
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                  />
                </View>
              </View>
              <View>
                {error !== "" && <Text style={styles.alertText}>{error}</Text>}
              </View>
            </View>
            <View style={{ alignContent: 'flex-end', width: '100%', height: '8%', alignItems: 'center', marginTop: '15%' }}>
              <Button onPress={() => { onLoginPress(); }}
                title="I N G R E S A R"
                color='#FFE828'
                style={{
                  borderWidth: normalize(1),
                  borderColor: "#707070",
                  alignSelf: 'center',
                  width: '69%',
                  height: '15%',
                  margin: '2%',
                  paddingHorizontal: '15%',
                  paddingVertical: '1%'
                }}
                textStyle={{ color: "#00A9A0", fontFamily: 'Montserrat-Bold', fontSize: normalize(20), }}
                activityIndicatorStatus={loading}
              />
              <TouchableOpacity>
                <Text style={styles.restoreText}>Olvidé mi contraseña</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    officialProps: state.official,
  }
}

export default connect(mapStateToProps, actions)(LoginIndex);