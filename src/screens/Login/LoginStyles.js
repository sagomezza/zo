import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#008999',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '15%'
    },
    loginText: {
      color: 'white',
      fontSize: normalize (21),
      marginBottom: 30,
      fontFamily: 'Montserrat-Bold'
    },
    titleInputText: {
      color: 'white',
      fontSize: normalize(15),
      fontFamily: 'Montserrat-Bold',
      paddingHorizontal: '2%'
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
      fontFamily: 'Montserrat-Light'
    },
    textInput: {
      fontSize: normalize(20),
      color: 'black',
      flex: 1,
      fontFamily: 'Montserrat-Regular'
    },
    infoContainer:{
      
    },
    textInputContainer: {
      backgroundColor: "#F0EEEE",
      height: normalize(40),
      width: "49%",
      borderRadius: normalize(18),
      flexDirection: "row",
      paddingHorizontal: '3%',
      borderWidth: 1,
      borderColor: "#707070",
      marginBottom: 20,
      
    },
});

export default styles;
