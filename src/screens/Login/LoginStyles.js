import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#008999',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 22,
      marginBottom:30
    },
    titleInputText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 15
    },
    alertText: {
      color: '#FFE828',
      fontSize: 15
    },
    enterText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#FFFFFF',
      textAlign: 'center',
      marginTop: '5%'
    },
    button:{
      height: "5%",
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
      fontSize:15
    },
    textInput: {
      fontSize: 25,
      fontWeight: 'normal',
      color: 'black',
      flex: 1
    },
    infoContainer:{
      
    },
    textInputContainer: {
      backgroundColor: "#F0EEEE",
      height: "6%",
      width: "49%",
      borderRadius: 20,
      flexDirection: "row",
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: "#707070",
      marginBottom: 20
    },
});

export default styles;
