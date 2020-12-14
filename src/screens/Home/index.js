import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image  } from 'react-native';
import Footer from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import Logout from '../Menu/MenuStyles';
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ } from "../../config/api";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from '../../config/store';
import moment from 'moment';

const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialProps.hq[0]
        });
        console.log(response.data)
        if(response.data.response === 1){
          
          store.dispatch(actions.setRecips(response.data.data.finished));
        }
      } catch (error) {
        //console.log("err: ", error);
      }
    };

    const readHq = async () => {
      try {
        const response = await instance.post(READ_HQ, {
          id: officialHq
        });
        if(response.data.response){
          store.dispatch(actions.setReservations(response.data.data.reservations));
          store.dispatch(actions.setHq(response.data.data));
        }
      } catch (error) {
        console.log("err: ", error);
      }
    };

    getRecips();
    readHq();
  }, []);

  return (
    <View style={{flex: 1, alignContent: "center",backgroundColor:"#FFFF"}}>
      <Logout navigation={navigation}/> 
      <View style={{alignItems:"flex-end"}}>
      <View style={{padding: '6%', flexDirection: "row"}}>
        <View style={HomeStyles.plateInput}>
        <Image style={{width:"24%", height: "24%", marginTop: "5%", marginLeft: "5%"}} resizeMode={"contain"} source={require( '../../../assets/images/TrazadoM.png' )}/>
          <Text style={HomeStyles.plateInputText}>
            {`${hq.availableBikes}/${hq.totalBikes}`}
          </Text>
          
        </View>
        <View style= {HomeStyles.plateInput}>
        <Image style={{width:"25%", height: "25%", marginTop: "5%", marginLeft: "5%"}} resizeMode={"contain"} source={require( '../../../assets/images/TrazadoC.png' )}/>
          <Text style={HomeStyles.plateInputText}>
          {`${hq.availableCars}/${hq.totalCars}`}
          </Text>
        </View>
      </View>
      </View>
      <View style={{paddingBottom: "60%"}}>
        <View style={{paddingLeft:60}}>
          <Text style={HomeStyles.textPago} >Historial de pagos</Text>
        </View>
        <View style={{height: "53%"}}>
        {recips.recips.length > 0 ? 
        <FlatList
          style= {{height: "40%"}}
          data={recips.recips}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
          <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#008999", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
            <View style={{marginBottom: 10}} >
              <Text   style={HomeStyles.textPlaca}>{item.plate}</Text>
              <Text   style={HomeStyles.textPago}>{`Pago por ${item.hours} horas`}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text  style={HomeStyles.textMoney}>${item.total}</Text>
            </View>
          </View>
          )}}
        />
        :
        <View style={{paddingLeft:60, marginTop: 10}}>
          <Text style={HomeStyles.textPago}> No se encuentran registros en el historial </Text>
        </View>
        }   
        </View>
        <View style= {{height:"45%"}}>
        <View style={{paddingLeft:60, marginTop: 30}}>
          <Text style={HomeStyles.textPago}>Carros parqueados</Text>
        </View>
         
        {reservations.reservations.length > 0 ? 
          <FlatList
          styles={{marginBottom: 20}}
          data={reservations.reservations}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
            <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#FFFFFF", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >            
            <View style={{marginBottom: 10, marginleft:10}} >
              <Text  style={HomeStyles.textPlaca} >{item.plate}</Text>
              <Text style={HomeStyles.textPago}>{item.verificationCode}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
          <Text style={HomeStyles.textMoney}>{moment(item.dateStart).format('LT')}</Text>
              <Text style={HomeStyles.textPago}>Pago por horas</Text>
            </View>
          </View>
          )}}    
        /> :
        <View style={{paddingLeft:60, marginTop: 10}}>
          <Text style={HomeStyles.textPago}>No hay parqueos activos en este momento</Text>
        </View>
        }
        </View>
        
        
      </View>
      <Footer navigation={navigation}/>
    </View>
  );
};


const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq
});

export default connect(mapStateToProps, actions)(HomeIndex);
