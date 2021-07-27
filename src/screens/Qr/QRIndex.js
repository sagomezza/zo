import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Modal,
  Image
} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from "expo-camera";
import FooterIndex from '../../components/Footer';
import styles from './styles';
import moment from 'moment';
import store from '../../config/store';
import normalize from '../../config/services/normalizeFontSize';
import Button from '../../components/Button';
import Header from '../../components/Header/HeaderIndex';
// redux
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
// api
import { TIMEOUT } from '../../config/constants/constants';
import { READ_HQ, START_PARKING } from '../../config/api';
import instance from '../../config/axios';
import * as Sentry from "@sentry/browser";

const BarcodeScanner = (props) => {
  const { navigation, officialProps, qr } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const errorRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState("off");
  const [modalVisible, setModalVisible] = useState(false);
  const [plate, setPlate] = useState();
  const [startParking, setStartParking] = useState({});
  const [modal2Visible, setModal2Visible] = useState(false);

  function isCharacterALetter(char) {
    return (/[a-zA-Z]/).test(char)
  }

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      const _data = JSON.parse(data);
      // console.log("DATA QR",_data)
      if ((qr.plate).length === 0) {
        await store.dispatch(actions.setPhone(_data.id))
        navigation.replace("UserOut")
      } else {
        let type
        if (isCharacterALetter(qr.plate[5]) || qr.plate.length === 5) type = "bike"
        else type = "car"
        const response = await instance.post(
          START_PARKING,
          {
            plate: qr.plate,
            hqId: officialHq,
            dateStart: new Date(),
            phone: _data.id,
            type,
            isParanoic: true,
            officialEmail: officialProps.email
          },
          { timeout: TIMEOUT }
        )
        setStartParking(response.data.data);
        readHq();
        setPlate(qr.plate);
        setModalVisible(true);
      }
    }
    catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response);
      if (err?.response.data.response === -2) setModal2Visible(true)
    }
    store.dispatch(actions.setQr(''))
  }

  async function readHq() {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      store.dispatch(actions.setReservations(response.data.data.reservations));
      store.dispatch(actions.setHq(response.data.data));
    } catch (error) {
      Sentry.captureException(error);
      // console.log("err: ", error);
      // console.log(err?.response?.data);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No hay acceso a la cámara</Text>;
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <Camera
          style={styles.camera}
          barCodeScannerSettings={{
            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
          }}
          flashMode={flash}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          ratio="16:9"
        >
          <View style={styles.overlay}>
            <View style={styles.darkenSection}>
              <Text
                style={{
                  color: "#00A9A0",
                  alignSelf: "center",
                  fontSize: normalize(22),
                  top: "80%",
                  fontFamily: 'Montserrat-Bold'
                }}
              >
                ESCANEAR CÓDIGO QR
              </Text>
            </View>
            <View style={styles.middleSection}>
              <View style={styles.darkenSection}></View>
              <View style={styles.qrSquare}></View>
              <View style={styles.darkenSection}></View>
            </View>
            <View style={styles.darkenSection}>
            </View>
          </View>
        </Camera>
      </View>
      <View style={{ height: '11%', width: '100%', justifyContent: 'flex-end' }}>
        <FooterIndex navigation={navigation} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              flexDirection: 'column',
              height: '100%',
              width: '100%',
              alignContent: 'center',
              alignItems: 'center',
              padding: '2%',
              justifyContent: 'space-between'
            }}>
              <Text style={{
                fontSize: normalize(51),
                textAlign: 'center',
                color: '#00A9A0',
                fontFamily: 'Montserrat-Bold'
              }}>
                {plate}
              </Text>
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
                  navigation.navigate("UserInput");
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
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
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
                <Text style={styles.modalTextAlert}> Este código QR ya se encuentra estacionado. </Text>
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                <Button onPress={() => {
                  setModal2Visible(!modal2Visible);
                  navigation.navigate("UserInput");
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
  );
}

const mapStateToProps = (state) => ({
  qr: state.qr,
  officialProps: state.official,

});

export default connect(mapStateToProps, actions)(BarcodeScanner);
