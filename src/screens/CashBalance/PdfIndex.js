
import React, { useState, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import {
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import CurrencyInput from 'react-native-currency-input';
import instance from "../../config/axios";
import firebase, { firestore } from "../../config/firebase";
import { LIST_BOX_CLOSE, CREATE_BOX_REPORT, READ_BOX_REPORT, SAVE_SIGN_REPORT, GET_BOX_TOTAL } from "../../config/api";
import { connect } from 'react-redux';
import { TIMEOUT } from '../../config/constants/constants';
import * as actions from "../../redux/actions";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import Button from "../../components/Button"
import moment from 'moment-timezone';
import Header from '../../components/Header/HeaderIndex';
import styles from '../CashBalance/PdfStyles'
import normalize from '../../config/services/normalizeFontSize';
import numberWithPoints from '../../config/services/numberWithPoints';
import FooterIndex from '../../components/Footer';
import Signature from 'react-native-signature-canvas';
import * as FileSystem from 'expo-file-system';

const { width, height } = Dimensions.get('window');

const txtGenerator = (props) => {
  const { navigation, officialProps, reservations, recips, hq } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const totalRecips = recips.recips !== undefined ? recips.recips : "";

  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);

  const [loadingBoxGenerator, setLoadingBoxGenerator] = useState(false);
  const [loadingReadBoxReport, setLoadingReadBoxReport] = useState(false);

  const [dataToday, setDataToday] = useState([]);
  const [base, setBase] = useState(0);
  const [totalReported, settoTalReported] = useState(0);
  const [listBox, setListBox] = useState([]);
  const [shiftsOfBox, setShiftsOfBox] = useState(0);
  const shiftsOfBoxNum = shiftsOfBox !== undefined ? `$${numberWithPoints(shiftsOfBox)}` : "$ 0";
  const [readBoxReportInfo, setReadBoxReportInfo] = useState({});
  const [boxStatus, setBoxStatus] = useState("");
  const [boxId, setBoxId] = useState("");
  const [reports, setReports] = useState([]);

  const [date1, setDate1] = useState(new Date(moment().subtract(1, 'days')));
  const [date2, setDate2] = useState(new Date());
  const [loadingTodayRecips, setLoadingTodayRecips] = useState(true);
  const [signature, setSign] = useState(false);
  const [signatureUri, setSignatureUri] = useState("")

  useEffect(() => {
    setLoadingTodayRecips(true);
    try {
      const todayRecips = totalRecips.filter(recip => moment(recip.dateFinished).isBetween(date1, date2))
      // console.log(todayRecips)
      setDataToday(todayRecips)
      setLoadingTodayRecips(false);
    } catch (err) {
      console.log(err)
      setLoadingTodayRecips(false);
    }
  }, [date1, date2]);

  useEffect(() => {
    listBoxClose();
  }, []);

  const handleEmpty = () => {
    console.log('Empty');
  };

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

  const formatHours = (hours) => {
    if (typeof hours === "number" || typeof hours === "double" || typeof hours === "long" || typeof hours === "float") {
      return Math.round(hours)
    } else return hours
  };

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
            return report.dateStart >= dateStart
          })
          if (dailyReports.length === 0 || dailyReports.length < 3) {
            setModal3Visible(true);
          } else if (reports.length > 2) {
            let boxTotal = 0
            dailyReports.forEach(report => {
              boxTotal += report.total
            })
            // console.log(dateStart)
            // console.log(dateEnd)
            console.log(dailyReports)
            setReports(dailyReports);
            setShiftsOfBox(boxTotal);
            gotBoxTotal();

          }
          setLoadingBoxGenerator(false);
        } catch (err) {
          console.log(err)
        }

      })
      .catch(err => {
        console.log(err)
        setLoadingBoxGenerator(false);
      })


    // try {
    //   const response = await instance.post(GET_BOX_TOTAL, {
    //     hqId: officialProps.hq[0]
    //   },
    //     { timeout: TIMEOUT }
    //   );
    //   if (response.data.response === 1) {
    //     setShiftsOfBox(response.data.data);
    //   }
    //   gotBoxTotal();
    // } catch (err) {
    //   setLoadingBoxGenerator(false);
    //   console.log(err)
    //   console.log(err?.response)
    //   setModal3Visible(true);
    // }
  };

  const listBoxClose = async () => {
    setLoadingReadBoxReport(true);
    try {
      const response = await instance.post(LIST_BOX_CLOSE, {
        hqId: officialProps.hq[0]
      },
        { timeout: TIMEOUT }
      );
      if (response.data.response === 1) {
        setListBox(response.data.data);
        setLoadingReadBoxReport(false);
      }
    } catch (err) {
      setLoadingReadBoxReport(false);
      // console.log(err)
      console.log(err?.response)
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
      if (response.data.response === 1) {
        setBase(0);
        settoTalReported(0);
        listBoxClose();
        setLoadingBoxGenerator(false);
        setModalVisible(!modalVisible);
      }
    } catch (err) {
      console.log(err)
      console.log(err?.response)
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
      if (response.data.response === 1) {
        setModal2Visible(true)
        setReadBoxReportInfo(response.data.data)
        setBoxStatus(response.data.data.status)
        setLoadingReadBoxReport(false);
      }
    } catch (err) {
      console.log(err)
      setLoadingReadBoxReport(false);
      console.log(err?.response)
    }
  };

  const uploadImageToFirebase = async () => {
    console.log(boxId)
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
      console.log(downloadUri)
      console.log(boxId)
      const response2 = await instance.post(SAVE_SIGN_REPORT, {
        id: boxId,
        sign: downloadUri
      },
        { timeout: TIMEOUT }
      );
      // if (response.data.response === 1) {
      //   store.dispatch(actions.setRecips(response.data.data.total));
      // }
      setModal2Visible(false);
      listBoxClose();
      setSign(false);
      setLoadingBoxGenerator(false);
    } catch (err) {
      setLoadingBoxGenerator(false);
      console.log("in error")
      console.log(err);
      console.log(err?.response)
      Sentry.Native.captureEvent(new Error(err))
      if (err.response) Sentry.Native.captureEvent(new Error(err.response))
      setLoading(false)
    }
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
          <View style={{ marginTop: '3%' }}>
            <Text style={styles.screenTitle} >CIERRE DE CAJA</Text>
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listOne}>
              <View style={{
                marginLeft: '10%',
                marginBottom: '3%',
                marginTop: '3%'
              }}>
                <Text style={styles.textListTitle} >TRANSACCIONES DEL DÍA</Text>
              </View>
              {loadingTodayRecips ?
                <View style={{ height: "72%" }}>
                  <View style={{ justifyContent: 'center', height: '100%' }}>
                    <ActivityIndicator size={"large"} color={'#00A9A0'} />
                  </View>
                </View>
                :
                <View style={{ height: "72%" }}>
                  {dataToday.length > 0 ?
                    <FlatList
                      style={{ height: "37%" }}
                      data={dataToday}
                      keyExtractor={(item, index) => String(index)}
                      renderItem={({ item }) => {
                        return (
                          <View style={{
                            flexDirection: "row",
                            borderBottomWidth: 1,
                            borderColor: "#E9E9E9",
                            marginBottom: '2%',
                            marginLeft: '10%',
                            marginRight: '10%',
                            marginTop: '0%'
                          }} >
                            <View style={{ marginBottom: '2%' }} >
                              <Text style={styles.textPlaca}>{typeof item.plate === 'string' ? item.plate : item.plate[0]}</Text>
                              <Text style={styles.textPago}>Pago por ${formatHours(item.hours)} horas</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', marginTop: '3%' }} >
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
                    <View style={{ marginLeft: '13%', padding: '10%' }}>
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
                onPress={() => {

                  getBoxTotal();
                }}
                title="Generar cierre de caja"
                color='#00A9A0'
                style={{
                  borderWidth: normalize(1),
                  borderColor: "#707070",
                  alignSelf: 'center',
                  width: '100%',
                  height: '60%',
                  margin: '2%',
                }}
                textStyle={{ color: "#FFFFFF", fontFamily: 'Montserrat-Bold', fontSize: width * 0.03, }}
                activityIndicatorStatus={loadingBoxGenerator}
              />
            </View>

            <View style={styles.listTwo}>
              <View style={{ marginLeft: '10%', marginBottom: '3%', marginTop: '3%' }}>
                <Text style={styles.textListTitle} >CIERRES DE CAJA ANTERIORES</Text>
              </View>
              {!loadingReadBoxReport ?
                <View style={{ height: "70%" }}>
                  {
                    listBox.length > 0 ?
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
                                <View style={{ alignItems: 'flex-end', marginTop: '3%', width: '49%' }} >
                                  {item.status === 'active' ?
                                    <Button
                                      // onPress={onShare}
                                      title="Abierto"
                                      color='#FFFFFF'
                                      style={{
                                        borderColor: "#00A9A0",
                                        borderWidth: 1,
                                        width: '90%'
                                      }}
                                      textStyle={{
                                        color: "#00A9A0",
                                        fontFamily: 'Montserrat-Bold',
                                        fontSize: width * 0.02
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
                                        width: '90%'
                                      }}
                                      textStyle={{
                                        color: "#FFFFFF",
                                        fontFamily: 'Montserrat-Bold',
                                        fontSize: width * 0.02
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

                        <View style={{ marginLeft: '13%', padding: '10%' }}>
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
                    padding: '3%'
                  }}>
                    <View style={{
                      margin: '2%',
                      justifyContent: 'center',
                      height: ' 40%'
                    }}>
                      <Text style={{
                        ...styles.modalText,
                        fontSize: normalize(20),
                        fontFamily: 'Montserrat-Bold'
                      }}>
                        Ingrese el valor exacto:
                      </Text>
                      <Text style={{
                        ...styles.modalText,
                        fontSize: normalize(20),
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
                      width: '95%'
                    }}>
                      <View style={{
                        flexDirection: "row",
                        justifyContent: 'flex-end'
                      }}>
                        <Text style={{
                          ...styles.modalText,
                          fontSize: normalize(20)
                        }}>Base:  </Text>
                        <CurrencyInput
                          placeholder='$'
                          textAlign='center'
                          keyboardType='numeric'
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
                          value={base}
                          onChangeValue={text => setBase(text)}
                          prefix="$"
                          delimiter="."
                          separator="."
                          precision={0}
                          onChangeText={(formattedValue) => {
                            // console.log(formattedValue);
                            // $2,310.46
                          }}
                        />

                      </View>
                      <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20) }}> Producido :  </Text>
                        <CurrencyInput
                          placeholder='$'
                          textAlign='center'
                          keyboardType='numeric'
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
                          value={totalReported}
                          onChangeValue={text => settoTalReported(text)}
                          prefix="$"
                          delimiter="."
                          separator="."
                          precision={0}
                          onChangeText={(formattedValue) => {
                            // console.log(formattedValue);
                            // $2,310.46
                          }}
                        />
                      </View>
                    </View>
                    <View style={{
                      height: '20%',
                      width: '100%',
                      justifyContent: 'space-between'
                    }}>
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
                          setModalVisible(false);
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
            >
              <View style={styles.centeredView}>
                <View style={styles.modalViewSign}>
                  <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '3%' }}>
                    <View style={{ margin: '0%', justifyContent: 'center', height: ' 75%' }}>
                      <View style={{ margin: '2%', justifyContent: 'center', height: ' 30%' }}>
                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Cierre de Caja:</Text>
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
                        <Text style={{ ...styles.modalText, fontSize: normalize(15), fontFamily: 'Montserrat-Bold', color: 'red' }}>¡ Firma guardada !</Text>
                      </View>
                      :
                      <View style={{ margin: '0%', justifyContent: 'center', height: ' 10%' }}>
                      </View>
                    }


                    {boxStatus === "active" ?

                      <View style={{ height: '15%', width: '100%', justifyContent: 'center', marginTop: '5%' }}>

                        <Button
                          onPress={uploadImageToFirebase}
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
            <Modal
              animationType="fade"
              transparent={true}
              backdropOpacity={0.3}
              visible={modal3Visible}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ height: '100%', width: '100%', justifyContent: 'space-between', padding: '5%' }}>
                    <View style={{ justifyContent: 'center', height: '30%' }}>
                      <Text style={{ ...styles.modalText, fontSize: normalize(20), color: '#00A9A0' }}> No se han realizado cierres de turno. </Text>
                    </View>

                    <View style={{ height: '30%', justifyContent: 'flex-end', flexDirection: 'column', marginTop: '3%' }}>
                      <View style={{ height: '55%', width: '100%', justifyContent: 'flex-end' }}>
                        <Button onPress={() => {
                          setModal3Visible(false);
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
                          }}
                        // activityIndicatorStatus={loading}
                        />
                      </View>
                    </View>

                  </View>
                </View>
              </View>
            </Modal>

          </View>
          <View style={{
            height: '13%',
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
