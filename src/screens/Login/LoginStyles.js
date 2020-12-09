import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#008999',
      alignItems: 'center',
      justifyContent: 'center'
    },
    loginText: {
      color: 'white',
      fontSize: 22,
      marginBottom:30,
      fontFamily: 'Montserrat-Bold'
    },
    titleInputText: {
      color: 'white',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold'
    },
    alertText: {
      color: '#FFE828',
      fontSize: 15,
      fontFamily: 'Montserrat-Bold'
    },
    enterText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      fontFamily: 'Montserrat-Bold'
    },
    button:{
      height: 30,
      width: "28%",
      borderRadius:20,
      backgroundColor : '#FFE828',
      marginLeft :50,
      marginRight:50,
      marginTop :50,
      marginBottom: 10,
      
    },
    restoreText: {
      color: 'white',
      fontSize:15,
      fontFamily: 'Montserrat-Light'
    },
    textInput: {
      fontSize: 20,
      fontWeight: 'normal',
      color: 'black',
      flex: 1,
      fontFamily: 'Montserrat-Regular'
    },
    infoContainer:{
      
    },
    textInputContainer: {
      backgroundColor: "#F0EEEE",
      height: 40,
      width: "49%",
      borderRadius: 20,
      flexDirection: "row",
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#707070",
      marginBottom: 20,
      
    },
});

export default styles;
