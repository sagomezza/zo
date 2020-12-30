import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
import {Dimensions} from 'react-native'; 

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      height,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15%',
      flexDirection: 'column'
    },
    loginText: {
      color: 'white',
      fontSize: normalize (21),
      marginBottom: 30,
      fontFamily: 'Montserrat-Bold'
    },
    titleInputText: {
      color: 'white',
      fontSize: normalize(20),
      fontFamily: 'Montserrat-Bold',
      paddingHorizontal: '0%',
      paddingBottom: '1%'
    },
    alertText: {
      color: '#FFE828',
      fontSize: normalize(14),
      fontFamily: 'Montserrat-Regular'
    },
    enterText: {
      fontSize: normalize (20),
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Bold'
    },
    button:{
      height: normalize(30),
      width: "50%",
      borderRadius:20,
      backgroundColor : '#FFE828',
      alignContent: 'center',
      alignItems: 'center'
      
    },
    restoreText: {
      color: 'white',
      fontSize: normalize(15),
      fontFamily: 'Montserrat-Regular'
    },
    textInput: {
      fontSize: normalize(17),
      color: 'black',
      flex: 1,
      fontFamily: 'Montserrat-Regular'
    },
    infoContainer:{
      
    },
    textInputContainer: {
      backgroundColor: "#F0EEEE",
      height: normalize(35),
      width: "55%",
      borderRadius: normalize(18),
      flexDirection: "row",
      paddingHorizontal: '3%',
      borderWidth: 1,
      borderColor: "#707070",
      marginBottom: '7%',
      
    },
});

export default styles;
