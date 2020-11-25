import React, { Component } from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import FooterStyles from './styles';

const FooterIndex = () => {
    return (
      <View style={{flexDirection: 'row', position: 'absolute', bottom:0}}>
        <TouchableOpacity style ={FooterStyles.buttonH}>
          <Text style ={FooterStyles.footerText} >H</Text>  
        </TouchableOpacity>
        <TouchableOpacity style ={FooterStyles.buttonI}>
          <Text style ={FooterStyles.footerText} >Ingresos</Text>  
       </TouchableOpacity>
        <TouchableOpacity style ={FooterStyles.buttonS}>
          <Text style ={FooterStyles.footerText} >Salidas</Text>  
        </TouchableOpacity>

      </View>
    );
}

export default FooterIndex;