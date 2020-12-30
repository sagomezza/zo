import { StyleSheet } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';

const FooterStyles = StyleSheet.create({ 
    footerText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: normalize(32),
      fontFamily: 'Montserrat-Regular'
    },
    buttonH: {
      backgroundColor: '#00A9A0',
      borderWidth: 1,
      borderColor:'#FFFFFF',
      flex:1,
      height: normalize(48),
      alignContent: 'center',
      alignItems: 'center'
        
    },
    buttonI: {
      backgroundColor: '#00A9A0',
      borderWidth:1,
      borderColor:'#FFFFFF',
      flex:3.5,
      height: normalize(48)
        
    },
    buttonS: {
      backgroundColor: '#00A9A0',
      borderWidth:1,
      borderColor:'#FFFFFF', 
      flex:3.5,
      height: normalize(48)
       
    },
});

export default FooterStyles;