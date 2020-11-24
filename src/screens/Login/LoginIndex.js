import React from 'react';
import { View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import styles from './LoginStyles'

const LoginIndex = () => {
    return (
        <View style={styles.container}>
          <Text style={styles.loginText} >Inicio de sesión</Text> 
          <Text style={{ marginRight: '36%',...styles.titleInputText}}>Correo</Text>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder={"Ingresa tu correo"} 
              placeholderTextColor="#C9C1C1" 
              autoCapitalize={"none"} 
              autoCorrect={false}
            />
          </View>
          <Text style={{ marginRight: '32%',...styles.titleInputText}}>Contraseña</Text>
          <View style={styles.textInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder={"Ingresa tu contraseña"} 
              placeholderTextColor="#C9C1C1" 
              autoCapitalize={"none"} 
              autoCorrect={false}
              textContentType= {'password'}
            /> 
          </View>
          
          <Text style={styles.alertText}>Hola! este es un mensaje de alerta</Text>
          <TouchableOpacity
                style ={styles.button}>
            <Text style={styles.enterText}>Ingresar</Text>  
          </TouchableOpacity>
          <Text style={styles.restoreText}>Olvidé mi contraseña</Text>                 
        </View>
      );
};

export default LoginIndex;
