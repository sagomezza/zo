import React from 'react';
import { StyleSheet, View, Text, FlatList} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';
import FooterIndex from '../Footer/FooterIndex'

const LogoutIndex = () => {

  const HomeStyles = StyleSheet.create({
    plateInput: {
      borderColor: 'gray', 
      borderWidth: 1,
      borderRadius: 20,
    },
    plateInputText: {
      fontSize: 35,
      textAlign: 'center',
      marginTop: '8%'
    },
  });

  const name = 'Santiago Gómez Barrero';
  const place = 'Hospital Manuel Uribe Ángel';
  const dateMonthIn = new Date('05/05/20');
  const dateMonthOut = new Date('07/05/20');
  const totalPay = 385000;

  const placas = [
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500' },
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},
  { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},  
  ];
  
  return (
  <View style={{flex: 1}}>
   
    <View style={{alignItems: 'center', marginTop: '30%'}}>
        {<Text style={{fontSize: 20}}>{name}</Text>}
        {<Text>{place}</Text>}
        
        <Text>{"Hora de inicio: " + moment(dateMonthIn).format('hh:MM A ') + " Hora de salida: " + moment(dateMonthOut).format('hh:MM A')}</Text>
        <View style={{flexDirection: 'row', paddingBottom: '5%', marginTop: '10%'}}>
          <View style={{marginRight: 10, marginTop: 15}}>
            <Text>{"Valor ingresado"}</Text>
          </View>
          <View style={{marginRight: 20}}>
            <TextInput
              style={{fontSize: 25, width: '150%', ...HomeStyles.plateInput, textAlign: 'center'}}
              value={'$ ' + totalPay}
            />
          </View>
        </View>
      </View>
      
    <View style={{paddingBottom: 10}}>
      <FlatList
        data={placas}
        keyExtractor={({ id }) => id}
        renderItem={({item}) => {
        return (
        <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#96A3A0", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
          <View style={{marginBottom: 10}} >
            <Text>{item.placa}</Text>
            <Text>{item.pago}</Text>
          </View>
          <View style={{ flex: 1, alignItems:'flex-end'}} >
            <Text>{item.total}</Text>
          </View>
        </View>
        )}}
      />   
    </View>
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={HomeStyles.plateInput}>
        <Text style={{fontSize: 20, margin: '3%'}}>  Cerrar turno</Text>
      </TouchableOpacity>
    </View>
    <FooterIndex/>
  </View>
  );
}

export default LogoutIndex;