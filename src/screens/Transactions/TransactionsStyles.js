import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center',
        height: '91%',
    },
    listContainer: {
        height: '78%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    list: {
        flexDirection: "row",
        backgroundColor: '#FFFFFF',
        marginTop: '3%',
        borderRadius: 7,
        justifyContent: 'space-around',
        paddingTop: '2%',
        paddingBottom: '2%'
    },
    titleText: {
        fontSize: width * 0.023,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Bold',
    },
    textPlaca: {
        fontSize: width * 0.023,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold',
        width: '15%',
        height: '100%',
        textAlign: 'center'
    },
    dateDaysText: {
        fontSize: width * 0.02,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Medium'
    },
    dateDaysText: {
        fontSize: width * 0.02,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Medium'
    },
    textPago: {
        fontSize: normalize(13),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: normalize(19),
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textListTitle: {
        fontSize: width * 0.035,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },

    textPago: {
        fontSize: width * 0.02,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
    textMoney: {
        fontSize: width * 0.034,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
    },
});

export default styles;