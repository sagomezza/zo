import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image
} from 'react-native';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import HomeStyles from '../Home/HomeStyles';
import instance from "../../config/axios";
import moment from 'moment';
// api
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL, EDIT_ADMIN } from "../../config/api";
import { TIMEOUT } from '../../config/constants/constants';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from '../../config/store';
import { firestore } from '../../config/firebase';

const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";

  useEffect(() => {
    const getRecips = async () => {
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialHq,
          officialEmail: officialProps.email
        },
          { timeout: TIMEOUT }
        );
        if (response.data.response === 1) {
          store.dispatch(actions.setRecips(response.data.data));
        }
      } catch (err) {
        console.log(err?.response)
        // console.log("err: ", err);
      }
    };

    const updateExpoToken = async () => {
      try {
        await instance.post(EDIT_OFFICIAL, {
          id: officialProps.id,
          expoToken: props.expoToken.expoToken
        },
          { timeout: TIMEOUT }
        );
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

    // const parked = (hqId) => {

    //   try {
    //     firestore.collection("headquarters")
    //       .get()
    //       .then(snapshot => {
    //         if (snapshot.empty) {
    //           console.log('---------------nope')
    //         } else {
    //           snapshot.forEach(doc => {
    //             console.log(doc)
    //             console.log('---------------yep')

    //           })
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error)
    //       })

    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    const readHq = async () => {
      try {
        const response = await instance.post(READ_HQ, {
          id: officialHq
        },
          { timeout: TIMEOUT }
        );
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
    readHq();
    updateExpoToken();
    // parked(officialHq);
  }, []);

  const formatHours = (hours) => {
    if (typeof hours === "number" || typeof hours === "double" || typeof hours === "long" || typeof hours === "float") {
      return Math.round(hours)
    } else return hours
  }

  return (
    <View style={{ flex: 1 }}>
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
                <View style={{ flexDirection: 'row', height: '30%' }}>
                  <Text style={HomeStyles.plateInputTextBig}>
                    {`${hq.occupiedBikes}`}
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
                <View style={{ flexDirection: 'row', height: '30%' }}>
                  <Text style={HomeStyles.plateInputTextBig}>
                    {`${hq.occupiedCars}`}
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
                          <Text style={HomeStyles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                          <Text style={HomeStyles.textPago}>Pago por
                          {
                              item.hours === '1 month' ? ' mensualidad' : `${formatHours(item.hours)} horas`
                            }
                          </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                          <Text style={HomeStyles.textMoney}>
                            {item.cash === 0 && item.change < 0 ? '' : ''}
                            {item.cash > 0 && item.change < 0 ? `$${numberWithPoints(item.total)}` : ''}
                            {item.cash > 0 && item.change > 0 ? `$${numberWithPoints(item.total)}` : ''}
                          </Text>
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
                          <Text style={HomeStyles.textPago}>
                            Pago por
                            {item.prepayFullDay === true ? " pase día" : ""}
                            {item.mensuality === true ? " mensualidad" : ""}
                            {item.isParanoic === true ? " horas" : ""}
                            {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? " horas" : ""}
                          </Text>
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
