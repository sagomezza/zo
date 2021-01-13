import React, { useEffect, useState, useRef } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Alert,
  Image,
  ActivityIndicator,
  CheckBox
} from 'react-native';
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
import DropDownPicker from 'react-native-dropdown-picker';

const UserInput = (props) => {
  const { navigation, officialProps } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const officialEmail = officialProps.email;
  const [loadingStart, setLoadingStart] = useState(false);
  const [prepayDay, setPrepayDay] = useState(false);


  const [modal2Visible, setModal2Visible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [findUserByPlate, setFindUserByPlate] = useState([]);
  const [startParking, setStartParking] = useState({});
  const [existingUser, setExistingUser] = useState(false)
  const [showPhoneInput, setShowPhoneInput] = useState(false)
  const [codeError, setErrorText] = useState(false);


  const [plateOne, setPlateOne] = useState('');
  const [plateTwo, setPlateTwo] = useState('');
  const [phone, setPhone] = useState(1);
  const [phones, setPhones] = useState([{ label: 'Selecciona un número', value: 1 }]);
  const [showDropdown, setShowDropdown] = useState(false)

  const [newPhone, setNewPhone] = useState('');


  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const refPhone = useRef(null);

  const clearPlateOne = () => {
    setPlateOne('');
  }
  const clearPlateTwo = () => {
    setPlateTwo('');
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
          setExistingUser(true)
          const auxPhones = []
          // {label: 'UK', value: 'uk'},
          response.data.data.forEach(phone => {
            auxPhones.push({ label: phone, value: phone })
          });
          auxPhones.push({ label: '+ agregar', value: 0 })
          setPhones(auxPhones);
          setShowDropdown(true);
        }

      } catch (err) {
        console.log(err?.response)
        setShowPhoneInput(true);
      }
    }
    findUserByPlate()
  }, [plateOne, plateTwo]);

  useEffect(() => {
    async function createUser() {
      try {
        if ((plateOne + plateTwo).length === 6 && newPhone.length === 10) {

          const response = await instance.post(
            CREATE_USER,
            {
              phone: '+57' + newPhone,
              plate: plateOne + plateTwo,
              type: "starter"
            },
            
            { timeout: TIMEOUT }
          )
        }
        setExistingUser(true);
      } catch (err) {
        console.log(err?.response)
      }
    }
    createUser();
  }, [newPhone]);

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
            phone: !showPhoneInput ? phone : '+57' + newPhone,
            prepaidDay: true,
            officialEmail: officialEmail,
            type
          },
          { timeout: TIMEOUT }
        )
        setModalVisible(true);
        setStartParking(response.data.data);
        readHq();
        setLoadingStart(false)
        setPhones([{ label: 'Selecciona un número', value: 1 }]);
        if (isCharacterALetter(plateTwo[2])) {
          store.dispatch(actions.addBike());
        } else {
          store.dispatch(actions.addCar());
        }

      }
    } catch (err) {
      setLoadingStart(true)
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
                placeholderTextColor={'#D9D9D9'}
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
                onFocus={() => { clearPlateOne(); clearPlateTwo(); }}
              />
              <TextInput
                ref={refPlateTwo}
                placeholder={'123'}
                placeholderTextColor={'#D9D9D9'}
                style={styles.plateInput}
                textAlign='center'
                maxLength={3}
                autoCapitalize={"characters"}
                keyboardType='default'
                onFocus={() => { clearPlateTwo(); }}
                onChangeText={text => {
                  setPlateTwo(text);
                }}
                value={plateTwo}
              />
            </View>
            <View style={{ alignItems: 'center', alignContent: 'center', height: '10%', width: '100%' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', color: '#FFFFFF', fontSize: normalize(21) }}>I  N  G  R  E  S  E     C  E  L  U  L  A  R</Text>
            </View>
            <View style={{ flexDirection: 'column', alignItems: 'center', alignContent: 'center', zIndex: 10, height: '62%', width: '60%' }}>
              {!showPhoneInput ?
                <DropDownPicker
                  items={phones}
                  zIndex={30}
                  defaultValue={phone}
                  disabled={!showDropdown}
                  placeholder={"Selecciona un numero"}
                  selectedLabelStyle={{ color: '#8F8F8F', fontSize: normalize(25), textAlign: 'center', fontFamily: 'Montserrat-Bold' }}
                  containerStyle={{
                    height: '23%', width: '100%'
                  }}
                  style={{
                    backgroundColor: '#fafafa',
                    borderTopLeftRadius: 20, 
                    borderTopRightRadius: 20,
                    borderBottomLeftRadius: 20, 
                    borderBottomRightRadius: 20
                    
                  }}
                  labelStyle={{
                    justifyContent: 'center', fontFamily: 'Montserrat-Bold', fontSize: normalize(20), color: '#D9D9D9'
                  }}
                  dropDownMaxHeight={100}
                  dropDownStyle={{ backgroundColor: '#fafafa', borderBottomLeftRadius: 15,
                  borderBottomRightRadius: 15 }}
                  arrowColor={'#00A9A0'}
                  arrowStyle={{alignItems: 'flex-start', alignContent: 'flex-start', justifyContent: 'flex-start'}}
                  arrowSize={24}
                  onChangeItem={item => {
                    if (item.value === 0) {
                      setShowPhoneInput(true)
                    } else {
                      setPhone(item.value)
                    }
                  }
                  }
                /> :
                <TextInput
                  placeholder={''}
                  style={styles.textInput}
                  keyboardType='numeric'
                  textAlign='center'
                  maxLength={10}
                  onChangeText={text => {
                    setNewPhone(text);
                    if (text.length === 10) {
                      if (plateOne.length === 3 && plateTwo.length === 3) Keyboard.dismiss()
                    }
                  }}
                  value={newPhone}
                />}
              {codeError && <Text>{codeError}</Text>}
              <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '30%', width: '60%', justifyContent: 'center', paddingTop: '10%'}}>
                <CheckBox
                  value={prepayDay}
                  onValueChange={setPrepayDay}
                  style={styles.checkbox}
                  tintColors={{ true: '#FFF200', false: 'transparent' }}
                />
                <Text style={{ color: '#FFF200', fontFamily: 'Montserrat-Bold', fontSize: normalize(19), textAlign: 'center' }}>PASE DIA</Text>
              </View>


              <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '40%', width: '100%', justifyContent: 'center' }}>
                {!loadingStart &&
                  <Button onPress={() => {
                    startPark(); setLoadingStart(true); 
                    
                  }}
                    title="I N I C I A R"
                    color='#FFF200'
                    style={styles.buttonI}
                    textStyle={styles.buttonText}
                    disabled={!existingUser || plateOne === "" || plateTwo === ""}
                  />
                }
                {loadingStart && <ActivityIndicator size={"large"} color={'#FFF200'} />}
                {!loadingStart &&
                  <TouchableOpacity style={styles.buttonT}
                    onPress={() => {
                      setLoadingStart(true);
                      setPlateOne("");
                      setPlateTwo("");
                      setPhone("");
                      store.dispatch(actions.setQr(plateOne + plateTwo));
                      navigation.navigate('QRscanner');
                      setLoadingStart(false)
                    }}
                    disabled={(plateOne + plateTwo).length < 6 || !existingUser }
                  >
                    <Image style={{ width: '65%', height: '65%', marginTop: '6%' }} resizeMode={"contain"} source={require('../../../assets/images/qr.png')} />
                  </TouchableOpacity>
                }
              </View>
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
            <View style={{ height: '70%', width: '73%', backgroundColor: '#FFFFFF', marginTop: '6%', borderRadius: 10 }}>
              <View style={{ marginBottom: '3%', marginTop: '3%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                {/* <Text style={styles.textListTitle} >Gerardo Bedoya</Text> */}
                {/* <View style={{ flexDirection: 'row', height: '25%', marginTop: '1%' }}>
                  <Text style={styles.textList} >Mensualidad hasta </Text>
                  <View style={{ marginLeft: '1%', backgroundColor: '#FFF200', borderRadius: 30, width: '25%', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textListDate} > 11/11/2020 </Text>
                  </View>
                </View> */}
              </View>
              <View style={{ height: "72%" }}>

                {/* <ModalPicker
                  data={phones} */}
                {/* // initValue={initValue}
                  // onChange={set}
                  // style={{ width: '30%', height: '30%'}} /> */}
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
            <View style={{ height: '23%', width: '100%', justifyContent: 'flex-end' }}>
              <FooterIndex navigation={navigation} />

            </View>
          </View>
        </TouchableWithoutFeedback>

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
              <View style={{
                height: '100%',
                width: '100%',
                justifyContent: 'space-between',
                padding: '2%'

              }}>
                <View style={{ margin: '4%', justifyContent: 'flex-end', height: ' 40%' }}>
                  <Text style={styles.modalTextAlert}> Este vehículo ya se encuentra parqueado. </Text>
                </View>
                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                  <Button onPress={() => {
                    setModal2Visible(!modal2Visible);
                    setPlateOne("");
                    setPlateTwo("");
                    setNewPhone("");
                    setLoadingStart(false);
                    setPhone(1);
                    setShowDropdown(false);
                    setShowPhoneInput(false);
                    setPrepayDay();
                    setPhones([{ label: 'Selecciona un número', value: 1 }]);
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
            <View style={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
              padding: '2%'
            }}>
              <Text style={{
                fontSize: normalize(51),
                textAlign: 'center',
                color: '#00A9A0',
                fontFamily: 'Montserrat-Bold'
              }}>
                {plateOne + ' ' + plateTwo}
              </Text>

              <View style={{ height: '10%', width: '75%', backgroundColor: '#FFF200', borderRadius: 20, justifyContent: 'center' }}>
                <Text style={styles.modalPhoneText}> {newPhone? '+' + newPhone : phone} </Text>
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
                  setNewPhone("");
                  setPhones([{ label: 'Selecciona un número', value: 1 }]);
                  setPhone(1);
                  setShowDropdown(false);
                  setPrepayDay();
                  setShowPhoneInput(false);
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

