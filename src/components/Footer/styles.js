import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const FooterStyles = StyleSheet.create({ 
    footerText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: normalize(18),
      fontFamily: 'Montserrat-Bold'
    },
    footerTextI: {
      textAlign: 'center',
      color: '#00A9A0',
      fontSize: normalize(18),
      fontFamily: 'Montserrat-Bold'
    },
    
    buttonI: {
      borderRadius: 30,
      height: '42%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: '10%',
      margin: '3%'       
    },
    buttonS: {
      borderRadius: 30,
      height: '42%',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
      paddingHorizontal: '10%',
      margin: '3%'      
    },
});

export default FooterStyles;