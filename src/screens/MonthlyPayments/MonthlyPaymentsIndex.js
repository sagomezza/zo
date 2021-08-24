import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Modal,
  ImageBackground,
  Keyboard,
  Dimensions,
  FlatList,
  TextInput
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import CurrencyInput from "react-native-currency-input";
import styles from "../MonthlyPayments/MonthlyPaymentsStyles";
import normalize from "../../config/services/normalizeFontSize";
import moment from "moment";
import numberWithPoints from "../../config/services/numberWithPoints";
import Header from "../../components/Header/HeaderIndex";
import FooterIndex from "../../components/Footer";
import Button from "../../components/Button";
// api
import {
  FIND_MENSUALITY_PLATE,
  RENEW_MENSUALITY,
  EDIT_MENSUALITY,
  CREATE_USER,
  CREATE_MENSUALITY,
  EDIT_USER,
  GET_RECIPS,
} from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from "../../config/constants/constants";
import { firestore } from "../../config/firebase";
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import store from "../../config/store";
import { createIdempotency } from "../../utils/idempotency";
import * as Sentry from "@sentry/browser";


const { width, height } = Dimensions.get("window");

const MonthlyPayments = (props) => {
  const { navigation, officialProps, hq, uid } = props;
  const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
  const [plateOne, setPlateOne] = useState("");
  const [plateTwo, setPlateTwo] = useState("");
  const refPlateOne = useRef(null);
  const refPlateTwo = useRef(null);
  const [loading, setLoading] = useState(false);
  const [mensualityExists, setMensualityExists] = useState();
  const [mensuality, setMensuality] = useState({});
  const [newMensualityPlates, setNewMensualityPlates] = useState([]);
  const mensualityInfo =
    mensuality.data !== undefined ? mensuality.data[0] : "";
  const mensualityValue =
    mensualityInfo.value !== undefined ? mensualityInfo.value : 0;
  const mensualityUserName =
    mensualityInfo.userName !== undefined ? mensualityInfo.userName : " ";
  const mensualityUserPhone =
    mensualityInfo.userPhone !== undefined ? mensualityInfo.userPhone : " ";
  // Modals
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);
  const [modal3Visible, setModal3Visible] = useState(false);
  const [modal4Visible, setModal4Visible] = useState(false);
  const [modal5Visible, setModal5Visible] = useState(false);
  const [mdlMenAlreadyExists, setMdlMenAlreadyExists] = useState(false);
  // To modify plates asociated to mensuality
  const [firstPlate, setFirstPlate] = useState("");
  const [secondPlate, setSecondPlate] = useState("");
  const [thirdPlate, setThirdPlate] = useState("");
  const [fourthPlate, setFourthPlate] = useState("");
  const [fifthPlate, setFifthPlate] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  // Info for new mensuality
  const [phoneNewMen, setPhoneNewMen] = useState("");
  const [emailNewMen, setEmailNewMen] = useState("");
  const [nameNewMen, setNameNewMen] = useState("");
  const [lastNameNewMen, setLastNameNewMen] = useState("");
  const [userId, setUserId] = useState("");
  const [newMenNid, setNewMenNid] = useState("");
  const [pendingMensualityPay, setPendingMensualityPay] = useState(false);
  const [generateMenRecip, setGenerateMenRecip] = useState(true);
  const [showInputsCashChange, setShowInputsCashChange] = useState(false);
  const [monthPrice, setMonthPrice] = useState(0);
  const [totalPay, setTotalPay] = useState("");
  const [image, setImage] = useState("");
  const [alreadyRenewed, setAlreadyRenewed] = useState(false);
  const [firstPlateNewMen, setFirstPlateNewMen] = useState("");
  const [secondPlateNewMen, setSecondPlateNewMen] = useState("");
  const [thirdPlateNewMen, setThirdPlateNewMen] = useState("");
  const [fourthPlateNewMen, setFourthPlateNewMen] = useState("");
  const [fifthPlateNewMen, setFifthPlateNewMen] = useState("");
  // Editing mensuality
  const firstPlateData = mensualityInfo.plates !== undefined ? mensualityInfo.plates[0] + "" : "";
  const secondPlateData = mensualityInfo.plates !== undefined ? mensualityInfo.plates[1] + "" : "";
  const thirdPlateData = mensualityInfo.plates !== undefined ? mensualityInfo.plates[2] + "" : "";
  const fourthPlateData = mensualityInfo.plates !== undefined ? mensualityInfo.plates[3] + "" : "";
  const fifthPlateData = mensualityInfo.plates !== undefined ? mensualityInfo.plates[4] + "" : "";
  const userNameData = mensualityInfo.userName !== undefined ? mensualityInfo.userName + "" : "";
  const userEmailData = mensualityInfo.email !== undefined ? mensualityInfo.email + "" : "";
  const userPhoneData =
    mensualityInfo.userPhone !== undefined
      ? mensualityInfo.userPhone.substring(3, 14) + ""
      : "";
  const userIdToEdit = mensualityInfo.userId !== undefined ? mensualityInfo.userId : "";
  let plates = [firstPlate, secondPlate, thirdPlate, fourthPlate, fifthPlate];
  let newPlates = plates.filter((plate) => plate != undefined && plate != "" && plate != "undefined");
  let platesNewMen = [ firstPlateNewMen, secondPlateNewMen, thirdPlateNewMen, fourthPlateNewMen, fifthPlateNewMen,];
  let platesNewMensuality = platesNewMen.filter((plate) => plate != undefined && plate != "");
  let validityDateMen = moment(mensualityInfo.validity).tz("America/Bogota");
  let validityDateMenHours =
    "" + validityDateMen.format("L") + " - " + validityDateMen.format("LT");
  var userEditInfo = [
    { name: userName },
    { id: userIdToEdit },
    { phone: "+57" + userPhone },
    { email: userEmail },
    { plate: firstPlate },
  ];
  var newUserEditInfo = userEditInfo.filter(
    (el) => el.name || el.id || el.phone || el.email || el.plate != undefined
  );
  var newObjUserEdit = newUserEditInfo.reduce(
    (a, b) => Object.assign(a, b),
    {}
  );

  const priceMonthVehicleType = () => {
    if (isCharacterALetter(firstPlateNewMen[5])) {
      setMonthPrice(hq.monthlyBikePrice);
      setShowInputsCashChange(true);
    } else {
      setMonthPrice(hq.monthlyCarPrice);
      setShowInputsCashChange(true);
    }
  };

  const mensualityPriceMonthVehType = () => {
    if (isCharacterALetter(plateTwo[2])) {
      setMonthPrice(hq.monthlyBikePrice);
    } else {
      setMonthPrice(hq.monthlyCarPrice);
    }
  };

  const mensualityCreatedModal = () => {
    setModal3Visible(false);
    setModal4Visible(false);
    setNameNewMen("");
    setLastNameNewMen("");
    setPhoneNewMen("");
    setEmailNewMen("");
    setNewMenNid("");
    setFirstPlateNewMen("");
    setTotalPay(0);
    setMonthPrice(0);
    setShowInputsCashChange(false);
    setModal5Visible(false);
    setPendingMensualityPay(false);
    setGenerateMenRecip(true);
    setMdlMenAlreadyExists(false);
  };
  const mensualityRenewedModal = () => {
    setModal2Visible(false);
    setLoading(true);
    findMensualityPlate();
    setTotalPay(0);
    setMonthPrice(0);
    setMonthPrice(0);
  };
  const mensualityEditedModal = () => {
    setLoading(false);
    setModalVisible(false);
    findMensualityPlate();
  };

  const clearPageInfo = () => {
    setPlateOne("");
    setPlateTwo("");
    setMensualityExists(false);
  };

  const isCharacterALetter = (char) => {
    return /[a-zA-Z]/.test(char);
  };

  const user = () => {
    setLoading(true);
    setPendingMensualityPay(false);
    setGenerateMenRecip(true);
    try {
      setLoading(true);
      firestore
        .collection("users")
        .where("phone", "==", "+57" + phoneNewMen)
        .get()
        .then((snapshot) => {
          if (snapshot.empty) {
            createUser();
          } else {
            snapshot.forEach((doc) => {
              setUserId(doc.id);
              editUser(doc.id);
              createMensuality(doc.id);
            });
          }
        })
        .catch((error) => {
          setLoading(false);
          // console.log(error);
        });
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      setLoading(false);
    }
  };

  async function editUser(idUser) {
    setLoading(true);
    try {
      // console.log(newObjUserEdit)
      if (userIdToEdit !== "") {
        const response = await instance.post(EDIT_USER, newObjUserEdit, {
          timeout: TIMEOUT,
        });
        setLoading(false);
      }
      if (firstPlateNewMen.length >= 5 && phoneNewMen.length === 10 && userId) {
        const response = await instance.post(
          EDIT_USER,
          {
            id: idUser,
            name: nameNewMen,
            lastName: lastNameNewMen,
            phone: "+57" + phoneNewMen,
            email: emailNewMen,
            plate: firstPlateNewMen,
          },
          { timeout: TIMEOUT }
        );
        setLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response);
      setLoading(false);
    }
  }

  async function createUser() {
    setLoading(true);
    try {
      if (firstPlateNewMen.length >= 5 && phoneNewMen.length === 10) {
        let type;
        if (isCharacterALetter(firstPlateNewMen[5])) type = "bike";
        else type = "car";
        let idempotencyKey = createIdempotency(uid.uid);

        const response = await instance.post(
          CREATE_USER,
          {
            type: "full",
            vehicleType: type,
            email: emailNewMen,
            phone: "+57" + phoneNewMen,
            name: nameNewMen,
            lastName: lastNameNewMen,
            expoToken: "expoToken",
            monthlyUser: true,
            plate: firstPlateNewMen,
            hqId: officialHq,
            mensualityType: "personal",
            capacity: 1,
            cash: Number(totalPay),
            change: totalPay - monthPrice,
            officialEmail: officialProps.email,
            nid: newMenNid,
            pending: pendingMensualityPay,
            generateRecip: generateMenRecip,
          },
          {
            headers: {
              "x-idempotence-key": idempotencyKey,
            },
            timeout: TIMEOUT,
          }
        );
        setModal4Visible(true);
        setModal3Visible(false);
        setLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response);
      setLoading(false);
      setModal5Visible(true);
    }
  }

  async function createMensuality(idUser) {
    setLoading(true);
    try {
      if (firstPlateNewMen.length >= 5 && phoneNewMen.length === 10) {
        let idempotencyKey = createIdempotency(uid.uid);
        let type;
        if (isCharacterALetter(firstPlateNewMen[5])) type = "bike";
        else type = "car";
        const response = await instance.post(
          CREATE_MENSUALITY,
          {
            userId: idUser,
            capacity: 1,
            vehicleType: type,
            userPhone: "+57" + phoneNewMen,
            plates: platesNewMensuality,
            hqId: officialHq,
            type: "personal",
            monthlyUser: true,
            cash: Number(totalPay),
            change: Number(totalPay - monthPrice),
            officialEmail: officialProps.email,
            pending: pendingMensualityPay,
            generateRecip: generateMenRecip,
          },
          {
            headers: {
              "x-idempotence-key": idempotencyKey,
            },
            timeout: TIMEOUT,
          }
        );
        // console.log("RESPONSE CREATE MENSUALITY", response.data);
        setModal4Visible(true);
        setModal3Visible(false);
        setLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log("ERROR ", err?.response);
      setLoading(false);
      setModal5Visible(true);
    }
  }

  async function findMensualityPlate() {
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        const response = await instance.post(
          FIND_MENSUALITY_PLATE,
          {
            plate: plateOne + plateTwo,
            type: "full",
          },
          { timeout: TIMEOUT }
        );
        setMensualityExists(true);
        setMensuality(response.data);
        // setMensualityPlates(response.data.data[0].plates)
        if (response.data.data[0].plates !== undefined) {
          let menPlates = response.data.data[0].plates;
          let plates = [];
          menPlates.forEach(function (value) {
            plates.push({ plate: value });
          });
          setNewMensualityPlates(plates);
        }
        setLoading(false);
        mensualityPriceMonthVehType();
      }
      if (firstPlateNewMen.length >= 5) {
        const response = await instance.post(
          FIND_MENSUALITY_PLATE,
          {
            plate: firstPlateNewMen,
            type: "full",
          },
          { timeout: TIMEOUT }
        );
        setLoading(false);
        setMdlMenAlreadyExists(true);
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response);
      setLoading(false);
      if (firstPlateNewMen.length >= 5) {
        priceMonthVehicleType();
      }
      setMensualityExists(false);
    }
  }

  async function editMensuality() {
    setLoading(true);
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        const response = await instance.post(
          EDIT_MENSUALITY,
          {
            id: mensualityInfo.id,
            plates: newPlates,
            phone: "+57" + userPhone,
          },
          { timeout: TIMEOUT }
        );
        mensualityEditedModal();

      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response);
      setLoading(false);
    }
  }

  const editMenButton = () => {
    setModalVisible(true);
    setFirstPlate(firstPlateData + "");
    setSecondPlate(secondPlateData + "");
    setThirdPlate(thirdPlateData + "");
    setFourthPlate(fourthPlateData + "");
    setFifthPlate(fifthPlateData + "");
    setUserName(userNameData);
    setUserEmail(userEmailData);
    setUserPhone(userPhoneData);
  };

  async function renewMensuality() {
    setLoading(true);
    try {
      if (plateOne.length === 3 && plateTwo.length >= 2) {
        let idempotencyKey = createIdempotency(uid.uid);
        const response = await instance.post(
          RENEW_MENSUALITY,
          {
            plate: plateOne + plateTwo,
            cash: Number(totalPay),
            change: totalPay - monthPrice,
            hqId: officialHq,
            officialEmail: officialProps.email,
          },
          {
            headers: {
              "x-idempotence-key": idempotencyKey,
            },
            timeout: TIMEOUT,
          }
        );
        if (response.data.response === 2) {
          setAlreadyRenewed(true);
          setTotalPay(0);
          setMonthPrice(0);
          setMonthPrice(0);
        } else {
          mensualityRenewedModal();
        }
        getRecips();
        setLoading(false);
      }
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err);
      // console.log(err?.response.data);
      setLoading(false);
    }
  }

  const getRecips = async () => {
    try {
      const response = await instance.post(
        GET_RECIPS,
        {
          hqId: officialHq,
          officialEmail: officialProps.email,
        },
        { timeout: TIMEOUT }
      );
      store.dispatch(actions.setRecips(response.data.data));
    } catch (err) {
      Sentry.captureException(err);
      // console.log(err?.response);
      // console.log(err);
    }
  };

  let textinputMoney = totalPay === 0 ? "" : "" + totalPay;
  let inputChange = totalPay - monthPrice <= 0 ? "" : "" + (totalPay - monthPrice);

  return (
    <View style={{ flex: 1, backgroundColor: '#00A9A0' }}>
      <ImageBackground
        style={styles.imageStyle}
        source={require("../../../assets/images/logoutStripes.png")}
      >
        <Header navigation={navigation} />
        <View style={styles.topContainer}>
          <View style={styles.plateInputContainer}>
            <TextInput
              ref={refPlateOne}
              placeholder={"EVZ"}
              placeholderTextColor={"#D9D9D9"}
              style={styles.plateInput}
              textAlign="center"
              maxLength={3}
              autoCapitalize={"characters"}
              onChangeText={(text) => {
                setPlateOne(text);
                if (refPlateTwo && text.length === 3) {
                  refPlateTwo.current.focus();
                }
              }}
              value={plateOne}
              onFocus={() => {
                setPlateOne("");
                setPlateTwo("");
              }}
            />
            <TextInput
              ref={refPlateTwo}
              placeholder={"123"}
              placeholderTextColor={"#D9D9D9"}
              style={styles.plateInput}
              textAlign="center"
              maxLength={3}
              autoCapitalize={"characters"}
              keyboardType="default"
              onFocus={() => {
                setPlateTwo("");
              }}
              onChangeText={(text) => {
                setPlateTwo(text);
                if (text.length === 3) {
                  if (plateOne.length === 3) Keyboard.dismiss();
                }
              }}
              value={plateTwo}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                setLoading(true);
                findMensualityPlate();
              }}
              title="BUSCAR"
              color="#FFF200"
              style={[
                plateOne === "" || plateTwo === ""
                  ? styles.searchButtonDisabled
                  : styles.searchButton,
              ]}
              textStyle={styles.buttonTextSearch}
              disabled={plateOne === "" || plateTwo === ""}
              activityIndicatorStatus={loading}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                clearPageInfo();
              }}
              title="LIMPIAR"
              color="transparent"
              style={styles.cleanButton}
              textStyle={styles.buttonTextClear}
            // activityIndicatorStatus={loading}
            />
          </View>
        </View>
        <View style={styles.container}>
          {mensualityExists ? (
            <View style={styles.infoButtonsContainer}>
              <View style={styles.mensualityInfoContainer}>
                <View style={styles.mensualityName}>
                  <Text style={styles.infoTextNameTitle}>{mensualityUserName}</Text>
                </View>
                <View style={styles.mensualityInfo}>
                  <Text style={styles.infoTextTitle}>Número de celular</Text>
                  <Text style={styles.infoText}>{mensualityUserPhone}</Text>
                </View>
                <View style={styles.mensualityInfo}>
                  <Text style={styles.infoTextTitle}>Valor</Text>
                  <Text style={styles.infoText}>
                    {`$${numberWithPoints(monthPrice)}`}
                  </Text>
                </View>
                <View style={styles.mensualityInfo}>
                  <Text style={styles.infoTextTitle}>Estado</Text>
                  <Text style={styles.infoText}>
                    {mensualityInfo.status === "active" ? "Activa" : ""}
                    {mensualityInfo.status === "due" ? "Vencida" : ""}
                    {mensualityInfo.status === "pending" ? "Pendiente" : ""}
                  </Text>
                </View>
                <View style={styles.mensualityInfo}>
                  <Text style={styles.infoTextTitle}>Vigencia hasta</Text>
                  <Text style={styles.infoText}>{validityDateMenHours}</Text>
                </View>
                <View style={styles.mensualityInfoPlates}>
                  <Text style={styles.infoTextTitle}>Placas asociadas</Text>
                  <View style={styles.plateListContainer}>
                    <FlatList
                      style={{ height: "30%" }}
                      data={newMensualityPlates}
                      keExtractor={(item, index) => String(index)}
                      renderItem={({ item }) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              marginBottom: "2%",
                              marginLeft: "10%",
                              marginRight: "10%",
                            }}
                          >
                            <Text style={styles.infoText}>{item.plate}</Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={styles.mensualityInfoButtonsContainer}>
                <Button
                  onPress={() => setModal2Visible(true)}
                  title="PAGAR / RENOVAR"
                  color="transparent"
                  style={[
                    plateOne === "" || plateTwo === ""
                      ? styles.buttonReDisabled
                      : styles.buttonRe,
                  ]}
                  textStyle={styles.buttonTextRenew}
                  disabled={plateOne === "" || plateTwo === ""}
                />
                <Button
                  onPress={editMenButton}
                  title="EDITAR"
                  color="transparent"
                  style={[
                    plateOne === "" || plateTwo === ""
                      ? styles.buttonEdDisabled
                      : styles.buttonEd,
                  ]}
                  textStyle={styles.buttonTextRenew}
                  disabled={plateOne === "" || plateTwo === ""}
                />
              </View>
            </View>
          ) : (
            <View style={{
              height: "30%", justifyContent: "space-between",
              width: "80%",
            }}
            >
              {mensualityExists === false ? (
                <Text style={styles.notFoundText}>
                  No se encuentra mensualidad asociada.
                </Text>
              ) : (
                <Text style={styles.notFoundText}></Text>
              )}
              <Button
                onPress={() => setModal3Visible(true)}
                title="CREAR"
                color="transparent"
                style={styles.buttonCreate}
                textStyle={styles.buttonTextRenew}
              // disabled={!(plateOne.length === 3 && plateTwo.length === 3) || !mensualityExists}
              />
            </View>
          )}

        </View>
      </ImageBackground>
      <View style={styles.footer}>
        <FooterIndex navigation={navigation} />
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalViewNewMensuality}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
                padding: "3%",
              }}
            >
              <View
                style={{
                  marginBottom: "4%",
                  justifyContent: "center",
                  height: "7%",
                }}
              >
                <Text
                  style={{
                    ...styles.modalText,
                    fontSize: normalize(20),
                    color: "#00A9A0",
                  }}
                >
                  Placas asociadas a mensualidad
                </Text>
              </View>
              <View
                style={{
                  justifyContent: "space-between",
                  height: "70%",
                  width: "100%",
                  flexDirection: "column",
                  paddingBottom: "10%",
                }}
              >
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Nombre:
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    textAlign="center"
                    value={userName !== undefined + "" ? userName : ""}
                    onChangeText={(text) => setUserName(text)}
                    onFocus={() => {
                      setUserName("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Correo:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    autoCapitalize={"none"}
                    textAlign="center"
                    value={userEmail !== undefined + "" ? userEmail : ""}
                    onChangeText={(text) => setUserEmail(text)}
                    onFocus={() => {
                      setUserEmail("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Celular:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={10}
                    textAlign="center"
                    value={userPhone !== undefined + "" ? userPhone : ""}
                    onChangeText={(text) => setUserPhone(text)}
                    onFocus={() => {
                      setUserPhone("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Placa 1:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={6}
                    textAlign="center"
                    value={firstPlate !== undefined + "" ? firstPlate : ""}
                    onChangeText={(text) => setFirstPlate(text)}
                    onFocus={() => {
                      setFirstPlate("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Placa 2:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={6}
                    textAlign="center"
                    // keyboardType={"numeric"}
                    value={secondPlate !== undefined + "" ? secondPlate : ""}
                    onChangeText={(text) => setSecondPlate(text)}
                    onFocus={() => {
                      setSecondPlate("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Placa 3:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={6}
                    textAlign="center"
                    // keyboardType={"numeric"}
                    value={thirdPlate !== undefined + "" ? thirdPlate : ""}
                    onChangeText={(text) => setThirdPlate(text)}
                    onFocus={() => {
                      setThirdPlate("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Placa 4:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={6}
                    textAlign="center"
                    // keyboardType={"numeric"}
                    value={fourthPlate !== undefined + "" ? fourthPlate : ""}
                    onChangeText={(text) => setFourthPlate(text)}
                    onFocus={() => {
                      setFourthPlate("");
                    }}
                  />
                </View>
                <View style={styles.createMensualityRowContainer}>
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      fontFamily: "Montserrat-Bold",
                    }}
                  >
                    Placa 5:{" "}
                  </Text>
                  <TextInput
                    style={styles.createMensualityRowInput}
                    keyboardType="default"
                    placeholder=""
                    maxLength={6}
                    textAlign="center"
                    // keyboardType={"numeric"}
                    value={fifthPlate !== undefined + "" ? fifthPlate : ""}
                    onChangeText={(text) => setFifthPlate(text)}
                    onFocus={() => {
                      setFifthPlate("");
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  height: "20%",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  marginTop: "5%",
                }}
              >
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      editMensuality();
                      editUser(userIdToEdit);
                    }}
                    title="GUARDAR"
                    color="#00A9A0"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      letterSpacing: 5

                    }}
                    activityIndicatorStatus={loading}
                  />
                </View>
                <View
                  style={{
                    height: "50%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}
                    title="VOLVER"
                    color="transparent"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#00A9A0",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
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
        visible={modal2Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalPayMensuality}>
            {alreadyRenewed === false ? (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "2%",
                }}
              >
                <View style={{justifyContent: "center",height: "20%"}}>
                  <Text style={{...styles.modalText,fontSize: width * 0.05,color: "#00A9A0"}}>
                    RECLAME {`$${numberWithPoints(monthPrice)}`}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    height: "45%",
                    flexDirection: "column",
                    paddingBottom: "6%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.modalText,
                        fontSize: width * 0.033,
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      Pago:{" "}
                    </Text>
                    <CurrencyInput
                      placeholder="$ 0"
                      textAlign="center"
                      keyboardType="numeric"
                      style={styles.currencyInput}
                      value={totalPay}
                      onChangeValue={(text) => setTotalPay(text)}
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
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.modalText,
                        fontSize: width * 0.033,
                        fontFamily: "Montserrat-Bold",
                      }}
                    >
                      A devolver:
                    </Text>
                    <TextInput
                      style={styles.currencyInput}
                      keyboardType="numeric"
                      placeholder="$"
                      textAlign="center"
                      editable={false}
                      value={`$${numberWithPoints(inputChange)}`}
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: "27%",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      height: "54%",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onPress={() => {
                        renewMensuality();
                      }}
                      title="RENOVAR"
                      color="#00A9A0"
                      style={
                        totalPay - monthPrice < 0
                          ? styles.modalButtonDisabled
                          : styles.modalButton
                      }
                      textStyle={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        fontFamily: "Montserrat-Bold",
                        letterSpacing: 5
                      }}
                      disabled={totalPay - monthPrice < 0}
                      activityIndicatorStatus={loading}
                    />
                  </View>
                  <View style={{height: "54%", width: "100%",justifyContent: "flex-end"}}>
                    <Button
                      onPress={() => {
                        setModal2Visible(!modal2Visible);
                      }}
                      title="VOLVER"
                      color="transparent"
                      style={styles.modalButton}
                      textStyle={{
                        color: "#00A9A0",
                        textAlign: "center",
                        fontFamily: "Montserrat-Bold",
                        letterSpacing: 5
                      }}
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "3%",
                }}
              >
                <View
                  style={{
                    marginTop: "8%",
                    justifyContent: "center",
                    height: "20%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(30),
                      color: "#00A9A0",
                    }}
                  >
                    Esta mensualidad ya fue renovada.
                  </Text>
                </View>
                <View
                  style={{
                    height: "20%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      setModal2Visible(!modal2Visible);
                      setAlreadyRenewed(false);
                    }}
                    title="E N T E N D I D O"
                    color="gray"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                    }}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal3Visible}
      >
        {showInputsCashChange ? (
          <View style={styles.centeredView}>
            <View style={styles.modalPayMensuality}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "center",
                  padding: "2%",
                }}
              >
                <View style={{ justifyContent: "center", height: " 30%" }}>
                  <Text style={styles.infoTextNameTitle}>COBRAR MENSUALIDAD</Text>
                  <Text style={styles.modalText}>{`$${numberWithPoints(monthPrice)}`}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    alignContent: "center",
                    height: "10%",
                    width: "60%",
                    alignSelf: "center",
                    justifyContent: "center",
                  }}
                >
                  <CheckBox
                    value={pendingMensualityPay}
                    onValueChange={() => {
                      if (pendingMensualityPay === false) {
                        setPendingMensualityPay(!pendingMensualityPay);
                        setGenerateMenRecip(!generateMenRecip);
                        setTotalPay(0);
                      } else {
                        setPendingMensualityPay(!pendingMensualityPay);
                        setGenerateMenRecip(!generateMenRecip);
                      }
                    }}
                    style={{ alignSelf: "center" }}
                    tintColors={{ true: "#00A9A0", false: "gray" }}
                  />
                  <Text
                    style={{
                      color: "#00A9A0",
                      fontFamily: "Montserrat-Bold",
                      fontSize: width * 0.03,
                      textAlign: "center",
                    }}
                  >
                    PAGO PENDIENTE
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    height: "45%",
                    flexDirection: "column",
                    paddingBottom: "6%",
                    paddingTop: "4%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        ...styles.modalText,
                        fontSize: width * 0.03,
                        fontFamily: "Montserrat-Bold",
                        marginTop: '2%'
                      }}
                    >
                      Pago:
                    </Text>
                    <CurrencyInput
                      placeholder="$"
                      textAlign="center"
                      keyboardType="numeric"
                      style={styles.currencyInput}
                      value={totalPay}
                      onChangeValue={(text) => setTotalPay(text)}
                      prefix="$"
                      delimiter="."
                      separator="."
                      precision={0}
                      editable={pendingMensualityPay === false}
                    />
                  </View>
                  <View style={{ flexDirection: "row", justifyContent: "space-between"}} >
                    <Text
                      style={{
                        ...styles.modalText,
                        fontSize: width * 0.03,
                        fontFamily: "Montserrat-Bold",
                        marginTop: '2%'
                      }}
                    >
                      A devolver:
                    </Text>
                    <TextInput
                      style={styles.currencyInput}
                      keyboardType="numeric"
                      placeholder="$"
                      textAlign="center"
                      editable={false}
                      value={`$${numberWithPoints(inputChange)}`}
                    />
                  </View>
                </View>
                <View style={{height: "18%",width: "100%",justifyContent: "flex-end"}}>
                  <Button
                    onPress={() => user()}
                    title="GUARDAR"
                    color="#00A9A0"
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      letterSpacing: 5
                    }}
                    style={[
                      totalPay - monthPrice < 0 && !pendingMensualityPay
                        ? styles.modalButtonDisabled
                        : styles.modalButton,
                    ]}
                    disabled={totalPay - monthPrice < 0 && !pendingMensualityPay}
                    activityIndicatorStatus={loading}
                  />
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.centeredView}>
            <View style={styles.modalViewNewMensuality}>
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "3%",
                }}
              >
                <View
                  style={{
                    marginBottom: "0%",
                    justifyContent: "center",
                    height: "10%",
                  }}
                >
                  <Text
                    style={{
                      ...styles.modalText,
                      fontSize: normalize(20),
                      color: "#00A9A0",
                    }}
                  >
                    INGRESE LA SIGUIENTE INFORMACIÓN
                  </Text>
                </View>
                <View style={styles.createMensualityContainer}>
                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{
                        ...styles.modalText,
                        fontSize: normalize(20),
                      }}
                    >
                      Nombre:
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="default"
                      placeholder=""
                      textAlign="left"
                      value={nameNewMen}
                      onChangeText={(text) => setNameNewMen(text)}
                      onFocus={() => {
                        setNameNewMen("");
                      }}
                    />
                  </View>
                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{ ...styles.modalText, fontSize: normalize(20) }}
                    >
                      Apellido:{" "}
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="default"
                      placeholder=""
                      textAlign="left"
                      value={lastNameNewMen}
                      onChangeText={(text) => setLastNameNewMen(text)}
                      onFocus={() => {
                        setLastNameNewMen("");
                      }}
                    />
                  </View>
                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{ ...styles.modalText, fontSize: normalize(20) }}
                    >
                      Cédula:
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="numeric"
                      placeholder=""
                      textAlign="left"
                      autoCapitalize={"characters"}
                      value={newMenNid}
                      onChangeText={(text) => setNewMenNid(text)}
                    />
                  </View>
                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{ ...styles.modalText, fontSize: normalize(20) }}
                    >
                      Celular:
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="numeric"
                      placeholder=""
                      textAlign="left"
                      maxLength={10}
                      value={phoneNewMen}
                      onChangeText={(text) => setPhoneNewMen(text)}
                      onFocus={() => {
                        setPhoneNewMen("");
                      }}
                    />
                  </View>

                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{ ...styles.modalText, fontSize: normalize(20) }}
                    >
                      Correo:
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="default"
                      placeholder=""
                      autoCapitalize={"none"}
                      textAlign="left"
                      value={emailNewMen}
                      onChangeText={(text) => setEmailNewMen(text)}
                      onFocus={() => {
                        setEmailNewMen("");
                      }}
                    />
                  </View>
                  <View style={styles.createMensualityRowContainer}>
                    <Text
                      style={{ ...styles.modalText, fontSize: normalize(20) }}
                    >
                      Placa:
                    </Text>
                    <TextInput
                      style={styles.createMensualityRowInput}
                      keyboardType="default"
                      placeholder=""
                      maxLength={6}
                      textAlign="left"
                      keyboardType={"default"}
                      autoCapitalize={"characters"}
                      value={firstPlateNewMen}
                      onChangeText={(text) => setFirstPlateNewMen(text)}
                      onFocus={() => {
                        setFirstPlateNewMen("");
                      }}
                    />
                  </View>
                </View>
                <View
                  style={{
                    height: "20%",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    marginTop: "3%",
                  }}
                >
                  <View
                    style={{
                      height: "50%",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onPress={() => {
                        setLoading(true);
                        findMensualityPlate();
                      }}
                      title="GUARDAR"
                      color="#00A9A0"
                      style={styles.modalButton}
                      textStyle={{
                        color: "#FFFFFF",
                        textAlign: "center",
                        fontFamily: "Montserrat-Medium",
                        letterSpacing: 4
                      }}
                      activityIndicatorStatus={loading}
                    />
                  </View>
                  <View
                    style={{
                      height: "50%",
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button
                      onPress={() => {
                        setModal3Visible(false);
                      }}
                      title="VOLVER"
                      color="transparent"
                      style={styles.modalButton}
                      textStyle={{
                        color: "#00A9A0",
                        textAlign: "center",
                        fontFamily: "Montserrat-Medium",
                        letterSpacing: 4

                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        backdropOpacity={0.3}
        visible={modal4Visible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
                padding: "5%",
              }}
            >
              <View style={{ justifyContent: "center", height: "30%" }}>
                <Text
                  style={{
                    ...styles.modalText,
                    fontSize: normalize(20),
                    color: "#00A9A0",
                  }}
                >
                  La mensualidad fue creada con éxito.
                </Text>
              </View>
              <View
                style={{
                  height: "30%",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  marginTop: "3%",
                }}
              >
                <View
                  style={{
                    height: "55%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      mensualityCreatedModal();
                    }}
                    title="ENTENDIDO"
                    color="#00A9A0"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      letterSpacing: 5
                    }}
                    activityIndicatorStatus={loading}
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
        visible={mdlMenAlreadyExists}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
                padding: "5%",
              }}
            >
              <View style={{ justifyContent: "center", height: "30%" }}>
                <Text style={{ ...styles.modalText, fontSize: normalize(25) }}>La mensualidad ya existe</Text>
              </View>
              <View
                style={{
                  height: "30%",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  marginTop: "3%",
                }}
              >
                <View
                  style={{
                    height: "55%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      mensualityCreatedModal()
                    }}
                    title="ENTENDIDO"
                    color="#00A9A0"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      letterSpacing: 5
                    }}
                    activityIndicatorStatus={loading}
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
        visible={modal5Visible}

      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "space-between",
                padding: "5%",
              }}
            >
              <View style={{ justifyContent: "center", height: "30%" }}>
                <Text
                  style={styles.modalText}>
                  Algo malo pasó, inténtalo de nuevo más tarde.
                </Text>
              </View>
              <View
                style={{
                  height: "30%",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  marginTop: "3%",
                }}
              >
                <View
                  style={{
                    height: "55%",
                    width: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    onPress={() => {
                      mensualityCreatedModal();
                    }}
                    title="ENTENDIDO"
                    color="#00A9A0"
                    style={styles.modalButton}
                    textStyle={{
                      color: "#FFFFFF",
                      textAlign: "center",
                      fontFamily: "Montserrat-Bold",
                      letterSpacing: 5
                    }}
                    activityIndicatorStatus={loading}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = (state) => ({
  officialProps: state.official,
  reservations: state.reservations,
  recips: state.recips,
  hq: state.hq,
  expoToken: state.expoToken,
  uid: state.uid,
});

export default connect(mapStateToProps, actions)(MonthlyPayments);
