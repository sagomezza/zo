
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';

import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Share,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator
} from 'react-native';

// Import HTML to PDF
import instance from "../../config/axios";
import { LIST_BOX_CLOSE, CREATE_BOX_REPORT, READ_BOX_REPORT, SAVE_SIGN_REPORT } from "../../config/api";

import { connect } from 'react-redux';
import * as actions from "../../redux/actions";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Button from "../../components/Button"
import moment from 'moment';
import Header from '../../components/Header/HeaderIndex';
import styles from '../CashBalance/PdfStyles'
import normalize from '../../config/services/normalizeFontSize';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';


const txtGenerator = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const totalRecips = recips.recips !== undefined ? recips.recips : "";
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [loadingBoxGenerator, setLoadingBoxGenerator] = useState(false);
  const [loadingReadBoxReport, setLoadingReadBoxReport] = useState(false);


  const [dataToday, setDataToday] = useState([]);
  const [base, setBase] = useState(0);
  const [totalReported, settoTalReported] = useState(0);
  const [listBox, setListBox] = useState([]);
  const [readBoxReportInfo, setReadBoxReportInfo] = useState({});
  const [boxStatus, setBoxStatus] = useState("");
  const [boxId, setBoxId] = useState("");

  const [date1, setDate1] = useState(new Date(moment().subtract(1, 'days')));
  const [date2, setDate2] = useState(new Date());

  const [signature, setSign] = useState(false);
  const [signatureUri, setSignatureUri] = useState("")



  const handleEmpty = () => {
    console.log('Empty');
  }

  const handleSignature = signature => {
    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), { encoding: FileSystem.EncodingType.Base64 }).then(res => {
      console.log(res);
      FileSystem.getInfoAsync(path, { size: true, md5: true }).then(file => {
        console.log("-------1-----")
        console.log(file);
        setSignatureUri(file.uri);
        setSign(true);
        console.log(file.uri);

        console.log("-------2-----")

      })
    }).catch(err => {
      console.log("err", err);
    })
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: gray;
      color: #FFF;
    }`;

  useEffect(() => {
    listBoxClose();
  }, []);

  const listBoxClose = async () => {
    try {
      const response = await instance.post(LIST_BOX_CLOSE, {
        hqId: officialProps.hq[0]
      });
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.total));
      // }
      console.log('------------sup---------')
      console.log(response.data.data)
      setListBox(response.data.data)
      console.log('------------sup222---------')

    } catch (err) {
      console.log(err)
      console.log(err?.response)
    }
  };

  const createBoxReport = async () => {
    try {
      setLoadingBoxGenerator(true);
      console.log({
        hqId: officialProps.hq[0],
        officialEmail: officialProps.email,
        base: Number(base),
        totalReported: Number(totalReported)
      })
      const response = await instance.post(CREATE_BOX_REPORT, {
        hqId: officialProps.hq[0],
        officialEmail: officialProps.email,
        base: Number(base),
        totalReported: Number(totalReported)
      });
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.total));
      // }
      // console.log('------------create---------')
      // console.log(response.data)
      // console.log('------------createbox---------')
      setBase(0);
      settoTalReported(0);
      listBoxClose();
      setLoadingBoxGenerator(false);
      setModalVisible(!modalVisible);

    } catch (err) {
      console.log(err)
      console.log('------------createbox-ERR--------')
      console.log(err?.response)
      setLoadingBoxGenerator(false);

    }
  };

  const readBoxReport = async (id) => {
    setLoadingReadBoxReport(true);
    setSign(false);
    try {
      console.log(id)
      setBoxId(id);
      const response = await instance.post(READ_BOX_REPORT, {
        id: id
      });
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.total));
      // }
      setModal2Visible(true)
      setReadBoxReportInfo(response.data.data)
      setBoxStatus(response.data.data.status)
      setLoadingReadBoxReport(false);

    } catch (err) {
      console.log(err)
      console.log('------------createbox-ERR--------')
      setLoadingReadBoxReport(false);

      console.log(err?.response)
    }
  };

  const saveSignReport = async () => {
    setLoadingBoxGenerator(true);
    try {
      const response = await instance.post(SAVE_SIGN_REPORT, {
        id: boxId,
        sign: signatureUri
      });
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.total));
      // }
      console.log('------------read---------')
      console.log(response)
      console.log('------------read---------')
      setModal2Visible(false);
      listBoxClose();
      setSign(false);
      setLoadingBoxGenerator(false);


    } catch (err) {
      setLoadingBoxGenerator(false);

      console.log(err)
      console.log('------------createbox-ERR--------')
      console.log(err?.response)
    }
  };

  useEffect(() => {

    try {
      const todayRecips = totalRecips.filter(recip => moment(recip.dateFinished).isBetween(date1, date2))
      // console.log(todayRecips)

      setDataToday(todayRecips)
    } catch (err) {
      console.log(err)

    }
  }, [date1, date2]);


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

        <View style={styles.container}>
          <View style={styles.listContainer}>
            <View style={styles.listOne}>

              <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                <Text style={styles.textListTitle} >TRANSACCIONES DEL DÍA</Text>
              </View>
              <View style={{ height: "72%" }}>
                {/* {recips.recips.length > 0 ? */}
                <FlatList
                  style={{ height: "37%" }}
                  data={dataToday}
                  keyExtractor={(item, index) => String(index)}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%' }} >
                        <View style={{ marginBottom: '2%' }} >
                          <Text style={styles.textPlaca}>{item.plate}</Text>
                          <Text style={styles.textPago}>Pago por ${formatHours(item.hours)} horas</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
                          <Text style={styles.textMoney}>{`$${numberWithPoints(item.total)}`}</Text>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>
            </View>
            <View style={{ height: '10%' }}>
              <Button
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Generar cierre de caja"
                color='#00A9A0'
                style={{
                  borderWidth: normalize(1),
                  borderColor: "#707070",
                  alignSelf: 'center',
                  width: '69%',
                  height: '53%',
                  margin: '2%',
                  paddingHorizontal: '10%',
                  paddingVertical: '1%'
                }}
                textStyle={{ color: "#FFFFFF", fontFamily: 'Montserrat-Bold', fontSize: normalize(20), }}
              />
            </View>

            <View style={styles.listTwo}>
              <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                <Text style={styles.textListTitle} >CIERRES DE CAJA ANTERIORES</Text>
              </View>
              <View style={{ height: "70%" }}>
                {!loadingReadBoxReport ?
                  <FlatList
                    style={{ height: "40%" }}
                    data={listBox}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item, index }) => {
                      return (
                        <TouchableOpacity
                          key={index.toString()}
                          onPress={() => {
                            readBoxReport(item.id);

                          }}
                        >

                          <View style={{ flexDirection: "row", borderBottomWidth: 1, borderColor: "#E9E9E9", marginBottom: '2%', marginLeft: '10%', marginRight: '10%', marginTop: '0%', justifyContent: 'space-between' }} >
                            <View style={{ marginBottom: '0%' }} >
                              <Text style={styles.textPago}> </Text>

                              <Text style={styles.textPlaca}>{moment(item.dateFinished).format('L')} {moment(item.dateFinished).format('LT')}</Text>
                            </View>
                            <View style={{ alignItems: 'flex-end', marginTop: '3%' }} >
                              {item.status === 'active' ?
                                <Button
                                  // onPress={onShare}
                                  title="Abierto"
                                  color='#FFFFFF'
                                  style={{
                                    borderColor: "#00A9A0",
                                    borderWidth: 1,
                                    paddingHorizontal: '15%'
                                  }}
                                  textStyle={{
                                    color: "#00A9A0",
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: normalize(15)
                                  }}
                                  disabled={true}
                                />
                                :
                                <Button
                                  // onPress={onShare}
                                  title="Cerrado"
                                  color='#00A9A0'
                                  style={{
                                    borderColor: "#707070",
                                    paddingHorizontal: '15%'
                                  }}
                                  textStyle={{
                                    color: "#FFFFFF",
                                    fontFamily: 'Montserrat-Bold',
                                    fontSize: normalize(15)
                                  }}
                                  disabled={true}
                                />
                              }

                            </View>
                          </View>



                        </TouchableOpacity>
                      )
                    }}
                  />
                  :
                  <View style={{ justifyContent: 'center', height: '100%' }}>
                    <ActivityIndicator size={"large"} color={'#00A9A0'} />
                  </View>
                }
                {/* : */}
                {/* 
  <Text style={styles.textPago}> No se encuentran registros en el historial </Text>
</View> */}
                {/* } */}
              </View>
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
                  <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
                    <View style={{ margin: '2%', justifyContent: 'center', height: ' 30%' }}>
                      <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Ingrese el valor exacto:</Text>
                    </View>
                    <View style={{ justifyContent: 'space-around', height: '40%', flexDirection: 'column', paddingBottom: '6%', width: '95%' }}>
                      <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20) }}>Base:  </Text>
                        <TextInput
                          style={{
                            borderWidth: 1,
                            fontSize: normalize(20),
                            fontFamily: 'Montserrat-Bold',
                            backgroundColor: '#FFFFFF',
                            width: '60%',
                            borderRadius: 10,
                            borderColor: '#00A9A0',
                            color: '#00A9A0'
                          }}
                          keyboardType='numeric'
                          placeholder='$'
                          textAlign='center'
                          keyboardType={"numeric"}
                          value={base == 0 ? '' : base + ''}
                          onChangeText={text => setBase(text)}
                        />
                      </View>
                      <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20) }}> Producido :  </Text>
                        <TextInput
                          style={{
                            borderWidth: 1,
                            fontSize: normalize(20),
                            fontFamily: 'Montserrat-Bold',
                            backgroundColor: '#FFFFFF',
                            width: '60%',
                            borderRadius: 10,
                            borderColor: '#00A9A0',
                            color: '#00A9A0'
                          }}
                          keyboardType='numeric'
                          placeholder='$'
                          textAlign='center'
                          value={totalReported == 0 ? '' : totalReported + ''}
                          onChangeText={text => settoTalReported(text)}
                        />
                      </View>
                    </View>
                    <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end', marginTop: '5%' }}>
                      <Button
                        onPress={() => {
                          createBoxReport();


                        }}
                        title="G U A R D A R"
                        color="#00A9A0"
                        style={
                          styles.modalButton
                        }
                        textStyle={{
                          color: "#FFFFFF",
                          textAlign: "center",
                          fontFamily: 'Montserrat-Bold'
                        }}
                        activityIndicatorStatus={loadingBoxGenerator}
                      />
                      <Button
                        onPress={() => {
                          setModalVisible(!modalVisible);
                        }}
                        title="V O L V E R"
                        color="gray"
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
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalViewSign}>
                  <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
                    <View style={{ margin: '0%', justifyContent: 'center', height: ' 75%' }}>
                      <View style={{ margin: '2%', justifyContent: 'center', height: ' 30%' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Cierre de Caja:</Text>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>{moment(readBoxReportInfo.dateFinished).format('L')} {moment(readBoxReportInfo.dateFinished).format('LT')}</Text>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>{`$${numberWithPoints(Number(readBoxReportInfo.totalReported))}`}</Text>
                      </View>
                      {boxStatus === "active" ?


                        <Signature
                          onOK={handleSignature}
                          onEmpty={handleEmpty}
                          descriptionText=""
                          clearText="Clear"
                          confirmText="Save"
                          webStyle={style}
                        />

                        :
                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Firma guardada</Text>

                      }
                    </View>
                    {signature ?
                      <View style={{ margin: '0%', justifyContent: 'center', height: ' 10%' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(15), fontFamily: 'Montserrat-Bold', color: 'red' }}>¡ Firma guardada !</Text>
                      </View>
                      :
                      <View style={{ margin: '0%', justifyContent: 'center', height: ' 10%' }}>
                      </View>
                    }


                    {boxStatus === "active" ?

                      <View style={{ height: '15%', width: '100%', justifyContent: 'center', marginTop: '5%' }}>

                        <Button
                          onPress={() => {
                            saveSignReport();

                          }}
                          title="G U A R D A R"
                          color="#00A9A0"
                          style={
                            styles.modalButtonSign
                          }
                          textStyle={{
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontFamily: 'Montserrat-Bold'
                          }}
                          activityIndicatorStatus={loadingBoxGenerator}
                        />
                        <Button
                          onPress={() => {
                            setModal2Visible(!modal2Visible);
                          }}
                          title="V O L V E R"
                          color="gray"
                          style={
                            styles.modalButtonSign
                          }
                          textStyle={{
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontFamily: 'Montserrat-Bold'
                          }} />
                      </View>
                      :
                      <View style={{ height: '15%', width: '100%', justifyContent: 'center', marginTop: '5%' }}>
                        <Button
                          onPress={() => {
                            setModal2Visible(!modal2Visible);
                          }}
                          title="V O L V E R"
                          color="gray"
                          style={
                            styles.modalButtonSign
                          }
                          textStyle={{
                            color: "#FFFFFF",
                            textAlign: "center",
                            fontFamily: 'Montserrat-Bold'
                          }} />
                      </View>
                    }
                  </View>
                </View>
              </View>
            </Modal>

          </View>
          <View style={{
            height: '17%',
            width: '100%',
            justifyContent: 'flex-end'
          }}>
            <FooterIndex navigation={navigation} />
          </View>

        </View>
      </ImageBackground>


    </View>



  );
}

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken

});

export default connect(mapStateToProps, actions)(txtGenerator);
