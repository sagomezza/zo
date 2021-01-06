import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, TouchableWithoutFeedback, Alert, Image, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from '../UserInput/UserInputStyles';
import FooterIndex from '../../components/Footer/index';
import { TIMEOUT } from '../../config/constants/constants';
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import instance from "../../config/axios";
import { START_PARKING, FIND_USER_BY_PLATE, CREATE_USER, READ_HQ } from "../../config/api";
import store from '../../config/store';
import moment from 'moment';
import Button from '../../components/Button';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { Keyboard } from 'react-native';
import normalize from '../../config/services/normalizeFontSize';
import { ImageBackground } from 'react-native';
import Header from '../../components/Header/HeaderIndex';
import MainDrawer from '../../navigators/MainDrawer/MainDrawer';
// import Feather from "react-native-feather";


const UserInput = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [loading, setLoading] = useState(false);

  const [modal2Visible, setModal2Visible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [findUserByPlate, setFindUserByPlate] = useState([]);
  const [startParking, setStartParking] = useState({});
  const [existingUser, setExistingUser] = useState(true)
  const [codeError, setErrorText] = useState(false);


  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [phone, setPhone] = useState('');

  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const refPhone = useRef(null);

  const clearPlateOne = () => {
    setPlateOne('');
  }
  const clearPlateTwo = () => {
    setPlateTwo('');
  }
  const clearPhone = () => {
    setPhone('');
  }

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

  useEffect(() => {
    async function findUserByPlate() {
      try {
        if ((plateOne + plateTwo).length === 6) {

          const response = await instance.post(
            FIND_USER_BY_PLATE,
            { plate: plateOne + plateTwo },
            { timeout: TIMEOUT }
          )
          setFindUserByPlate(response.data.data);
          setExistingUser(false)
          setPhone((response.data.data[0]).substring(3, 13))

        } else {
          setPhone("")
        }
      } catch (err) {
        console.log(err?.response)

      }

    }
    findUserByPlate()
  }, [plateOne, plateTwo]);

  useEffect(() => {
    async function createUser() {
      try {
        if ((plateOne + plateTwo).length === 6 && phone.length === 10 && findUserByPlate.length === 0) {

          const response = await instance.post(
            CREATE_USER,
            {
              phone: '+57' + phone,
              plate: plateOne + plateTwo,
              type: "starter"
            },
            { timeout: TIMEOUT }
          )
          setExistingUser(false)
        }
      } catch (err) {
        console.log(err?.response)
      }
    }
    createUser()
  }, [phone]);

  async function startPark() {
    try {
      if ((plateOne + plateTwo).length === 6) {
        let type
        if (isCharacterALetter(plateTwo[2])) type = "bike"
        else type = "car"
        const response = await instance.post(
          START_PARKING,
          {
            plate: plateOne + plateTwo,
            hqId: officialHq,
            dateStart: new Date(),
            phone: '+57' + phone,
            type
          },
          { timeout: TIMEOUT }
        )
        setModalVisible(true);
        setStartParking(response.data.data);
        readHq();
        setLoading(false)

        if (isCharacterALetter(plateTwo[2])) {
          store.dispatch(actions.addBike());
        } else {
          store.dispatch(actions.addCar());
        }

      }
    } catch (err) {
      setLoading(true)
      if (err?.response.data.response === -2) setModal2Visible(true)
      console.log(err?.response)

    }
  };


  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if (response.data.response) {
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
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
          height: normalize(450),
          flexDirection: 'column'
        }}
        source={require('../../../assets/images/Stripes.png')}>
        <Header navigation={navigation} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{ height: normalize(315), alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '20%', width: '60%', marginTop: '2%' }}>
              <TextInput
                ref={refPlateOne}
                placeholder={'EVZ'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                onChangeText={(text) => {
                  setPlateOne(text);
                  if (refPlateTwo && text.length === 3) {
                    refPlateTwo.current.focus();
                  }
                  ;
                }}
                value={plateOne}
                onFocus={() => { clearPlateOne(); clearPlateTwo(); clearPhone(); }}
              />
              <TextInput
                ref={refPlateTwo}
                placeholder={'123'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                keyboardType='default'
                onFocus={() => { clearPlateTwo(); clearPhone(); }}
                onChangeText={text => {
                  setPlateTwo(text);
                  if (refPhone && text.length === 3) {
                    refPhone.current.focus();
                  };
                }}
                value={plateTwo}
              />
            </View>
            <View style={{ alignItems: 'center', alignContent: 'center', height: '10%', width: '100%' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: normalize(21) }}>I  N  G  R  E  S  E     C  E  L  U  L  A  R</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '20%', width: '60%' }}>
              <TextInput
                ref={refPhone}
                placeholder={''}
                style={styles.textInput}
                keyboardType='numeric'
                textAlign='center'
                maxLength={10}
                onFocus={() => { clearPhone() }}
                onChangeText={text => {
                  setPhone(text);
                  if (text.length === 10) {
                    if (plateOne.length === 3 && plateTwo.length === 3) Keyboard.dismiss()
                  }
                }}
                value={phone}
              />
              {codeError && <Text>{codeError}</Text>}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '20%', width: '60%', justifyContent: 'space-evenly' }}>
              {!loading &&
                <Button onPress={() => { startPark(); setLoading(true); }}
                  title="I N I C I AR"
                  color='#FFF200'
                  style={styles.buttonI}
                  textStyle={styles.buttonText}
                  disabled={existingUser}
                />
              }
              {loading && <ActivityIndicator size={"large"} color={'#FFF200'} />}
              {!loading &&
                <TouchableOpacity style={styles.buttonT}
                  onPress={() => {
                    setLoading(true);
                    setPlateOne("");
                    setPlateTwo("");
                    setPhone("");
                    store.dispatch(actions.setQr(plateOne + plateTwo));
                    navigation.navigate('QRscanner')
                  }}
                  disabled={(plateOne + plateTwo).length < 6}
                >
                  <Image style={{ width: '65%', height: '65%', marginTop: '6%' }} resizeMode={"contain"} source={require('../../../assets/images/qr.png')} />
                </TouchableOpacity>
              }
            </View>
            <View style={{ alignItems: 'center', alignContent: 'center', height: '20%', width: '60%' }}>
              <Button
                title="Usuario Nuevo"
                color='transparent'
                style={styles.buttonNew}
                textStyle={styles.buttonTextNew}
                disabled={existingUser}
                activityIndicatorStatus={loading} />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={{
            height: normalize(492),
            backgroundColor: '#F8F8F8',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            alignContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{ height: '50%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '6%', borderRadius: 10 }}>
              <View style={{ marginBottom: '3%', marginTop: '3%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Text style={styles.textListTitle} >Gerardo Bedoya</Text>
                <View style={{ flexDirection: 'row', height: '25%', marginTop: '1%' }}>
                  <Text style={styles.textList} >Mensualidad hasta </Text>
                  <View style={{ marginLeft: '1%', backgroundColor: '#FFF200', borderRadius: 30, width: '25%', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textListDate} > 11/11/2020 </Text>
                  </View>
                </View>
              </View>
              <View style={{ height: "72%" }}>
                {/* {recips.recips.length > 0 ?
                <FlatList
                  style={{ height: "37%" }}
                  data={recips.recips}
                  keyExtractor={({ id }) => id}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                        <View style={{ marginBottom: '2%' }} >
                          <Text style={HomeStyles.textPlaca}>{item.plate}</Text>
                          <Text style={HomeStyles.textPago}>{`Pago por ${formatHours(item.hours)} horas`}</Text>
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
              } */}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <FooterIndex navigation={navigation} />
      </ImageBackground>
      {/* <TouchableOpacity
              style={{ height: "100%", justifyContent: "center" }}
              onPress={() => {setText("")}}
            >
             <Feather style={styles.closeIconStyle} name="x" />
            </TouchableOpacity>
          </View> */}

      {/* </View> */}
      <View>
        <Modal
          animationType="fade"
          transparent={true}
          backdropOpacity={0.3}
          visible={modal2Visible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ height: '100%', width: '100%', justifyContent: 'space-between' }}>
                <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                  <Text style={styles.modalText}> El vehículo con placas {plateOne + ' ' + plateTwo} ya se encuentra estacionado. </Text>
                </View>
                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setPlateOne("");
                    setPlateTwo("");
                    setPhone("");
                    setLoading(false);

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
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'column', height: '100%', width: '100%', alignContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: normalize(51), textAlign: 'center', color: '#00A9A0', fontFamily: 'Montserrat-Bold' }}> {plateOne + ' ' + plateTwo} </Text>

              <View style={{ height: '10%', width: '75%', backgroundColor: '#FFF200', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={styles.modalPhoneText}>+ {phone} </Text>
              </View>
              <View style={{ height: '35%', width: '75%', justifyContent: 'center' }}>
                <Image
                  style={{ alignSelf: 'center', width: '50%', height: '50%' }}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/Clock.png')} />
              </View>
              <View style={{ height: '15%', width: '76%', justifyContent: 'center' }}>
                <Text style={styles.modalText}>Ha iniciado el parqueo </Text>
                <Text style={styles.modalText}> Hora: {moment().format('LT')}</Text>
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModalVisible(!modalVisible);
                  setPlateOne("");
                  setPlateTwo("");
                  setPhone("");
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
    </View >
  );

}
const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
});

export default connect(mapStateToProps, actions)(UserInput);

