import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        height: '91.5%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listContainer: {
        height: '95%',
        width: '73%',
        marginTop: '3%',
        borderRadius: 10,
        alignItems: 'center'
    },
    textPlaca: {
        fontSize: width * 0.03,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Bold'
    },
    textListTitle: {
        fontSize: width * 0.025,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
    textPago: {
        fontSize: width * 0.02,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: width * 0.03,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textInputContainer: {
        width: '100%', 
        height: '10%' 
    },
    textInput: {
        width: '100%',
        height: '60%',
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Bold',
        color: '#8F8F8F',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
      },
      titleText: {
        fontFamily: 'Montserrat-Bold',
        color: '#00A9A0',
        marginLeft: '3%',
        fontSize: width * 0.025
      }
});

export default styles;