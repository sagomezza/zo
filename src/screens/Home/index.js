import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import FooterIndex from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import Button from '../../components/Button';
import instance from "../../config/axios";
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL, EDIT_ADMIN } from "../../config/api";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from '../../config/store';
import moment from 'moment';
import numberWithPoints from '../../config/services/numberWithPoints';
import normalize from '../../config/services/normalizeFontSize';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/Header/HeaderIndex';

const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialProps.hq[0]
        });
        if (response.data.response === 1) {
          store.dispatch(actions.setRecips(response.data.data.finished));
        }
      } catch (error) {
        console.log(err?.response)
        console.log("err: ", error);
      }
    };

    const updateExpoToken = async () => {
      try {
        await instance.post(EDIT_OFFICIAL, {
          id: officialProps.id,
          expoToken: props.expoToken.expoToken
        });
      } catch (err) {
        try {
          await instance.post(EDIT_ADMIN, {
            id: officialProps.id,
            expoToken: props.expoToken.expoToken
          });
        } catch (err) {
          console.log("[updateExpoToken - Home screen]:", err)
          console.log(err?.response)
        }
      }
    }

    const readHq = async () => {
      try {
        const response = await instance.post(READ_HQ, {
          id: officialHq
        });
        if (response.data.response) {
          store.dispatch(actions.setReservations(response.data.data.reservations));
          store.dispatch(actions.setHq(response.data.data));
        }
      } catch (err) {
        console.log("err: ", err);
        console.log(err?.response)
      }
    };

    getRecips();
    // getShiftRecips();
    readHq();
    updateExpoToken();
  }, []);

  const formatHours = (hours) => {
    if (typeof hours === "number" || typeof hours === "double" || typeof hours === "long" || typeof hours === "float") {
      return Math.round(hours)
    } else return hours
  }

  const keyGenerator = () => '_' + Math.random().toString(36).substr(2, 9)
  
  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{ heigth: '14%' }} >
        <Button onPress={() => navigation.navigate("Logout")}
          title="Cerrar sesión"
          color="transparent"
          style={{
            borderWidth: 1,
            borderColor: "#00A9A0",
            alignSelf: 'flex-end',
            width: '30%',
            heigth: '10%',
            marginRight: '5%',
            marginTop: '6%',
            paddingHorizontal: '2%',
            borderRadius: 9
          }}
          textStyle={{ color: "#00A9A0" }} />
      </View> */}
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '40%',
          flexDirection: 'column'
        }}
        source={require('../../../assets/images/Home.png')}>
        <Header navigation={navigation} />
        <View style={HomeStyles.plateContainer}>

          <View style={{ ...HomeStyles.plateInput, alignItems: 'center', alignContent: 'center' }}>
            <ImageBackground
              style={{
                width: '78%',
                height: '98%',
                marginLeft: '42%'
              }}
              resizeMode={"contain"}
              source={require('../../../assets/images/Circulo.png')}>
              <View style={{
                height: '70%',
                width: '70%',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: '13%',
                marginLeft: '4%'
              }} >
                <Image style={{ width: "40%", height: "40%", marginTop: '10%' }} resizeMode={"contain"} source={require('../../../assets/images/TrazadoM.png')} />
                <View style={{ flexDirection: 'row', height: '100%' }}>
                  <Text style={HomeStyles.plateInputTextBig}>
                    {`${hq. totalBikes - hq.availableBikes}`}
                  </Text>
                  <Text style={HomeStyles.plateInputTextSmall} >{`/${hq.totalBikes}`}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={HomeStyles.plateInput}>
            <ImageBackground
              style={{
                width: '78%',
                height: '98%',
                marginLeft: '10%'

              }}
              resizeMode={"contain"}
              source={require('../../../assets/images/Circulo.png')}>
              <View style={{
                height: '70%',
                width: '70%',
                flexDirection: 'column',
                alignItems: 'center',
                alignContent: 'center',
                marginTop: '13%',
                marginLeft: '4%'
              }} >
                <Image style={{ width: "38%", height: "38%", marginTop: '10%' }} resizeMode={"contain"} source={require('../../../assets/images/TrazadoC.png')} />
                <View style={{ flexDirection: 'row', height: normalize(170) }}>
                  <Text style={HomeStyles.plateInputTextBig}>
                    {`${hq.totalCars - hq.availableCars}`}
                  </Text>
                  <Text style={HomeStyles.plateInputTextSmall} >{`/${hq.totalCars}`}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={{
          height: '66%',
          backgroundColor: '#F8F8F8',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          alignContent: 'center',
          alignItems: 'center',

        }}>
          <View style={{ height: '38%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '2%', borderRadius: 10 }}>
            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
              <Text style={HomeStyles.textListTitle} >HISTORIAL DE PAGOS</Text>
            </View>
            <View style={{ height: "72%" }}>
              {recips.recips.length > 0 ?
                <FlatList
                  style={{ height: "37%" }}
                  data={recips.recips}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                        <View style={{ marginBottom: '2%' }} >
                          <Text style={HomeStyles.textPlaca}>{item.plate}</Text>
                          <Text style={HomeStyles.textPago}>Pago por ${formatHours(item.hours)} horas</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                          <Text style={HomeStyles.textMoney}>{`$${numberWithPoints(item.total)}`}</Text>
                        </View>
                      </View>
                    )
                  }}
                />
                :
                <View style={{ marginLeft: '13%', padding: '10%' }}>
                  <Text style={HomeStyles.textPago}> No se encuentran registros en el historial </Text>
                </View>
              }
            </View>
          </View>
          <View style={{ height: '38%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '1%', borderRadius: 10 }}>
            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
              <Text style={HomeStyles.textListTitle} >VEHÍCULOS PARQUEADOS</Text>
            </View>
            <View style={{ height: "72%" }}>
              {reservations.reservations.length > 0 ?
                <FlatList
                  style={{ height: "37%" }}
                  data={reservations.reservations}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                        <View style={{ marginBottom: '2%' }} >
                          <Text style={HomeStyles.textPlaca}>{item.plate}</Text>
                          <Text style={HomeStyles.textPago}>{item.verificationCode}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end' }} >
                          <Text style={HomeStyles.textMoney}>{moment(item.dateStart).format('L')}  {moment(item.dateStart).format('LT')}</Text>
                          <Text style={HomeStyles.textPago}>Pago por {item.prepaidDay === true ? "pase día": "horas"}</Text>
                        </View>
                      </View>
                    )
                  }}
                />
                :
                <View style={{ marginLeft: '13%', padding: '10%' }}>
                  <Text style={HomeStyles.textPago}>No hay parqueos activos en este momento</Text>
                </View>
              }
            </View>
          </View>
          <View style={{ height: '17%', width: '100%', justifyContent: 'flex-end' }}>
            <FooterIndex navigation={navigation} />
          </View>
        </View>

      </ImageBackground>
    </View>
  );
};


const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken
});

export default connect(mapStateToProps, actions)(HomeIndex);
