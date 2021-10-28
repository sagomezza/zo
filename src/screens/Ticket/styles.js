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
});

export default styles;