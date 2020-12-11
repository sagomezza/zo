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
  const { navigation, officialProps, reservations, recips } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  // const [ recips, setRecips ] = useState([]);
  const [ vehiclesData, setVehiclesData ] = useState({
    availableCars: 0,
    availableBikes: 0,
    totalCars: 0,
    totalBikes: 0,
  });
  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialHq
        });
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
          setVehiclesData({
            availableCars: response.data.data.availableCars,
            availableBikes: response.data.data.availableBikes,
            totalCars: response.data.data.totalCars,
            totalBikes: response.data.data.totalBikes
          });
          
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
            {`${vehiclesData.availableBikes}/${vehiclesData.totalBikes}`}
          </Text>
          
        </View>
        <View style= {HomeStyles.plateInput}>
        <Image style={{width:"25%", height: "25%", marginTop: "5%", marginLeft: "5%"}} resizeMode={"contain"} source={require( '../../../assets/images/TrazadoC.png' )}/>
          <Text style={HomeStyles.plateInputText}>
          {`${vehiclesData.availableCars}/${vehiclesData.totalCars}`}
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
              <Text  key={item.id} style={HomeStyles.textPlaca}>{item.plate}</Text>
              <Text  key={item.id} style={HomeStyles.textPago}>{`Pago por ${item.hours} horas`}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text key={item.id} style={HomeStyles.textMoney}>${item.total}</Text>
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
              <Text key={item.id} style={HomeStyles.textPlaca} >{item.plate}</Text>
              <Text key={item.id} style={HomeStyles.textPago}>{item.verificationCode}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
          <Text key={item.id} style={HomeStyles.textMoney}>{moment((item.dateStart._seconds)*1000).format('LT')}</Text>
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
  name: state.recips
});

export default connect(mapStateToProps, actions)(HomeIndex);
