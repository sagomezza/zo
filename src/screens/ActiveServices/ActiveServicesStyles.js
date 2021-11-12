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
        height: '77%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textPlaca: {
        fontSize: width * 0.023,
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold',
        marginTop: '0%',
        width: '15%',
        height: '100%',
        textAlign: 'center'
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
        fontSize: width * 0.03,
        color: '#5D5D5D',
        fontFamily: 'Montserrat-Regular'
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
    dateDaysText: {
        fontSize: width * 0.02,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Medium'
    },
    paymentType: {
        fontSize: width * 0.02,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Medium',
        width: '16%',
        textAlign: 'center'
      },
    dateHourText: {
        fontSize: width * 0.02,
        color: '#19A9A0',
        fontFamily: 'Montserrat-Medium'
    },
    titleText:{
        fontSize: width * 0.023,
        color: '#6F6F7B',
        fontFamily: 'Montserrat-Bold',
      },
});

export default styles;