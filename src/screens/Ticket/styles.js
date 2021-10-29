import { StyleSheet, Dimensions } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    imageStyle: {
        flex: 1,
        width: '100%',
        height: '40%',
        flexDirection: 'column'
    },
    topContainer: {
        height: '20%',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    container: {
        height: '71%',
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    plateInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        height: '30%',
        width: '60%',
        marginBottom: '1%'
    },
    plateInput: {
        width: '46%',
        height: '100%',
        margin: '2%',
        fontSize: width * 0.06,
        fontFamily: 'Montserrat-Bold',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        color: '#00A9A0'
    },
    buttonContainer: {
        height: '30%',
        width: '45%',
        justifyContent: 'flex-end',
    },
    searchButtonDisabled: {
        borderRadius: 30,
        height: '80%',
        width: '100%',
        opacity: 0.5,
        marginTop: '2%'
    },
    searchButton: {
        borderRadius: 30,
        height: '80%',
        width: '100%',
        marginTop: '2%',
    },
    buttonTextSearch: {
        color: '#00A9A0',
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Medium',
        letterSpacing: 5
    },
    cleanButton: {
        borderRadius: 30,
        height: '80%',
        width: '100%',
        marginTop: '2%',
        borderWidth: 1,
        borderColor: '#FFFFFF'
    },
    buttonTextClear: {
        color: '#FFFFFF',
        fontSize: width * 0.03,
        fontFamily: 'Montserrat-Medium',
        letterSpacing: 5

    },
    infoButtonsContainer: {
        height: '97%',
        width: '87%',
        marginTop: '2%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    ticketInfoContainer: {
        height: '67%',
        width: '100%',
        marginTop: '5%',
        marginLeft: '4%',
        marginRight: '4%',
        alignContent: 'center',
        alignItems: 'center',
    },
    ticketName: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '4%',
    },
    infoTextNameTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.03,
        color: '#00A9A0',
        textAlign: 'center'

    },
    ticketInfo: {
        flexDirection: 'row',
        width: '100%',
        height: '13%',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    infoTextTitle: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.027,
        color: '#00A9A0',
        margin: '2%',
    },
    infoText: {
        fontFamily: 'Montserrat-Bold',
        fontSize: width * 0.025,
        color: '#8F8F8F',
        margin: '3%'
    },
    ticketInfoPlates: {
        flexDirection: 'row',
        width: '100%',
        height: '26%',
        backgroundColor: '#FFFFFF',
        borderRadius: 7,
        justifyContent: 'space-between',
        marginBottom: '2%'
    },
    plateListContainer: {
        flexDirection: 'column',
        width: '60%',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    ticketInfoButtonsContainer: {
        height: '16%',
        width: '80%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        marginBottom: '5%'
    },
    buttonRe: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00A9A0',
        height: normalize(40),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
    },
    buttonReDisabled: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#00A9A0',
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        opacity: 0.5
    },
    buttonTextRenew: {
        color: '#00A9A0',
        fontSize: width * 0.025,
        fontFamily: 'Montserrat-Bold',
        letterSpacing: 5
    },
    buttonEd: {
        height: normalize(30),
        width: '70%',
        margin: '1%',
        alignSelf: 'center',
    },
    buttonEdDisabled: {
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        opacity: 0.5
    },
    notFoundText: {
        fontSize: width * 0.034,
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center'
    },
    buttonCreate: {
        borderRadius: 30,
        height: normalize(50),
        width: '55%',
        margin: '1%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#00A9A0'
    },
    footer: {
        height: '10%',
        width: '100%',
        justifyContent: 'flex-end'
    },
});

export default styles;