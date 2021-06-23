import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator
} from 'react-native';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import styles from '../Home/HomeStyles';
import instance from "../../config/axios";
import moment from 'moment';
// api
import { GET_RECIPS, READ_HQ, EDIT_OFFICIAL, EDIT_ADMIN, READ_OFFICIAL } from "../../config/api";
import { TIMEOUT } from '../../config/constants/constants';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from '../../config/store';

const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [loadingRecips, setLoadingRecips] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(true);

  useEffect(() => {
    const offData =async () => {
      try {
        let response = await instance.post(
          READ_OFFICIAL,
          {
            email: officialProps.email,
          },
          { timeout: TIMEOUT }
        );
        store.dispatch(actions.setOfficial(response.data.data));
        
      } catch (err) {
        // console.log(err?.response)

      }
    }


    const getRecips = async () => {
      setLoadingRecips(true);
      try {
        const response = await instance.post(GET_RECIPS, {
          hqId: officialHq,
          officialEmail: officialProps.email
        },
          { timeout: TIMEOUT }
        );
        if (response.data.response === 1) {
          store.dispatch(actions.setRecips(response.data.data));
          setLoadingRecips(false);
        }
      } catch (err) {
        setLoadingRecips(false);
        // console.log(err?.response)
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
          // console.log("[updateExpoToken - Home screen]:", err)
          console.log(err?.response)
        }
      }
    }

    const readHq = async () => {
      setLoadingReservations(true);
      try {
        const response = await instance.post(READ_HQ, {
          id: officialHq
        },
          { timeout: TIMEOUT }
        );
        if (response.data.response === 1) {
          store.dispatch(actions.setReservations(response.data.data.reservations));
          store.dispatch(actions.setHq(response.data.data));
          setLoadingReservations(false);
        }
      } catch (err) {
        setLoadingReservations(false);
        console.log("err: ", err);
        console.log(err?.response)
      }
    };

    getRecips();
    readHq();
    updateExpoToken();
    offData();
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
        style={styles.topImage}
        source={require('../../../assets/images/Home.png')}>
        <Header navigation={navigation} />
        <View style={styles.plateContainer}>
          <View style={{
            ...styles.plateInput,
            alignItems: 'center',
            alignContent: 'center'
          }}>
            <ImageBackground
              style={{
                width: '78%',
                height: '98%',
                marginLeft: '42%'
              }}
              resizeMode={"contain"}
              source={require('../../../assets/images/Circulo.png')}>
              <View style={styles.bikeCounter} >
                <Image
                  style={styles.bikeImage}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/TrazadoM.png')}
                />
                <View style={{ flexDirection: 'row', height: '30%' }}>
                  <Text style={styles.plateInputTextBig}>
                    {`${hq.occupiedBikes}`}
                  </Text>
                  <Text style={styles.plateInputTextSmall} >
                    {`/${hq.totalBikes}`}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.plateInput}>
            <ImageBackground
              style={{
                width: '78%',
                height: '98%',
                marginLeft: '10%'
              }}
              resizeMode={"contain"}
              source={require('../../../assets/images/Circulo.png')}>
              <View style={styles.bikeCounter} >
                <Image
                  style={styles.carImage}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/TrazadoC.png')}
                />
                <View style={{ flexDirection: 'row', height: '30%' }}>
                  <Text style={styles.plateInputTextBig}>
                    {`${hq.occupiedCars}`}
                  </Text>
                  <Text style={styles.plateInputTextSmall} >
                    {`/${hq.totalCars}`}
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.listContainer}>
            <View style={{
              marginLeft: '10%',
              marginBottom: '3%',
              marginTop: '3%'
            }}>
              <Text style={styles.textListTitle} >HISTORIAL DE PAGOS</Text>
            </View>
            {loadingRecips ?
              <View style={{ height: "72%" }}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <ActivityIndicator size={"large"} color={'#00A9A0'} />
                </View>
              </View>
              :
              <View style={{ height: "72%" }}>
                {recips.recips.length > 0 ?
                  <FlatList
                    style={{ height: "37%" }}
                    data={recips.recips}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.list} >
                          <View style={{ marginBottom: '2%' }} >
                            <Text style={styles.textPlaca}>
                              {typeof item.plate === 'string' ? item.plate : item.plate[0]}
                            </Text>
                            <Text style={styles.textPago}>
                              Pago por
                              {item.hours === '1 month' ? ' mensualidad' : `${formatHours(item.hours)} horas`}
                            </Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                            <Text style={styles.textMoney}>
                              {item.cash === 0 && item.change === 0 ? '$0' : ''}
                              {item.cash >= 0 && item.change < 0 ? `$${numberWithPoints(item.cash)}` : ''}
                              {item.cash > 0 && item.change >= 0 ? `$${numberWithPoints(item.total)}` : ''}
                            </Text>
                          </View>
                        </View>
                      )
                    }}
                  />
                  : <View style={{ marginLeft: '13%', padding: '10%' }}>
                    <Text style={styles.textPago}>
                      No se encuentran registros en el historial
                    </Text>
                  </View>
                }
              </View>}
          </View>
          <View style={styles.listContainer}>
            <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
              <Text style={styles.textListTitle} >VEHÍCULOS PARQUEADOS</Text>
            </View>
            {loadingReservations ?
              <View style={{ height: "72%" }}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <ActivityIndicator size={"large"} color={'#00A9A0'} />
                </View>
              </View>
              :
              <View style={{ height: "72%" }}>
                {reservations.reservations.length > 0 ?
                  <FlatList
                    style={{ height: "37%" }}
                    data={reservations.reservations}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => {
                      return (
                        <View style={styles.list} >
                          <View style={{ marginBottom: '2%' }} >
                            <Text style={styles.textPlaca}>{item.plate}</Text>
                            <Text style={styles.textPago}>{item.verificationCode}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end' }} >
                            <Text style={styles.textMoney}>{moment(item.dateStart).format('L')}  {moment(item.dateStart).format('LT')}</Text>
                            <Text style={styles.textPago}>
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
                    <Text style={styles.textPago}>
                      No hay parqueos activos en este momento
                    </Text>
                  </View>
                }
              </View>
            }

          </View>
          <View style={styles.footerContainer}>
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
