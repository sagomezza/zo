import React, { useEffect, useRef, useState } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity, Modal, TouchableHighlight, Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { TextInput } from 'react-native-gesture-handler';
import FooterIndex from '../../components/Footer';
import { Camera } from "expo-camera";
import styles from './styles';
import { READ_HQ, START_PARKING } from '../../config/api';
import instance from '../../config/axios';
import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
import moment from 'moment';
import { TIMEOUT } from '../../config/constants/constants';
import store from '../../config/store';

// export default class BarcodeScanner extends React.Component {
const BarcodeScanner = (props) => {

  const { navigation, officialProps, qr} = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const errorRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState("off");
  const [modalVisible, setModalVisible] = useState(false);
  const [ plate, setPlate] = useState();
  const [startParking, setStartParking] = useState({});

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
        
        if ((qr.plate).length === 0){
          store.dispatch(actions.setPhone(_data.phone))
          navigation.navigate("UserOut")
        } else {
          let type
          if (isCharacterALetter(qr.plate[5])) type = "bike"
          else type = "car"
          const response = await instance.post(
            START_PARKING,
            {
              plate: qr.plate,
              hqId: officialHq,
              dateStart: new Date(),
              phone: _data.phone,
              type,
              isParanoic:true
            },
            { timeout: TIMEOUT }
          )
          // setPlate({plate});
          
          setStartParking(response.data.data);
          readHq();
          setModalVisible(true);
          store.dispatch(actions.setQr(''))

          
       }
      } 
      catch (err) {
      console.log(err?.response?.data);
      if(err?.response?.data) {
        // noFundsRef.current.show()
      } else {
        errorRef.current.show()
      }
    }
  };

  async function readHq () {
    try {
      const response = await instance.post(READ_HQ, {
        id: officialHq
      });
      if(response.data.response){
        store.dispatch(actions.setReservations(response.data.data.reservations));
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };
  
  // const onCloseErrors = () => {
  //   errorRef.current.close()
  //   navigation.navigate("Home");
  // }

  // const toggleFlash = () => {
  //   try {
  //     if (flash === "torch") setFlash("off");
  //     else setFlash("torch");
  //   } catch (e) {
  //     //console.log(e);
  //   }
  // };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No hay acceso a la cámara</Text>;
  }

    return ( 
        <View style={{flex: 1}}>
            {/* <View style={{flexDirection: "row", marginTop: '15%', marginBottom: '10%', justifyContent: 'center'}}>
                <TextInput
                style={styles.plateInput}
                textAlign='center'
                value={plate}
                editable={false}
                />
                
            </View> */}
            <View style = {styles.container}>
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
                        color: "white",
                        alignSelf: "center",
                        fontWeight: "bold",
                        fontSize: 22,
                        top: "90%",
                      }}
                    >
                      Leer un QR
                    </Text>
                  </View>
                  <View style={styles.middleSection}>
                    <View style={styles.darkenSection}></View>
                    <View style={styles.qrSquare}></View>
                    <View style={styles.darkenSection}></View>
                  </View>
                  
                  {/* <View style={styles.darkenSection}>
                    <TouchableOpacity
                      onPress={toggleFlash}
                      style={styles.flashlightContainer}
                    >
                      {flash === "off" ? (
                        <MaterialCommunityIcons
                          name="flashlight"
                          size={50}
                          color="black"
                        />
                      ) : (
                        <MaterialCommunityIcons
                          name="flashlight-off"
                          size={50}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View> */}
                </View>
{/*               
                <CustomModal
                  ref={errorRef}
                  custom={true}
                  onTouchOutside={onCloseErrors}
                >
                  <View style={{ alignItems: "center", marginVertical: 20 }}>
                    <Text style={{ fontSize: 30, fontWeight: "bold" }}>¡Error inesperado!</Text>
                    <View style={{ marginVertical: 40, alignItems: "center" }}>
                      <Text style={{ fontSize: 20 }}>Algo salió mal al intentar leer el QR</Text>
                      
                      <Text style={{ fontSize: 20 }}>Vuelve a intarlo más tarde</Text>
                    </View>
                    <Button
                      title={"Entendido"}
                      color={"primary"}
                      onPress={onCloseErrors}
                    />
                  </View>
                </CustomModal> */}
              </Camera>
            </View>
            
            <FooterIndex navigation={navigation}/>
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
                  <View style={{ marginBottom: '7%', alignItems: 'center' }}>
                    <Text style={styles.modalText}> {plate} </Text> 
                    <Text>Ha iniciado tiempo de parqueo</Text>
                    <Text>{moment().calendar()}</Text>
                  </View>
                  <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      navigation.navigate("UserInput");
                      
                    }}
                  >
                    <Text style={styles.textStyle}>Entendido</Text>
                  </TouchableHighlight>
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



  // handleBarCodeScanned = () => {
  //   this.setState({
  //     scanned: true,
  //     modalVisible: true
  //   });
  // };