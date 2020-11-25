//Import dependencies

//-------- Native dependecies ------------
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from 'react-native';
//-------- Library dependecies ------------
import axios from 'axios';
import { auth } from '../../config/firebase'
import * as SecureStore from 'expo-secure-store'
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';
//-------- Constants dependecies ------------
import {
  API,
  READOFFICIAL
} from '../../config/constants/api'
import * as actions from "../../redux/actions";
import { TIMEOUT } from '../../config/constants/constants'
//-------- Styling dependecies ------------
import styles from './LoginStyles'

const LoginIndex = (props) => {
  const { navigation } = props;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const onLoginPress = async () => {
    try {
      if (email === "" || password === "") {
        setError("Por favor ingresa todos los datos: correo y contraseña")
        return;
      }
      /**
       * TO DO:
       * Implement validate.js here, check if email is an email, and password is alphanumeric
       * If they aren't update  error message and DO NOT CALL THE SIGN IN FUNCTION
       * In case everything is correct call the sign in function and then navigate to Home
       */
      let response = await auth.signInWithEmailAndPassword(email.toString(), password.toString())
      console.log(response.user.toJSON().stsTokenManager.accessToken)
      let fbToken  =response.user.toJSON().stsTokenManager.accessToken
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
      props.setOfficial(readOff.data.data)
      navigation.dispatch(CommonActions.reset({
        index: 1,
        routes: [{ name: 'Home' }]
      }));
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.loginText} >Inicio de sesión</Text>
      <Text style={{ marginRight: '36%', ...styles.titleInputText }}>Correo</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={"Ingresa tu correo"}
          placeholderTextColor="#C9C1C1"
          autoCapitalize={"none"}
          autoCorrect={false}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      <Text style={{ marginRight: '32%', ...styles.titleInputText }}>Contraseña</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder={"Ingresa tu contraseña"}
          placeholderTextColor="#C9C1C1"
          autoCapitalize={"none"}
          autoCorrect={false}
          textContentType={'password'}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      {error !== "" && <Text style={styles.alertText}>{error}</Text>}
      <TouchableOpacity
        onPress={onLoginPress}
        style={styles.button}>
        <Text style={styles.enterText}>Ingresar</Text>
      </TouchableOpacity>
      <Text style={styles.restoreText}>Olvidé mi contraseña</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    official: state.official,
  }
}

export default connect(mapStateToProps, actions)(LoginIndex);