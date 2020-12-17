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
import { START_SHIFT } from "../../config/api/index";
import * as actions from "../../redux/actions";
import { TIMEOUT } from '../../config/constants/constants';
//-------- Styling dependecies ------------
import styles from './LoginStyles';
import normalize from '../../config/services/normalizeFontSize';
import Button from '../../components/Button';


const LoginIndex = (props) => {
  const { navigation, officialProps } = props;

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
      // console.log(response.user.toJSON().stsTokenManager.accessToken)
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
      setError("El usuario y/o la contraseña que ingresaste son incorrectos.")
      console.log(err?.response)
    }
  }

  const startShift = async () => {
    try {
      const response = await instance.post (START_SHIFT, {
        email: officialProps.email,
        date: new Date(),
      });
      console.log('------------------')
      console.log(response.data)
      console.log('------------------')

    } catch (err) {
      console.log('----------1--------')
      console.log(err?.response)
      console.log('----------1--------')

    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <View style={styles.container}> 
      <View style={{height: '23%'}}>
        <Image style={{width: normalize(210), height: normalize (125), marginBottom: normalize(50)}} resizeMode={"contain"} source={require( '../../../assets/images/icon.png' )}/>
      </View>
      <View style={{height: '7%'}}>
        <Text style={styles.loginText} >Inicio de sesión</Text>
      </View>
      <View style={{width: '100%', height: '25%', alignContent: 'center', alignItems: 'center'}}>
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
              onChangeText={(text) => setEmail(text)}
            />
          </View>
        </View>
        <View>
          <Text style={styles.titleInputText }>Contraseña</Text>
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
        {error !== "" && <Text style={styles.alertText}>{error}</Text>}
      </View>
      <View style={{alignContent:'center', width: '100%', height: '10%', alignItems:'center',}}>
          
          {/* <TouchableOpacity
            onPress={onLoginPress}
            >
            <View style={styles.button}>
            <Text style={styles.enterText}>Ingresar</Text>
            </View>
          </TouchableOpacity> */}
          <Button onPress={() => {startShift(); onLoginPress(); } }
              title="Ingresar" 
              color='#FFE828' 
              style={{ borderWidth: normalize (1), 
                       borderColor: "#707070", 
                       alignSelf: 'center',
                       width: '60%',
                       heigth: '10%',
                       margin: '2%',
                       paddingHorizontal: '11%',
                      }} 
              textStyle={{color: "#FFFFFF", fontFamily: 'Montserrat-Bold',fontSize: normalize(20),}} />
          <TouchableOpacity>
            <Text style={styles.restoreText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const mapStateToProps = (state) => {
  return {
    officialProps: state.official,
  }
}

export default connect(mapStateToProps, actions)(LoginIndex);