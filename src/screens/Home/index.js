import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Button } from 'native-base';
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
import * as Sentry from "@sentry/browser";
import secondsToString from '../../config/services/secondsToString';


const HomeIndex = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [loadingRecips, setLoadingRecips] = useState(true);
  const [loadingReservations, setLoadingReservations] = useState(true);
  const [activeList, setActiveList] = useState(0);

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
        Sentry.captureException(err);
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
        store.dispatch(actions.setRecips(response.data.data));
        setLoadingRecips(false);
      } catch (err) {
        setLoadingRecips(false);
        // console.log(err?.response)
      }
    };

    const updateExpoToken = async () => {
      try {
        await instance.post(EDIT_OFFICIAL, {
          id: officialProps.id,
          expoToken: props.expoToken
        },
          { timeout: TIMEOUT }
        );
      } catch (err) {
        Sentry.captureException(err);
        try {
          await instance.post(EDIT_ADMIN, {
            id: officialProps.id,
            expoToken: props.expoToken
          });
        } catch (err) {
          Sentry.captureException(err);
          // console.log("[updateExpoToken - Home screen]:", err)
          // console.log(err?.response)
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
        Sentry.captureException(err);
        setLoadingReservations(false);
        // console.log("err: ", err);
        // console.log(err?.response)
      }
    };

    // getRecips();
    readHq();
    updateExpoToken();
    offData();
    getRecips();
    // parked(officialHq);
  }, []);

  const formatDateDays = (date) => {
    return moment(date).format('L');
  };

  const formatDateHours = (date) => {
    return moment(date).format('LT');
  };

  const segmentClicked = (index) => {
    setActiveList(index);
  };

  const handleReservationsButton = () => {
    segmentClicked(0);
  };

  const handleRecips = () => {
    segmentClicked(1);
  };

  const renderList = () => {
    if (activeList === 1) {
      return (
        <View style={styles.listContainer}>
          {loadingRecips ?
            <View style={{ height: "72%" }}>
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <ActivityIndicator size={"large"} color={'#00A9A0'} />
              </View>
            </View>
            :
            <View style={{ height: "97%"}}>
              <View style={{ width: '96%', height: '5%', flexDirection: 'row', alignSelf: 'center', marginTop: '3%' }}>
                <Text style={{ ...styles.titleText, marginLeft: '2%' }}>Placa</Text>
                <Text style={{ ...styles.titleText, marginLeft: '7%' }}>Fecha</Text>
                <Text style={{ ...styles.titleText, marginLeft: '15%' }}>Tiempo</Text>
                <Text style={{ ...styles.titleText, marginLeft: '13%' }}>Total horas</Text>
                <Text style={{ ...styles.titleText, marginLeft: '8%' }}>Total</Text>
              </View>
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
                      //   }}
                      // >
                      <View style={{ ...styles.list, paddingTop: '3%', paddingBottom: '4%' }} >
                        <Text style={styles.textPlaca}>
                          {typeof item.plate === 'string' ? item.plate : item.plate[0]}
                        </Text>
                        <Text style={styles.dateDaysText}>
                          {item.prepayFullDay === true ? `${formatDateDays(item.dateFactured)}` : ""}
                          {item.mensuality === true ? `${formatDateDays(item.dateStart)}` : ""}
                          {item.isParanoic === true ? `${formatDateDays(item.dateFinished)}` : ""}
                          {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? `${formatDateDays(item.dateFinished)}` : ""}
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '30%', height: '100%' }}>
                          <Text style={styles.dateDaysText}>
                            {item.prepayFullDay === true ? `${formatDateHours(item.dateFactured)}` : ""}
                            {item.mensuality === true ? `${formatDateHours(item.dateStart)}` : ""}
                            {item.isParanoic === true ? `${formatDateHours(item.dateStart)}` : ""}
                            {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? `${formatDateHours(item.dateStart)}` : ""}
                          </Text>
                          <Image
                            style={{ width: '20%' }}
                            resizeMode={"contain"}
                            source={require('../../../assets/images/arrow.png')} />
                          <Text style={styles.dateDaysText}>
                            {item.prepayFullDay === true ? `${formatDateHours(item.dateFinished)}` : ""}
                            {item.mensuality === true ? `${formatDateHours(item.dateFinished)}` : ""}
                            {item.isParanoic === true ? `${formatDateHours(item.dateFinished)}` : ""}
                            {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? `${formatDateHours(item.dateFinished)}` : ""}
                          </Text>
                        </View>
                        <Text style={styles.totalHours}>
                          {item.prepayFullDay === true ? " Pase día" : ""}
                          {item.mensuality === true ? " Mensualidad" : ""}
                          {item.isParanoic === true ? `${secondsToString((item.hours)*3600)} ` : ""}
                          {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? `${secondsToString((item.hours)*3600)} ` : ""}
                        </Text>
                        <Text style={styles.textPlaca}>
                          {item.cash === 0 && item.change === 0 ? '$0' : ''}
                          {item.cash >= 0 && item.change < 0 ? `$${numberWithPoints(item.cash)}` : ''}
                          {item.cash > 0 && item.change >= 0 ? `$${numberWithPoints(item.total)}` : ''}
                        </Text>
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
      );
    } else if (activeList === 0) {
      return (
        <View style={styles.listContainer}>
          {loadingReservations ?
            <View style={{ height: "72%" }}>
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <ActivityIndicator size={"large"} color={'#00A9A0'} />
              </View>
            </View>
            :
            <View style={{ height: "97%" }}>
              <View style={{ width: '96%', height: '5%', flexDirection: 'row', alignSelf: 'center', marginTop: '3%' }}>
                <Text style={{ ...styles.titleText, marginLeft: '6%' }}>Placa</Text>
                <Text style={{ ...styles.titleText, marginLeft: '15%' }}>Código</Text>
                <Text style={{ ...styles.titleText, marginLeft: '15%' }}>Fecha</Text>
                <Text style={{ ...styles.titleText, marginLeft: '14%' }}>Modo de pago</Text>
              </View>
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
                      //   }}
                      // >
                      <View style={styles.list} >
                        <Text style={styles.textPlaca}>{item.plate}</Text>
                        <Text style={styles.dateDaysText}>{item.verificationCode}</Text>
                        <View style={{ flexDirection: 'column' }}>
                          <Text style={styles.dateDaysText}>{moment(item.dateStart).format('L')}</Text>
                          <Text style={styles.dateHourText}>{moment(item.dateStart).format('LT')}</Text>
                        </View>
                        <Text style={styles.dateDaysText}>
                          {item.prepayFullDay === true ? " Pase día" : ""}
                          {item.mensuality === true ? " Mensualidad" : ""}
                          {item.isParanoic === true ? " Por horas" : ""}
                          {!item.prepayFullDay && !item.mensuality && !item.isParanoic ? " Por horas" : ""}
                        </Text>
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
      )
    };
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.topImage}
        source={require('../../../assets/images/logoutStripes.png')}>
        <Header navigation={navigation} />
        <View style={styles.plateContainer}>
          <View style={styles.plateInput}>
            <View style={styles.cellContainer} >
              <Image
                style={styles.bikeImage}
                resizeMode={"contain"}
                source={require('../../../assets/images/homeCar.png')}
              />
              <View style={{ width: '70%' }}>
                <Text style={styles.totalCellsText}>{`${hq.totalCars}`} CELDAS</Text>
              </View>
            </View>
            <View style={styles.bikeCounter} >
              <Text style={styles.plateInputTextBig}>{`${hq.occupiedCars}`}</Text>
              <View style={{ width: '70%' }}>
                <Text style={styles.plateInputTextSmall}>VEHÍCULOS PARQUEADOS</Text>
              </View>
            </View>
            <View style={styles.bikeCounter} >
              <Text style={styles.plateInputTextBig2}>{`${hq.availableCars}`}</Text>
              <View style={{ width: '70%' }}>
                <Text style={styles.plateInputTextSmall}>CELDAS DISPONIBLES</Text>
              </View>
            </View>
          </View>
          <View style={styles.plateInput}>
            <View style={styles.cellContainer}>
              <Image
                style={styles.carImage}
                resizeMode={"contain"}
                source={require('../../../assets/images/homeBike.png')}
              />
              <View style={{ width: '70%' }}>
                <Text style={styles.totalCellsText}>{`${hq.totalBikes}`} CELDAS</Text>
              </View>
            </View>
            <View style={styles.bikeCounter} >
              <Text style={styles.plateInputTextBig}>{`${hq.occupiedBikes}`}</Text>
              <View style={{ width: '70%' }}>
                <Text style={styles.plateInputTextSmall} >VEHÍCULOS PARQUEADOS</Text>
              </View>
            </View>
            <View style={styles.bikeCounter} >
              <Text style={styles.plateInputTextBig2}>{`${hq.availableBikes}`}</Text>
              <View style={{ width: '70%' }}>
                <Text style={styles.plateInputTextSmall} >CELDAS DISPONIBLES</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonContainer}>
            <Button
              transparent
              style={activeList === 0 ? styles.flatlistButtonSelected : styles.flatlistButton}
              onPress={handleReservationsButton}
              active={activeList === 0}
            >
              <Image
                style={{ width: '20%' }}
                resizeMode={"contain"}
                source={require('../../../assets/images/parked.png')} />
              <Text style={activeList === 0 ? styles.textListTitle : styles.textListTitleInact}>VEHÍCULOS PARQUEADOS</Text>
            </Button>
            <Button
              transparent
              style={activeList === 1 ? styles.flatlistButtonSelected : styles.flatlistButton}
              onPress={handleRecips}
              active={activeList === 1}
            >
              <Image
                style={{ width: '20%' }}
                resizeMode={"contain"}
                source={require('../../../assets/images/history.png')} />
              <Text style={activeList === 1 ? styles.textListTitle : styles.textListTitleInact}>HISTORIAL DE PAGOS</Text>
            </Button>
          </View>
          {renderList()}
        </View>
      </ImageBackground>
      <View style={styles.footerContainer}>
        <FooterIndex navigation={navigation}/>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
});

export default connect(mapStateToProps, actions)(HomeIndex);
