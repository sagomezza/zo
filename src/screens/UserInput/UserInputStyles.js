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
      height: normalize(60),
      margin:'3%',
      fontSize: normalize(35),
      fontFamily: 'Montserrat-Regular',
      color: '#008999',
      backgroundColor: 'rgba(0,0,0,0.04)'
    },
    textInput: {
      width: '86%', 
      height: normalize(60),
      marginRight: '5%',
      marginLeft: '5%', 
      borderColor: 'gray', 
      marginBottom: '10%',
      fontSize:normalize(35),
      fontFamily: 'Montserrat-Regular',
      color: '#008999',
      backgroundColor: 'rgba(0,0,0,0.04)'
    },
    buttonI: {
      borderRadius: 4,
      alignItems: 'center',
      height: normalize(45),
      width: '100%',
      padding: '2%',
    },
    buttonT: {
      borderRadius: 4,
      alignItems: 'center',
      alignContent: 'center',
      height:  normalize(45),
      width: normalize(45) ,
      backgroundColor: "#008999",
      padding: '1%',
      marginLeft: '2%'
    },
    buttonText: {
      color:'#FFFFFF',
      fontSize: normalize(25),
      fontFamily: 'Montserrat-Regular'
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