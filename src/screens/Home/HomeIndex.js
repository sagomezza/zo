 import React from 'react';
import { View, Text, FlatList  } from 'react-native';
import FooterIndex from '../Footer/FooterIndex'
import HomeStyles from '../Home/HomeStyles'

const HomeIndex = () => {
  const placas = [
    { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500' },
    { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},
    { placa: 'EVW 590', pago: 'Pago por x horas', total: '$16.500'},  
  ];
  const carros = [
    { placa: 'EVL 590', codigo: 'Código:986009', hora:'11:28 PM', medio:'Pago x horas ' },
    { placa: 'EVL 590', codigo: 'Tarjeta:', hora:'11:28 PM', medio:'Mensualidad' },
  ];
  return (
    <View style={{flex: 1}}>
      <View style={{paddingLeft: '26%', paddingTop: '10%', flexDirection: "row", marginBottom: 50}}>
        <View style={HomeStyles.plateInput}>
          <Text style={HomeStyles.plateInputText}>
            10/30
          </Text>
        </View>
        <View style= {HomeStyles.plateInput}>
          <Text style={HomeStyles.plateInputText}>hkgffs</Text>
        </View>
      </View>
      <View style={{paddingBottom: 10}}>
        <View style={{paddingLeft:60}}>
          <Text >Historial de pagos</Text>
        </View>
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
        <View style={{paddingLeft:60, marginTop: 50}}>
          <Text >Carros parqueados</Text>
        </View>
        <FlatList
          data={carros}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
          <View style={{ flexDirection: "row", position: 'relative', marginBottom: 10,  marginLeft: 60, marginRight:70, marginTop: 20 }} >
            <View style={{marginBottom: 10, marginleft:10}} >
              <Text>{item.placa}</Text>
              <Text>{item.codigo}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text>{item.hora}</Text>
              <Text>{item.medio}</Text>
            </View>
          </View>
          )}}    
        />

        
      </View>
      <FooterIndex/>
    </View>
  );
};


export default HomeIndex;
