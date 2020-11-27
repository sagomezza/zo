import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: { 
      flex: 1,
      paddingLeft: '15%',
      paddingRight: '15%',
      paddingTop: '30%',
      backgroundColor: '#ffffff' 
    },
    HeadStyleTable: { 
      height: 40,
      alignContent: "center",
      
    },
    plateInput: {
      width: '30%', 
      height: 80,
      borderColor: 'gray', 
      marginRight: '5%',
      marginLeft: '5%', 
      borderWidth: 1,
      borderRadius: 20,
      fontSize: 35,
      fontFamily: 'Montserrat-Regular'
    },
    numberInput: {
      width: '70%', 
      height: 60,
      borderColor: 'gray', 
      marginBottom: '10%',
      borderWidth: 1,
      borderRadius: 20,
      fontSize: 25,
      fontFamily: 'Montserrat-Regular'
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
      borderWidth: 1,
      borderRadius: 15,
      borderColor: 'gray'
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