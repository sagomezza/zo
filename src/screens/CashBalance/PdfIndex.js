
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import instance from "../../config/axios";
import firebase, { firestore } from "../../config/firebase";
import { LIST_BOX_CLOSE, CREATE_BOX_REPORT, READ_BOX_REPORT, SAVE_SIGN_REPORT } from "../../config/api";
import { connect } from 'react-redux';
import { TIMEOUT } from '../../config/constants/constants';
import * as actions from "../../redux/actions";
import Button from "../../components/Button"
import moment from 'moment-timezone';
import Header from '../../components/Header/HeaderIndex';
import styles from '../CashBalance/PdfStyles'
import normalize from '../../config/services/normalizeFontSize';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';
import * as Sentry from "@sentry/browser";


const { width, height } = Dimensions.get('window');

const txtGenerator = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const totalRecips = recips.recips !== undefined ? recips.recips : [];

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [loadingBoxGenerator, setLoadingBoxGenerator] = useState(false);
  const [loadingReadBoxReport, setLoadingReadBoxReport] = useState(false);

  const [dataToday, setDataToday] = useState([]);
  const [base, setBase] = useState(0);
  const [totalReported, setTotalReported] = useState(0);
  const [listBox, setListBox] = useState([]);
  const [shiftsOfBox, setShiftsOfBox] = useState(0);
  const shiftsOfBoxNum = shiftsOfBox !== undefined ? `$${numberWithPoints(shiftsOfBox)}` : "$ 0";
  const [readBoxReportInfo, setReadBoxReportInfo] = useState({});
  const [boxStatus, setBoxStatus] = useState("");
  const [boxId, setBoxId] = useState("");
  const [reports, setReports] = useState([]);
  const [date2, setDate2] = useState(moment());
  const [date1, setDate1] = useState(moment(date2).subtract(1, 'days'));
  const [loadingTodayRecips, setLoadingTodayRecips] = useState(true);
  const [signature, setSign] = useState(false);
  const [signatureUri, setSignatureUri] = useState("")

  useEffect(() => {
    setLoadingTodayRecips(true);
    try {
      const todayRecips = totalRecips.filter(recip =>
        !recip.dateFactured ?
          moment(recip.dateFinished).isBetween(date1, date2)
          :
          moment(moment(((recip.dateFactured)._seconds * 1000))).isBetween(date1, date2))
      setDataToday(todayRecips)
      setLoadingTodayRecips(false);
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err)
      setLoadingTodayRecips(false);
    }
  }, []);

  useEffect(() => {
    listBoxClose();
  }, []);

  const handleEmpty = () => {
    // console.log('Empty');
  };

  const handleSignature = signature => {
    const path = FileSystem.cacheDirectory + 'sign.png';
    FileSystem.writeAsStringAsync(path, signature.replace('data:image/png;base64,', ''), { encoding: FileSystem.EncodingType.Base64 }).then(res => {
      // console.log(res);
      FileSystem.getInfoAsync(path, { size: true, md5: true }).then(file => {
        // console.log(file);
        setSignatureUri(file.uri);
        setSign(true);
        // console.log(file.uri);

      })
    }).catch(err => {
      Sentry.captureException(err);
      // console.log("err", err);
    })
  };

  const style = `.m-signature-pad--footer
    .button {
      background-color: transparent;
      color: gray;
      border-color: gray;
    }`;

  const gotBoxTotal = () => {
    setLoadingBoxGenerator(false);
    setModalVisible(true);
  };

  const getBoxTotal = async () => {
    setLoadingBoxGenerator(true);
    firestore
      .collection("shiftReports")
      .where("hqId", "==", officialProps.hq[0])
      .orderBy("date", "desc")
      .get()
      .then(snapshot => {
        try {
          if (snapshot.empty) {
            setModal3Visible(true);
          }
          let reports = []
          snapshot.forEach(doc => {
            let data = doc.data()
            data.id = doc.id
            data.date = moment(data.date.toDate()).add(-5, "hours")
            data.dateStart = moment(data.dateStart.toDate()).add(-5, "hours")
            reports.push(data)
          })

          let dateStart = moment()
            .add(-1, "days")
            .set("hours", -5)
            .set("minutes", 0)
            .set("seconds", 0)
            .set("milliseconds", 0)

          let dateEnd = moment()
            .add(-1, "days")
            .set("hours", 18)
            .set("minutes", 59)
            .set("seconds", 59)
            .set("milliseconds", 59)

          const dailyReports = reports.filter((report) => {
            return report.dateStart >= dateStart && report.dateStart <= dateEnd
          })
          if (dailyReports.length === 0 || dailyReports.length < 3) {
            setModal3Visible(true);
          } else if (dailyReports.length > 2) {
            let boxTotal = 0
            dailyReports.forEach(report => {
              boxTotal += report.total
            })
            setReports(dailyReports);
            setShiftsOfBox(boxTotal);
            gotBoxTotal();
          }
          setLoadingBoxGenerator(false);
        } catch (err) {
          Sentry.captureException(err);
          // console.log(err)
        }
      })
      .catch(err => {
        Sentry.captureException(err);
        // console.log(err)
        setLoadingBoxGenerator(false);
      })
  };

  const listBoxClose = async () => {
    setLoadingReadBoxReport(true);
    try {
      const response = await instance.post(LIST_BOX_CLOSE, {
        hqId: officialProps.hq[0]
      },
        { timeout: TIMEOUT }
      );
      setListBox(response.data.data);
      setLoadingReadBoxReport(false);
    } catch (err) {
      Sentry.captureException(err);
      setLoadingReadBoxReport(false);
      // console.log(err)
      // console.log(err?.response)
    }
  };

  const createBoxReport = async () => {
    try {
      setLoadingBoxGenerator(true);
      const response = await instance.post(CREATE_BOX_REPORT, {
        hqId: officialProps.hq[0],
        officialEmail: officialProps.email,
        base: Number(base),
        totalReported: Number(totalReported)
      },
        { timeout: TIMEOUT }
      );
      setBase(0);
      settoTalReported(0);
      listBoxClose();
      setLoadingBoxGenerator(false);
      setModalVisible(false);
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err)
      // console.log(err?.response)
      setLoadingBoxGenerator(false);
    }
  };

  const readBoxReport = async (id) => {
    setLoadingReadBoxReport(true);
    setSign(false);
    try {
      setBoxId(id);
      const response = await instance.post(READ_BOX_REPORT, {
        id: id
      },
        { timeout: TIMEOUT }
      );
      setModal2Visible(true)
      setReadBoxReportInfo(response.data.data)
      setBoxStatus(response.data.data.status)
      setLoadingReadBoxReport(false);
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err)
      setLoadingReadBoxReport(false);
      // console.log(err?.response)
    }
  };

  const uploadImageToFirebase = async () => {
    try {
      setLoadingBoxGenerator(true);
      const sourceURI = { uri: signatureUri }
      const id = (Date.now().toString(36).substr(2, 5)).toUpperCase();
      const fileName = "Signature_" + id + ".jpeg";
      const response = await fetch(sourceURI.uri);
      const blob = await response.blob();
      const result = await firebase
        .storage()
        .ref()
        .child("/" + fileName)
        .put(blob);
      const downloadUri = await result.ref.getDownloadURL();
      // console.log(downloadUri)
      // console.log(boxId)
      const response2 = await instance.post(SAVE_SIGN_REPORT, {
        id: boxId,
        sign: downloadUri
      },
        { timeout: TIMEOUT }
      );
      setModal2Visible(false);
      listBoxClose();
      setSign(false);
      setLoadingBoxGenerator(false);
    } catch (err) {
      Sentry.captureException(err);
      setLoadingBoxGenerator(false);
      // console.log(err);
      // console.log(err?.response)
      Sentry.Native.captureEvent(new Error(err))
      if (err.response) Sentry.Native.captureEvent(new Error(err.response))
      setLoading(false)
    }
  };

  const handleGenerateBox = () => getBoxTotal();
  const handleBase = text => setBase(text); 
  const handleTotalReported = text => setTotalReported(text);
  const handleBack1 = () => setModalVisible(false);
  const handleBack2 = () => setModal2Visible(false);
  const handleOk3 = () => setModal3Visible(false); 

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        style={{
          flex: 1,
          width: '100%',
          height: '40%',
          flexDirection: 'column',
        }}
        source={require('../../../assets/images/logoutStripes.png')}>
        <Header navigation={navigation} />

        <View style={styles.container}>
          <View style={{ marginTop: '5%' }}>
            <Text style={styles.screenTitle} >CIERRE DE CAJA</Text>
          </View>
          <View style={styles.listOne}>
            <View style={{ width: '80%', marginBottom: '2%' }}>
              <Text style={styles.textListTitle} >TRANSACCIONES DEL DÍA</Text>
            </View>
            {loadingTodayRecips ?
              <View style={{ height: "83%" }}>
                <View style={{ justifyContent: 'center', height: '100%' }}>
                  <ActivityIndicator size={"large"} color={'#00A9A0'} />
                </View>
              </View>
              :
              <View style={{ height: "83%" }}>
                {dataToday.length > 0 ?
                  <FlatList
                    style={{ height: "37%" }}
                    data={dataToday}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={({ item }) => {
                      return (
                        <View style={{
                          flexDirection: "row",
                          marginBottom: '2%',
                          backgroundColor: '#FFFFFF',
                          borderRadius: 7,
                        }} >
                          <View style={{ margin: '3%' }} >
                            <Text style={styles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                          </View>
                          <View style={{ flex: 1, alignItems: 'flex-end', margin: '3%' }} >
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
                  :
                  <View style={{ padding: '10%' }}>
                    <Text style={styles.textPago}>
                      No se encuentran registros en el historial
                    </Text>
                  </View>
                }

              </View>
            }

          </View>
          <View style={{ height: '10%', width: '85%', alignSelf: 'center' }}>
            <Button
              onPress={handleGenerateBox}
              title="GENERAR CIERRE DE CAJA"
              color='transparent'
              style={{
                borderWidth: normalize(1),
                borderColor: "#00A9A0",
                borderWidth: 1,
                alignSelf: 'center',
                width: '83%',
                height: '60%',
                margin: '2%',
              }}
              textStyle={{ color: "#00A9A0", fontFamily: 'Montserrat-Medium', fontSize: width * 0.023, letterSpacing: 5 }}
              activityIndicatorStatus={loadingBoxGenerator}
              activityIndicatorStatusColor={'#00A9A0'}
            />
          </View>
          <View style={styles.listTwo}>
            <View style={{ marginBottom: '3%', marginTop: '3%' }}>
              <Text style={styles.textListTitle} >CIERRES DE CAJA ANTERIORES</Text>
            </View>
            {!loadingReadBoxReport ?
              <View style={{ height: "70%" }}>
                {
                  listBox.length > 0 ?
                    <FlatList
                      style={{ height: "70%" }}
                      data={listBox}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity
                          key={index.toString()}
                          onPress={()=>{readBoxReport(item.id);}}>
                            <View style={{ flexDirection: "row", marginBottom: '2%', justifyContent: 'space-around' }} >
                              <View style={{ margin: '1%' }} >
                                <Text style={styles.textPlaca}>{moment(item.dateFinished).format('L')}     {moment(item.dateFinished).format('LT')}</Text>
                              </View>
                              <View style={{ height: '50%', width: '25%', borderBottomWidth: 0.5, borderColor: '#707070', marginLeft: '2%', marginRight: '3%' }}></View>
                              <View style={{ width: '30%', marginRight: '2%', justifyContent: 'flex-end', alignItems: 'flex-end' }} >
                                {item.status === 'active' ?
                                  <Button
                                    title="ABIERTO"
                                    color='transparent'
                                    style={{
                                      borderColor: "#00A9A0",
                                      borderWidth: 1,
                                      width: '90%'
                                    }}
                                    textStyle={{
                                      color: "#00A9A0",
                                      fontFamily: 'Montserrat-Medium',
                                      fontSize: width * 0.015
                                    }}
                                    disabled={true}
                                  />
                                  :
                                  <Button
                                    title="CERRADO"
                                    color='#00A9A0'
                                    style={{
                                      borderColor: "#707070",
                                      width: '100%',
                                      padding: '5%'
                                    }}
                                    textStyle={{
                                      color: "#FFFFFF",
                                      fontFamily: 'Montserrat-Medium',
                                      fontSize: width * 0.015,
                                      letterSpacing: 5
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
                    <View style={{ height: "70%" }}>

                      <View style={{ padding: '10%' }}>
                        <Text style={styles.textPago}>
                          No se encuentran registros en el historial
                        </Text>
                      </View>
                    </View>

                }
              </View>
              :
              <View style={{ justifyContent: 'center', height: '100%' }}>
                <ActivityIndicator size={"large"} color={'#00A9A0'} />
              </View>
            }
          </View>
        </View>
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
              justifyContent: 'center',
              padding: '2%',
              flexDirection: 'column'
            }}>
              <View style={{ justifyContent: 'center', height: ' 30%' }}>
                <Text style={{
                  fontSize: normalize(30),
                  textAlign: 'center',
                  color: '#00A9A0',
                  fontFamily: 'Montserrat-Bold'
                }}>
                  INGRESE EL VALOR EXACTO:
                </Text>
                <Text style={{
                  fontSize: normalize(30),
                  textAlign: 'center',
                  color: '#8F8F8F',
                  fontFamily: 'Montserrat-Bold'
                }}>
                  Total: {shiftsOfBoxNum}
                </Text>
              </View>
              <View style={{
                justifyContent: 'space-around',
                height: '40%',
                flexDirection: 'column',
                paddingBottom: '6%',
                width: '95%',
              }}>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20) }}>Base:  </Text>
                  <CurrencyInput
                    placeholder='$'
                    textAlign='center'
                    keyboardType='numeric'
                    style={styles.currencyInput}
                    value={base}
                    onChangeValue={handleBase}
                    prefix="$"
                    delimiter="."
                    separator="."
                    precision={0}
                  />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20) }}> Producido :  </Text>
                  <CurrencyInput
                    placeholder='$'
                    textAlign='center'
                    keyboardType='numeric'
                    style={styles.currencyInput}
                    value={totalReported}
                    onChangeValue={handleTotalReported}
                    prefix="$"
                    delimiter="."
                    separator="."
                    precision={0}
                  />
                </View>
              </View>
              <View style={{ height: '20%', width: '100%', justifyContent: 'space-between' }}>
                <Button
                  onPress={createBoxReport}
                  title="GUARDAR"
                  color="#00A9A0"
                  style={styles.modalButton}
                  textStyle={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 5,
                    fontSize: normalize(20)
                  }}
                  activityIndicatorStatus={loadingBoxGenerator}
                />
                <Button
                  onPress={handleBack1}
                  title="VOLVER"
                  color="transparent"
                  style={
                    styles.modalButtonBack
                  }
                  textStyle={{
                    color: "#00A9A0",
                    textAlign: "center",
                    fontFamily: 'Montserrat-Medium',
                    letterSpacing: 5,
                    fontSize: normalize(20)
                  }} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal2Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewSign}>
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
              <View style={{ justifyContent: 'center', height: ' 75%' }}>
                <View style={{ justifyContent: 'center', height: ' 30%' }}>
                  <Text style={{ ...styles.modalText, fontSize: normalize(25), fontFamily: 'Montserrat-Bold', color: '#00A9A0' }}>CIERRE DE CAJA</Text>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>
                    {moment(readBoxReportInfo.dateFinished).format('L')} {moment(readBoxReportInfo.dateFinished).format('LT')}
                  </Text>
                  <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>
                    {`$${numberWithPoints(Number(readBoxReportInfo.totalReported))}`}
                  </Text>
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
                  <Text style={{ ...styles.modalText, fontSize: normalize(15), fontFamily: 'Montserrat-Bold' }}>¡ Firma guardada !</Text>
                </View>
                :
                <View style={{ margin: '0%', justifyContent: 'center', height: ' 10%' }}>
                </View>
              }
              {boxStatus === "active" ?
                <View style={{ height: '15%', width: '100%', justifyContent: 'center' }}>
                  <Button
                    onPress={uploadImageToFirebase}
                    title="GUARDAR"
                    color="#00A9A0"
                    style={
                      styles.modalButtonSign
                    }
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }}
                    activityIndicatorStatus={loadingBoxGenerator}
                  />
                  <Button
                    onPress={handleBack2}
                    title="VOLVER"
                    color="transparent"
                    style={
                      styles.modalButtonBack
                    }
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
                :
                <View style={{ height: '15%', width: '100%', justifyContent: 'center', marginTop: '5%' }}>
                  <Button
                    onPress={handleBack2}
                    title="VOLVER"
                    color="transparent"
                    style={styles.modalButtonBack}
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }} />
                </View>
              }
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
            <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '0%' }}>
              <Image
                style={{ width: '30%', alignSelf: 'center', marginBottom: '10%', marginTop: '10%' }}
                resizeMode={"contain"}
                source={require("../../../assets/images/alert.png")}
              />
              <View style={{ justifyContent: 'center', height: '30%' }}>
                <Text style={{ ...styles.modalText, fontSize: normalize(20), color: '#8F8F8F', fontFamily: 'Montserrat-Bold' }}> No se han realizado los cierres de turno necesarios para generar un cierre de caja. </Text>
              </View>
              <View style={{ height: '30%', justifyContent: 'flex-end', flexDirection: 'column', marginTop: '3%' }}>
                <View style={{ height: '57%', width: '80%', justifyContent: 'flex-end', alignSelf: 'center' }}>
                  <Button onPress={handleOk3}
                    title="ENTENDIDO"
                    color="#00A9A0"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: 'Montserrat-Medium',
                      letterSpacing: 5,
                      fontSize: normalize(20)
                    }}
                  />
                </View>
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
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken

});

export default connect(mapStateToProps, actions)(txtGenerator);
