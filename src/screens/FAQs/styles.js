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
        justifyContent: 'space-between'
    },
    listContainer: {
        height: '78%',
        width: '90%',
        backgroundColor: '#F8F8F8',
        marginTop: '8%',
        borderRadius: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1
    },
    textListTitle: {
        fontSize: normalize(20),
        color: '#00A9A0',
        fontFamily: 'Montserrat-Bold'
    },
});

export default styles;