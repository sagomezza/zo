import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Modal
} from 'react-native';
import Button from '../../components/Button';

import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import styles from '../Home/HomeStyles';
import instance from "../../config/axios";
import moment from 'moment';
import { firestore } from '../../config/firebase';
import normalize from '../../config/services/normalizeFontSize';


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
  const [showRecipModal, setShowRecipModal] = useState(false);
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [plate, setPlate] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [prepayFullDay, setPrepayFullDay] = useState('');
  const [mensuality, setMensuality] = useState('');
  const [isParanoic, setIsParanoic] = useState('');

  useEffect(() => {
    const offData = async () => {
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

    const getRecipsOfShift = () => {
      setLoadingRecips(true);
      if (officialProps.start) {
        if (officialProps.schedule.status !== "active") {
          // ??
        }
        let date = moment(new Date(officialProps.start._seconds) * 1000)
          .tz("America/Bogota")
          .toDate();
        firestore
          .collection("recips")
          .where("hqId", "==", officialHq)
          .where("officialEmail", "==", officialProps.email)
          .where("dateFinished", ">=", date)
          .orderBy("dateFinished", "desc")
          .get()
          .then(async (snapshot) => {
            try {
              let recips = [];
              if (!snapshot.empty) {
                snapshot.forEach((doc) => {
                  let recipData = doc.data();
                  if (!recipData.mensuality && !recipData.prepayFullDay) {
                    recipData.id = doc.id;
                    recips.push(recipData);
                  }
                });
              }
              firestore
                .collection("recips")
                .where("hqId", "==", officialHq)
                .where("prepayFullDay", "==", true)
                .where("dateFactured", ">=", date)
                .orderBy("dateFactured", "desc")
                .get()
                .then((snapshot) => {
                  if (!snapshot.empty) {
                    snapshot.forEach((doc) => {
                      let recipData = doc.data();
                      recipData.id = doc.id;
                      recips.push(recipData);
                    });
                  }
                  firestore
                    .collection("recips")
                    .where("hqId", "==", officialHq)
                    .where("mensuality", "==", true)
                    .where("dateStart", ">=", date)
                    .orderBy("dateStart", "desc")
                    .get()
                    .then((snapshot) => {
                      if (!snapshot.empty) {
                        snapshot.forEach((doc) => {
                          let recipData = doc.data();
                          recipData.id = doc.id;
                          recips.push(recipData);
                        });
                      }
                      if (recips.length === 0) {
                        setLoadingRecips(false);

                      } else {
                        if (officialProps.email) {
                          let filteredRecips = recips.filter((recip) => {
                            return (
                              recip.officialEmail === officialProps.email
                            );
                          });
                          recips = [...filteredRecips];
                        }
                        recips.map((recip) => {
                          recip.dateStart = recip.dateStart.nanoseconds
                            ? recip.dateStart.toDate()
                            : recip.dateStart;
                          recip.dateFinished = recip.dateFinished.nanoseconds
                            ? recip.dateFinished.toDate()
                            : recip.dateFinished;
                          if (recip.totalTime)
                            recip.totalTime = recip.totalTime.nanoseconds
                              ? recip.totalTime.toDate()
                              : recip.totalTime;
                        });
                        recips.sort((a, b) => {
                          if (
                            (a.mensuality || a.prepayFullDay) &&
                            !b.mensuality
                          ) {
                            return b.dateFinished - a.dateStart;
                          } else if (
                            (b.mensuality || b.prepayFullDay) &&
                            !a.mensuality
                          ) {
                            return b.dateStart - a.dateFinished;
                          } else if (
                            (a.mensuality || a.prepayFullDay) &&
                            (b.mensuality || b.prepayFullDay)
                          ) {
                            return b.dateStart - a.dateStart;
                          } else {
                            return b.dateFinished - a.dateFinished;
                          }
                        });
                        store.dispatch(actions.setRecips(recips));
                        setLoadingRecips(false);
                        console.log(recips[0])

                        // if (parameter.limit) {
                        //   resolve({
                        //     data: {
                        //       total: recips.slice(0, parameter.limit),
                        //     },
                        //   });
                        // } else {

                        // }
                      }
                    });
                });
            } catch (err) {
              console.log(err);
            }
          })
          .catch((err) => {

          });

      }


    }


    // const getRecips = async () => {
    //   setLoadingRecips(true);
    //   try {
    //     const response = await instance.post(GET_RECIPS, {
    //       hqId: officialHq,
    //       officialEmail: officialProps.email
    //     },
    //       { timeout: TIMEOUT }
    //     );
    //     store.dispatch(actions.setRecips(response.data.data));
    //     setLoadingRecips(false);
    //   } catch (err) {
    //     setLoadingRecips(false);
    //     // console.log(err?.response)
    //   }
    // };

    const updateExpoToken = async () => {
      try {
        console.log({
          id: officialProps.id,
          expoToken: props.expoToken.expoToken
        })
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
        store.dispatch(actions.setReservations(response.data.data.reservations));
        store.dispatch(actions.setHq(response.data.data));
        setLoadingReservations(false);
      } catch (err) {
        setLoadingReservations(false);
        console.log("err: ", err);
        console.log(err?.response)
      }
    };

    // getRecips();
    readHq();
    updateExpoToken();
    offData();
    getRecipsOfShift();
    // parked(officialHq);
  }, []);

  const infoReservation = (props) => {
    console.log(props)
    setPlate(props.plate)
    setVerificationCode(props.verificationCode)
    setPrepayFullDay(props.prepayFullDay)
    setMensuality(props.mensuality)
    setIsParanoic(props.isParanoic)
    setShowReserveModal(true)
  }

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
                    renderItem={({ item, index }) => {
                      return (
                        // <TouchableOpacity
                        //   key={index.toString()}
                        //   onPress={() => {
                        //     setShowRecipModal(true);
                        //   }}
                        // >
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
                        // </TouchableOpacity>

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
                    renderItem={({ item, index }) => {
                      return (
                        // <TouchableOpacity
                        //   key={index.toString()}
                        //   onPress={() => {
                        //     console.log(item)
                        //     let plate = item.plate
                        //     let verificationCode = item.verificationCode
                        //     let prepayFullDay = item.prepayFullDay ? item.prepayFullDay : ''
                        //     let mensuality = item.mensuality ? item.mensuality : ''
                        //     let isParanoic = item.isParanoic ? item.isParanoic : ''
                        //     infoReservation({
                        //       plate,
                        //       verificationCode,
                        //       prepayFullDay,
                        //       mensuality,
                        //       isParanoic
                        //     })
                        //   }}
                        // >
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
                        // </TouchableOpacity>
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
        <Modal
          animationType="fade"
          transparent={true}
          backdropOpacity={0.3}
          visible={showReserveModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
                padding: '2%'
              }}>
                <View style={{
                  margin: '3%',
                  justifyContent: 'flex-end',
                  height: ' 80%',
                  borderWidth: 1

                }}>
                  <Text style={{
                    fontSize: normalize(51),
                    textAlign: 'center',
                    color: '#00A9A0',
                    fontFamily: 'Montserrat-Bold'
                  }}>
                    {plate}
                  </Text>
                  <Text style={styles.modalTextAlert}>  </Text>
                </View>
                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setShowReserveModal(false)
                  }}
                    title="E N T E N D I D O"
                    color="#00A9A0"
                    style={
                      styles.modalButton
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }} />
                </View>
              </View>
            </View>
          </View>
        </Modal>

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
