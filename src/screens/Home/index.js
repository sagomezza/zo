import React, { useEffect, useState } from 'react';
import { View, Text, FlatList  } from 'react-native';
import Footer from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import Logout from '../Menu/MenuStyles';
import instance from "../../config/axios";
import { GET_RECIPS } from "../../config/api";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const HomeIndex = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.official.hq[0] !== undefined ? officialProps.official.hq[0] : "";
  const [ recips, setRecips ] = useState([]);

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialHq
        });
        if(response.data.response === 1){
          //console.log("res: ", response.data.data.finished);
          setRecips(response.data.data.finished);
        }
      } catch (error) {
        //console.log("err: ", error);
      }
    };

    getRecips();
  }, []);

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
      <Logout navigation={navigation}/> 
      <View style={{paddingLeft: '26%', paddingTop: '10%', flexDirection: "row", marginBottom: 50}}>
        <View style={HomeStyles.plateInput}>
          <Text style={HomeStyles.plateInputText}>
            55/112
          </Text>
          
        </View>
        <View style= {HomeStyles.plateInput}>
          <Text style={HomeStyles.plateInputText}>85/200</Text>
        </View>
      </View>
      <View style={{paddingBottom: 10}}>
        <View style={{paddingLeft:60}}>
          <Text style={HomeStyles.textPago} >Historial de pagos</Text>
        </View>
        <FlatList
          data={placas}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
          <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#008999", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
            <View style={{marginBottom: 10}} >
              <Text style={HomeStyles.textPlaca}>{item.placa}</Text>
              <Text style={HomeStyles.textPago}>{item.pago}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text style={HomeStyles.textMoney}>{item.total}</Text>
            </View>
          </View>
          )}}
        />   
        <View style={{paddingLeft:60, marginTop: 50}}>
          <Text style={HomeStyles.textPago}>Carros parqueados</Text>
        </View>
        <FlatList
          data={carros}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
          <View style={{ flexDirection: "row", position: 'relative', marginBottom: 10,  marginLeft: 60, marginRight:70, marginTop: 20 }} >
            <View style={{marginBottom: 10, marginleft:10}} >
              <Text style={HomeStyles.textPlaca} >{item.placa}</Text>
              <Text style={HomeStyles.textPago}>{item.codigo}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text style={HomeStyles.textMoney}>{item.hora}</Text>
              <Text style={HomeStyles.textPago}>{item.medio}</Text>
            </View>
          </View>
          )}}    
        />

        
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};


const mapStateToProps = (state) => ({
  officialProps: state.official
});

export default connect(mapStateToProps, actions)(HomeIndex);
