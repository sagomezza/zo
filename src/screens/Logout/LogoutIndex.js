import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image
} from 'react-native';
import { ImageBackground } from 'react-native';
import { Keyboard } from 'react-native';
import numberWithPoints from '../../config/services/numberWithPoints';
import styles from '../Logout/LogoutStyles';
import Header from '../../components/Header/HeaderIndex';
import { width } from '../../config/constants/screenDimensions';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Button from '../../components/Button/index';
import FooterIndex from '../../../src/components/Footer/index';
import moment from 'moment';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from '../../config/axios';
// api
import { GET_SHIFT_RECIPS, MARK_END_OF_SHIFT, READ_HQ } from '../../config/api';
import { firebase } from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';
import "@firebase/firestore";
import { TIMEOUT } from '../../config/constants/constants';
import * as Network from 'expo-network';
import store from '../../config/store';
import { createIdempotency } from '../../utils/idempotency';
import * as Sentry from "@sentry/browser";
import * as Device from "expo-device";
import CurrencyInput from 'react-native-currency-input';
import normalize from '../../config/services/normalizeFontSize';

const LogoutIndex = (props) => {
  const { navigation, officialProps, recips, uid } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const startTimeSchedule = officialProps.start ? officialProps.start : "";
  const startTime = startTimeSchedule._seconds ? startTimeSchedule._seconds : ''
  const [modalVisible, setModalVisible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [logoutError, setLogoutError] = useState(false);
  const [total, setTotal] = useState(0);
  const [shiftRecips, setShiftRecips] = useState('');
  const [loadingShiftRecips, setLoadingShiftRecips] = useState(true);
  const hq = props.hq;
  const [inputBaseValue, setInputBaseValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [macAddress, setMacAddress] = useState('');
  const [uidLogout, setUidLogout] = useState('');
  const uidDefini = uid.uid !== '' ? uid.uid : uidLogout;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUidLogout(user.uid)
      } else {
      }
    });
    const macAdd = () => {
      Network.getMacAddressAsync().then(state => {
        setMacAddress(state)
      }
      )
    };
    const getShiftRecips = async () => {
      setLoadingShiftRecips(true);
      try {
        const response = await instance.post(GET_SHIFT_RECIPS, {
          email: officialProps.email,
          hqId: officialProps.hq[0],
          date: new Date()
        },
          { timeout: TIMEOUT }
        );
        setTotal(response.data.data.total);
        setShiftRecips(response.data.data.recips);
        setLoadingShiftRecips(false);
      } catch (err) {
        Sentry.captureException(err);
        // console.log(err)
        // console.log(err?.response)
        setLoadingShiftRecips(false);
      }
    };
    getShiftRecips();
    macAdd();
  }, []);

  const markEndOfShift = async () => {
    setLoading(true);
    try {
      let idempotencyKey = createIdempotency(uid.uid)
      const response = await instance.post(MARK_END_OF_SHIFT, {
        email: officialProps.email,
        id: officialProps.id,
        date: new Date(),
        total: Number(total),
        input: Number(inputValue),
        base: Number(inputBaseValue),
        hqId: officialHq,
        macAddress: macAddress,
        uid: uidDefini,
        deviceId: `${Device.brand}-${Device.modelName}-${Device.deviceName}-${Device.deviceYearClass}`
      }, {
        headers: {
          "x-idempotence-key": idempotencyKey
        }, timeout: TIMEOUT
      });
      setLoading(false);
      setModal4Visible(true);
      store.dispatch(actions.setRecips([]));
      store.dispatch(actions.setOfficial({}));
      store.dispatch(actions.setReservations([]));
      store.dispatch(actions.setHq({}));
      store.dispatch(actions.setUid({}));
    } catch (err) {
      // console.log(err?.response)
      setLoading(false);
      setModalVisible(!modalVisible);
      setModal3Visible(true);
      Sentry.captureException(err)
    }
  };

  const logoutFromFirebase = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        // Sign-out successful.
        setModalVisible(false);
        setModal4Visible(false);
        setLoading(false);
        navigation.navigate('Login');
      }).catch(function (error) {
        // An error happened.
        Sentry.captureException(error)
        setLoading(false);
        setLogoutError(true);
      });
  };

  const handleBaseInput = text => { text === null ? setInputBaseValue(0) : setInputBaseValue(text) };
  const handleCashInput = text => { text === null ? setInputValue(0) : setInputValue(text) };
  const handleEndShift = () => setModalVisible(true);
  const handleEndShiftModal = () => setModalVisible(false);

  const handleConfirmEndShift = () => {
    setLoading(true);
    markEndOfShift();
  };

  const handleErrorModal = () => {
    setModal3Visible(false);
  };

  const handleLogout = () => {
    setLoading(true);
    logoutFromFirebase();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/logoutStripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.topContainer} >
            <View style={styles.officialNameContainer}>
              <Text style={styles.officialNameText}>
                {officialProps.name + ' ' + officialProps.lastName}
              </Text>
              <Text style={styles.officialNameText2}>{hq.name}</Text>
            </View>
            <View style={styles.timePlatesContainer}>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>Tiempo de inicio</Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '14%' }} >
                  <Image
                    style={{ width: '17%', marginRight: 10, height: '90%' }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/logoutInTime.png')} />
                  <View style={{ width: '45%', flexDirection: 'column' }} >
                    <Text style={styles.timePlateDate}>{moment(startTime * 1000).subtract(5, 'hours').format('L')}</Text>
                    <Text style={styles.timePlateHour}>{moment(startTime * 1000).subtract(5, 'hours').format('LT')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>Tiempo de salida</Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start', marginLeft: '15%' }} >
                  <Image
                    style={{ width: '17%', marginRight: 10 }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/logoutOutTime.png')} />
                  <View style={{ width: '45%', flexDirection: 'column' }} >
                    <Text style={styles.timePlateDate}>{moment().format('L')}</Text>
                    <Text style={styles.timePlateHour}>{moment().format('LT')}</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.timePlatesContainer}>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>Base</Text>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} >
                  <Image
                    style={{ width: '17%', marginRight: 3 }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/logoutBase.png')} />
                  <View style={{ width: '70%', justifyContent: 'center' }} >
                    <CurrencyInput
                      placeholder='$'
                      textAlign='center'
                      style={styles.textInput}
                      value={inputBaseValue}
                      onChangeValue={handleBaseInput}
                      prefix="$"
                      delimiter="."
                      separator="."
                      precision={0}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Text style={styles.timePlateTitle}>Efectivo</Text>
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }} >
                  <Image
                    style={{ width: '17%', marginRight: 3 }}
                    resizeMode={"contain"}
                    source={require('../../../assets/images/logoutCash.png')} />
                  <View style={{ width: '70%', justifyContent: 'center' }} >
                    <CurrencyInput
                      placeholder='$'
                      textAlign='center'
                      keyboardType='numeric'
                      style={styles.textInput}
                      value={inputValue}
                      onChangeValue={handleCashInput}
                      prefix="$"
                      delimiter="."
                      separator="."
                      precision={0}
                    />
                  </View>
                </View>
              </View>

            </View>
          </View>
          <View style={styles.bottomContainer}>
            {loadingShiftRecips ?
              <View style={styles.listContainer}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <ActivityIndicator size={"large"} color={'#00A9A0'} />
                </View>
              </View>
              :
              <View style={styles.listContainer}>
                {shiftRecips.length > 0 ?
                  <View style={{ paddingBottom: 10, height: "100%" }}>
                    <FlatList
                      data={shiftRecips}
                      keyExtractor={({ id }) => id}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                            key={index.toString()}
                            onPress={() => {

                            }}
                          >
                            <View style={styles.flatlist} >
                              <View style={{ marginLeft: 20, marginTop: 10, marginBottom: 10 }} >
                                <Text style={styles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                                <Text style={styles.textPago}>{`Pago por ${Math.round(item.hours)} horas`}</Text>
                              </View>
                              <View style={{ flex: 1, alignItems: 'flex-end', marginRight: 20, marginTop: 20 }} >
                                <Text style={styles.textMoney}>
                                  {item.cash === 0 && item.change === 0 ? '$0' : ''}
                                  {item.cash >= 0 && item.change < 0 ? `$${numberWithPoints(Number(item.cash))}` : ''}
                                  {item.cash > 0 && item.change >= 0 ? `$${numberWithPoints(Number(item.total))}` : ''}
                                </Text>
                              </View>
                            </View>
                          </TouchableOpacity>
                        )
                      }}
                    />
                  </View>
                  :
                  <View style={{ marginLeft: '13%', padding: '10%' }}>
                    <Text style={styles.textPago}>
                      No se encuentran registros en el historial
                    </Text>
                  </View>
                }
              </View>
            }
            <View style={{
              width: '45%',
              height: '15%',
              justifyContent: 'flex-end',
            }}>
              <Button
                onPress={handleEndShift}
                title="CERRAR TURNO"
                disabled={inputValue.length === 0 || inputBaseValue.length === 0}
                style={[inputValue.length === 0 || inputBaseValue.length === 0 ? styles.shiftButtonDisabled : styles.shiftButton]}
                textStyle={{
                  color: "#00A9A0",
                  fontSize: width * 0.025,
                  textAlign: "center",
                  fontFamily: 'Montserrat-Medium',
                  letterSpacing: 5
                }} />
            </View>

          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <View style={{
        height: '10%',
        width: '100%',
        justifyContent: 'flex-end'
      }}>
        <FooterIndex navigation={navigation} />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'
            }}
            >
              <Image
                style={{ width: '30%', alignSelf: 'center', marginBottom: '10%' }}
                resizeMode={"contain"}
                source={require("../../../assets/images/alert.png")}
              />
              <View style={{ margin: '2%', height: '30%' }}>
                <Text style={styles.modalText}>
                  Una vez cierres el turno no podrás modificar el valor ingresado ¿Está seguro de que desea guardar y cerrar?
                </Text>
              </View>
              <View style={{
                height: '30%',
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50%',
                  alignItems: 'center'
                }}>
                  <Button
                    onPress={handleConfirmEndShift}
                    title="SI"
                    color="#00A9A0"
                    style={styles.modalYesButton}
                    activityIndicatorStatus={loading}
                    isDisabled={loading}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      fontSize: normalize(20),
                      letterSpacing: 5
                    }}
                  />
                </View>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50%',
                  alignItems: 'center'
                }}>
                  <Button onPress={handleEndShiftModal}
                    title="NO"
                    color="transparent"
                    style={styles.modalNoButton}
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      fontSize: normalize(20),
                      letterSpacing: 5
                    }}
                  />
                </View>
              </View>
            </View>

          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <Image
                style={{ width: '30%', alignSelf: 'center', marginBottom: '10%', marginTop: '5%' }}
                resizeMode={"contain"}
                source={require("../../../assets/images/alert.png")}
              />
              <View style={{ margin: '4%', justifyContent: 'center', height: '35%' }}>
                <Text style={styles.modalText}> Algo malo pasó, inténtalo más tarde.  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '78%', height: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Button onPress={handleErrorModal}
                    title="ENTENDIDO"
                    color="#00A9A0"
                    style={styles.modalYesButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal4Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.logoutModalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'
            }}
            >
              {logoutError ?
                <View style={{ margin: '2%', justifyContent: 'flex-end', height: '50%' }}>
                  <Image
                    style={{ width: '30%', alignSelf: 'center', marginBottom: '10%', marginTop: '10%' }}
                    resizeMode={"contain"}
                    source={require("../../../assets/images/alert.png")}
                  />
                  <Text style={styles.modalText}> ¡ Algo malo pasó ! </Text>
                  <Text style={styles.modalText}> Espera un momento y dale en el botón para intentar de nuevo. </Text>
                </View>
                :
                <View style={{ margin: '2%', justifyContent: 'space-between', height: ' 80%' }}>
                  <View style={{ height: '24%', width: '100%', justifyContent: 'center' }}>
                    <Image
                      style={{ alignSelf: 'center', width: '60%', height: '85%' }}
                      resizeMode={'contain'}
                      source={require('../../../assets/images/logoutCar.png')} />
                  </View>
                  <View style={{ justifyContent: 'center', height: '20%' }}>
                    <Text style={styles.modalTextTitle}>SE CERRÓ EL TURNO CON ÉXITO</Text>
                  </View>
                  <View style={styles.logoutModalReport}>
                    <Text style={styles.modalText}>Total calculado:</Text>
                    <Text style={styles.modalTextBlue}> {`$${numberWithPoints(Number(total))}`}</Text>
                  </View>
                  <View style={styles.logoutModalReport}>
                    <Text style={styles.modalText}>Total reportado:</Text>
                    <Text style={styles.modalTextBlue}> {`$${numberWithPoints(Number(inputValue))}`}</Text>
                  </View>
                  <View style={styles.logoutModalReport}>
                    <Text style={styles.modalText}>Diferencia</Text>
                    <Text style={styles.modalTextBlue}>{`$${numberWithPoints(Number(total) - Number(inputValue))}`}</Text>
                  </View>
                </View>
              }
              <View style={{
                height: '20%',
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '60%',
                  alignItems: 'center'
                }}>
                  <Button onPress={handleLogout}
                    title="CERRAR SESIÓN"
                    color="#00A9A0"
                    style={
                      styles.modalYesButton
                    }
                    activityIndicatorStatus={loading}
                    isDisabled={loading}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 3,
                      fontSize: normalize(20)
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  uid: state.uid
});

export default connect(mapStateToProps, actions)(LogoutIndex);
