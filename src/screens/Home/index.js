import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image  } from 'react-native';
import Footer from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import Logout from '../Menu/MenuStyles';
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ } from "../../config/api";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

const HomeIndex = (props) => {
  const { navigation, officialProps } = props;
  //console.log("officialProps: ", officialProps);
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [ recips, setRecips ] = useState([]);
  const [ vehiclesData, setVehiclesData ] = useState({
    availableCars: 0,
    availableBikes: 0,
    totalCars: 0,
    totalBikes: 0,
  });
  const [ reservations, setReservations ] = useState([]);

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialHq
        });
        if(response.data.response === 1){
          //console.log("res: ", response.data.data.finished);
          setRecips(response.data.data.finished);
          props.setRecips(response.data.data.finished);
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
          setReservations(response.data.data.reservations);
          props.setReservations(response.data.data.reservations);
          props.setHq(response.data.data);
        }
      } catch (error) {
        console.log("err: ", error);
      }
    };

    getRecips();
    readHq();
  }, []);


  return (
    <View style={{flex: 1}}>
      <Logout navigation={navigation}/> 
      <View style={{paddingLeft: '26%', paddingTop: '10%', flexDirection: "row", marginBottom: 50}}>
        <View style={HomeStyles.plateInput}>
        <Image style={{width:40, height: 40, marginBottom: 50}} resizeMode={"contain"} source={require( '../../../assets/images/TrazadoC.png' )}/>
          <Text style={HomeStyles.plateInputText}>
            {`${vehiclesData.availableBikes}/${vehiclesData.totalBikes}`}
          </Text>
          
        </View>
        <View style= {HomeStyles.plateInput}>
        <Image style={{width:40, height: 40, marginBottom: 50}} resizeMode={"contain"} source={require( '../../../assets/images/TrazadoM.png' )}/>
          <Text style={HomeStyles.plateInputText}>
          {`${vehiclesData.availableCars}/${vehiclesData.totalCars}`}
          </Text>
        </View>
      </View>
      <View style={{paddingBottom: "60%"}}>
        <View style={{paddingLeft:60}}>
          <Text style={HomeStyles.textPago} >Historial de pagos</Text>
        </View>
        <FlatList
          style= {{height: "40%"}}
          data={recips}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
          <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#008999", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >
            <View style={{marginBottom: 10}} >
              <Text style={HomeStyles.textPlaca}>{item.plate}</Text>
              <Text style={HomeStyles.textPago}>{`Pago por ${item.hours} horas`}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text style={HomeStyles.textMoney}>${item.total}</Text>
            </View>
          </View>
          )}}
        />   
        
        <View style={{paddingLeft:60, marginTop: 30}}>
          <Text style={HomeStyles.textPago}>Carros parqueados</Text>
        </View>
        <View>
        {reservations.length > 0 ? 
          <FlatList
          styles={{marginBottom: 20}}
          data={reservations}
          keyExtractor={({ id }) => id}
          renderItem={({item}) => {
          return (
            <View style={{ flexDirection: "row", position: 'relative',  borderBottomWidth: 1, borderColor: "#008999", marginBottom: 10, marginLeft: 60, marginRight:70, marginTop: 20 }} >            
            <View style={{marginBottom: 10, marginleft:10}} >
              <Text style={HomeStyles.textPlaca} >{item.plate}</Text>
              <Text style={HomeStyles.textPago}>{item.verificationCode}</Text>
            </View>
            <View style={{ flex: 1, alignItems:'flex-end'}} >
              <Text style={HomeStyles.textMoney}>{new Date(item.dateStart).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Text>
              <Text style={HomeStyles.textPago}>Pago por hora</Text>
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
