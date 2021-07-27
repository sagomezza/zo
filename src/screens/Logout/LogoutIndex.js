import React, { useState, useEffect, useRef } from 'react';
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
import normalize from '../../config/services/normalizeFontSize';
import styles from '../Logout/LogoutStyles';
import Header from '../../components/Header/HeaderIndex';
import { width } from '../../config/constants/screenDimensions';
import { Icon } from 'react-native-elements';
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
  const [isDisabled, setIsDisabled] = useState(true);
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
    })
    const macAdd = () => {
      Network.getMacAddressAsync().then(state => {
        setMacAddress(state)
      }
      )
    }
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
    }
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

    } catch (err) {
      // console.log(err?.response)
      setLoading(false);
      setModalVisible(!modalVisible);
      setModal3Visible(true);
      Sentry.captureException(err)
      // asociar a un evento de sentry, si pasa error intentar de nuevo descartar
    }
  }

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
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ImageBackground
        style={styles.imageBackground}
        source={require('../../../assets/images/Stripes.png')}>
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
                <Image
                  style={{ width: '18%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Inicio.png')} />
                <View style={{}} >
                  <Text style={styles.timePlateTitle}>Tiempo de inicio:</Text>
                  <Text style={styles.timePlateInfo}>{moment(startTime * 1000).subtract(5, 'hours').format('L')} {moment(startTime * 1000).subtract(5, 'hours').format('LT')} </Text>
                </View>
              </View>
              <View style={styles.timePlate}>
                <Image
                  style={{ width: '17%' }}
                  resizeMode={"contain"}
                  source={require('../../../assets/images/Salida.png')} />
                <View style={{}} >
                  <Text style={styles.timePlateTitle}>Tiempo de salida:</Text>
                  <Text style={styles.timePlateInfo}>{moment().format('L')} {moment().format('LT')}</Text>
                </View>
              </View>
            </View>

            <View style={styles.cashContainer}>
              <View style={{ width: '30%' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: width * 0.030 }}>
                  {"BASE: "}
                </Text>
              </View>
              <View style={styles.currencyInputContainer}>
                <CurrencyInput
                  placeholder='$'
                  textAlign='center'
                  style={styles.textInput}
                  value={inputBaseValue}
                  onChangeValue={text => { text === null ? setInputBaseValue(0) : setInputBaseValue(text) }}
                  prefix="$"
                  delimiter="."
                  separator="."
                  precision={0}
                />
              </View>
            </View>
            <View style={styles.cashContainer}>
              <View style={{ width: '30%' }}>
                <Text style={{
                  fontFamily: 'Montserrat-Bold',
                  color: '#FFFFFF',
                  fontSize: width * 0.030
                }}>
                  {"DINERO EN EFECTIVO: "}
                </Text>
              </View>
              <View style={styles.currencyInputContainer}>
                <CurrencyInput
                  placeholder='$'
                  textAlign='center'
                  keyboardType='numeric'
                  style={styles.textInput}
                  value={inputValue}
                  onChangeValue={text => { text === null ? setInputValue(0) : setInputValue(text) }}
                  prefix="$"
                  delimiter="."
                  separator="."
                  precision={0}
                />
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
                  <View style={{ paddingBottom: 10, height: "95%" }}>
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
                              <View style={{ marginBottom: 10 }} >
                                <Text style={styles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                                <Text style={styles.textPago}>{`Pago por ${Math.round(item.hours)} horas`}</Text>
                              </View>
                              <View style={{ flex: 1, alignItems: 'flex-end' }} >
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
              width: '75%',
              height: '13%',
              justifyContent: 'flex-end'
            }}>
              <Button onPress={() => { setModalVisible(true); }}
                title="C E R R A R  T U R N O"
                disabled={inputValue.length === 0 || inputBaseValue.length === 0}
                color="#00A9A0"
                style={[inputValue.length === 0 || inputBaseValue.length === 0 ? styles.shiftButtonDisabled : styles.shiftButton]}
                textStyle={{
                  color: "#FFFFFF",
                  textAlign: "center",
                  fontFamily: 'Montserrat-Bold'
                }} />
            </View>
            <View style={{
              height: '22%',
              width: '100%',
              justifyContent: 'flex-end'
            }}>
              <FooterIndex navigation={navigation} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
      <Modal
        animationType="fade"
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
              <View style={{ margin: '2%', justifyContent: 'flex-end', height: '30%' }}>
                <Text style={styles.modalText}>
                  Una vez cierres el turno no podrás modificar el valor ingresado  ¿está seguro que desea guardar y cerrar?
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
                  <Button onPress={() => {
                    setLoading(true)
                    markEndOfShift();
                  }}
                    title="S I"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    activityIndicatorStatus={loading}
                    isDisabled={loading}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }}
                  />
                </View>
                <View style={{
                  width: '100%',
                  justifyContent: 'center',
                  height: '50%',
                  alignItems: 'center'
                }}>
                  <Button onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Logout');
                  }}
                    title="N O"
                    color="#00A9A0"
                    style={styles.modal2Button}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
                    }}
                  />
                </View>
              </View>
            </View>

          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                <Text style={styles.modalTextAlert}> Algo malo pasó, inténtalo más tarde.  </Text>
              </View>
              <View style={{ height: '30%', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '75%', height: '50%', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <Button onPress={() => {
                    setModal3Visible(false);
                    setIsDisabled(false)
                  }}
                    title="E N T E N D I D O"
                    color="#00A9A0"
                    style={
                      styles.modal2Button
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
        </View>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal4Visible}
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
              {logoutError ?
                <View style={{ margin: '2%', justifyContent: 'flex-end', height: '40%' }}>
                  <Text style={styles.modalText}> ¡ Algo malo pasó ! </Text>
                  <Text style={styles.modalText}> Espera un momento y dale en el botón para intentar de nuevo. </Text>
                </View>
                :
                <View style={{ margin: '2%', justifyContent: 'space-between', height: ' 80%' }}>
                  <View style={{ justifyContent: 'center', height: '20%' }}>
                    <Text style={styles.modalText}> ¡ Se cerró el turno con éxito ! </Text>
                  </View>
                  <Text style={styles.modalTextAlert}>
                    {"TOTAL CALCULADO: "}{`$${numberWithPoints(Number(total))}`}
                  </Text>
                  <Text style={styles.modalTextAlert}>
                    {"TOTAL REPORTADO: "}{`$${numberWithPoints(Number(inputValue))}`}
                  </Text>
                  <Text style={styles.modalTextAlert}>
                    Tiene una diferencia de {`$${numberWithPoints(Number(total) - Number(inputValue))}`}
                  </Text>
                  <View style={{ justifyContent: 'center', height: '25%' }}>

                    <Text style={styles.modalText}> Dale en el botón para realizar el cierre de sesión </Text>
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
                  <Button onPress={() => {
                    setLoading(true);
                    logoutFromFirebase();
                  }}
                    title=" C E R R A R  S E S I Ó N "
                    color="#00A9A0"
                    style={
                      styles.modal2Button
                    }
                    activityIndicatorStatus={loading}
                    isDisabled={loading}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Bold'
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
