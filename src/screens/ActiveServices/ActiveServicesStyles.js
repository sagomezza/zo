import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    listContainer: {
        height: '77%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'center',
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
});

export default styles;