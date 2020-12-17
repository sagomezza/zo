import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      marginLeft: '13%',
      marginRight: '13%',
      paddingTop: '25%',
      backgroundColor: '#ffffff', 
    },
    HeadStyleTable: { 
      height: 40,
      alignContent: "center",
      
    },
    plateInput: {
      width: '40%', 
      height: '95%',
      margin:'3%',
      fontSize: normalize(25),
      fontFamily: 'Montserrat-Regular',
      color: '#008999',
      backgroundColor: 'rgba(0,0,0,0.04)'
    },
    textInput: {
      width: '86%', 
      height: '80%',
      marginRight: '5%',
      marginLeft: '5%', 
      borderColor: 'gray', 
      marginBottom: '10%',
      fontSize:normalize(25),
      fontFamily: 'Montserrat-Regular',
      color: '#008999',
      backgroundColor: 'rgba(0,0,0,0.04)'

    },
    buttonI: {
      borderRadius:20,
      alignItems: 'center',
      height: 50,
      width: 80,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: 'gray'
    },
    buttonT: {
      borderRadius:20,
      alignItems: 'center',
      height: 50,
      width:50,
      backgroundColor: "#008999",
      borderRadius: 15,
      
      
    },
    buttonText: {
      color:'#707070',
      fontSize: 20,
      marginTop: '12%',
      fontFamily: 'Montserrat-Bold'
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      
    },
    modalView: {
      height: 200,
      padding: 35,
      borderRadius:20,
      borderColor: '#707070',
      borderWidth: 1,
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#FFF',
      shadowColor: '#FFF',
      shadowOffset: {
        width: 50,
        height: 50,
      },
      shadowOpacity: 0,
      shadowRadius: 50,
      elevation: 5,
    },
    openButton: {
      backgroundColor: "#F194FF",
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      borderColor: '#D9D9D9',
      borderWidth:1
    },
    textStyle: {
      color: "gray",
      fontWeight: "bold",
      textAlign: "center",
      fontFamily: 'Montserrat-Regular'
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily: 'Montserrat-Regular'
    },
    tableText: {
        fontFamily: 'Montserrat-Regular',
    },
    
});

export default styles;