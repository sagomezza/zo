import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const styles = StyleSheet.create({
    container: {
        height: normalize(659),
        backgroundColor: '#F8F8F8',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        alignContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        height: '75%',
        width: '73%',
        backgroundColor: '#FFFFFF',
        marginTop: '5%',
        borderRadius: 10,
        alignItems: 'center',
    },
    plateInput: {
        width: '46%',
        height: '100%',
        margin: '2%',
        fontSize: normalize(38),
        fontFamily: 'Montserrat-Bold',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        color: '#00A9A0'
    },
    buttonI: {
        borderRadius: 30,
        height: normalize(35),
        width: '100%',
        marginLeft: '0%',
        paddingHorizontal: '24%',
    },
    buttonRe: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '24%',
    },
    buttonReDisabled: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '24%',
        opacity: 0.5
    },
    buttonEd: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '28%',
    },
    buttonEdDisabled: {
        borderRadius: 30,
        height: normalize(30),
        width: '100%',
        marginLeft: '0%',
        margin: '1%',
        paddingHorizontal: '28%',
        opacity: 0.5
    },
    buttonTextSearch: {
        color: '#00A9A0',
        fontSize: normalize(20),
        fontFamily: 'Montserrat-Bold'
    },
    buttonTextRenew: {
        color: '#FFFFFF',
        fontSize: normalize(15),
        fontFamily: 'Montserrat-Bold',
    },
    buttonIDisabled: {
        borderRadius: 30,
        height: normalize(35),
        width: '100%',
        marginLeft: '0%',
        paddingHorizontal: '24%',
        opacity: 0.5
    },
    infoText: {
        fontFamily: 'Montserrat-Regular'
    },
});

export default styles;