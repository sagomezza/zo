import React, { useState, useRef } from 'react';
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
import styles from "../Ticket/styles";
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
} from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from "../../config/constants/constants";
import { firestore } from "../../config/firebase";
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import { createIdempotency } from "../../utils/idempotency";
import * as Sentry from "@sentry/browser";
import getRecipsOfShift from '../../config/services/getRecipsOfShift';

const { width } = Dimensions.get("window");

const Ticket = (props) => {
    const { navigation, officialProps, hq, uid } = props;
    const [plateOne, setPlateOne] = useState("");
    const [plateTwo, setPlateTwo] = useState("");
    const refPlateOne = useRef(null);
    const refPlateTwo = useRef(null);
    const [loading, setLoading] = useState(false);
    const [ticketExists, setTicketExists] = useState(false);


    const findTicket = () => {
        setLoading(true)
    };

    const handlePlateOne = (text) => {
        setPlateOne(text);
        if (refPlateTwo && text.length === 3) {
            refPlateTwo.current.focus();
        }
    };

    const handlePlateTwo = (text) => {
        setPlateTwo(text);
        if (text.length === 3) {
            if (plateOne.length === 3) Keyboard.dismiss();
        }
    };

    const handleFocusPlateOne = () => {
        setPlateOne("");
        setPlateTwo("");
    };

    const handleFocusPlateTwo = () => setPlateTwo("");

    const clearPageInfo = () => {
        setPlateOne("");
        setPlateTwo("");
        setTicketExists(false);
    };

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
                            onChangeText={handlePlateOne}
                            value={plateOne}
                            onFocus={handleFocusPlateOne}
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
                            onFocus={handleFocusPlateTwo}
                            onChangeText={handlePlateTwo}
                            value={plateTwo}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={findTicket}
                            title="BUSCAR"
                            color="#FFF200"
                            style={[plateOne === "" || plateTwo === "" ? styles.searchButtonDisabled : styles.searchButton]}
                            textStyle={styles.buttonTextSearch}
                            disabled={plateOne === "" || plateTwo === ""}
                            activityIndicatorStatus={loading}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={clearPageInfo}
                            title="LIMPIAR"
                            color="transparent"
                            style={styles.cleanButton}
                            textStyle={styles.buttonTextClear}
                        />
                    </View>
                </View>

                <View style={styles.container}>
                    {ticketExists ? (
                        <View style={styles.infoButtonsContainer}>
                            <View style={styles.ticketInfoContainer}>
                                <View style={styles.ticketName}>
                                    {/* <Text style={styles.infoTextNameTitle}>{mensualityUserName}</Text> */}
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.infoTextTitle}>Número de celular</Text>
                                    {/* <Text style={styles.infoText}>{mensualityUserPhone}</Text> */}
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.infoTextTitle}>Valor</Text>
                                    {/* <Text style={styles.infoText}>{`$${numberWithPoints(monthPrice)}`}</Text> */}
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.infoTextTitle}>Estado</Text>
                                    {/* <Text style={styles.infoText}>
                                        {ticketInfo.status === "active" ? "Activa" : ""}
                                        {ticketInfo.status === "due" ? "Vencida" : ""}
                                        {ticketInfo.status === "pending" ? "Pendiente" : ""}
                                    </Text> */}
                                </View>
                                <View style={styles.ticketInfo}>
                                    <Text style={styles.infoTextTitle}>Vigencia hasta</Text>
                                    {/* <Text style={styles.infoText}>{validityDateMenHours}</Text> */}
                                </View>
                                <View style={styles.ticketInfoPlates}>
                                    <Text style={styles.infoTextTitle}>Placas asociadas</Text>
                                    <View style={styles.plateListContainer}>
                                        <FlatList
                                            style={{ height: "30%" }}
                                            // data={newMensualityPlates}
                                            // keExtractor={newMenPlateKeyExtractor}
                                            // renderItem={renderNewMenPlatesItem}
                                            maxToRenderPerBatch={3}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.ticketInfoButtonsContainer}>
                                <Button
                                    // onPress={handlePayRenew}
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
                                    // onPress={editMenButton}
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
                    ) :
                        (
                            <View style={{ height: "30%", justifyContent: "space-between", width: "80%" }}>
                                {ticketExists === false ? (
                                    <Text style={styles.notFoundText}>
                                        No se encuentra tiquetera asociada.
                                    </Text>
                                ) : (
                                    <Text style={styles.notFoundText}></Text>
                                )}
                                <Button
                                    // onPress={handleCreate}
                                    title="CREAR TIQUETERA"
                                    color="transparent"
                                    style={styles.buttonCreate}
                                    textStyle={styles.buttonTextRenew}
                                />
                            </View>
                        )}


                </View>



            </ImageBackground>
            <View style={styles.footer}>
                <FooterIndex navigation={navigation} />
            </View>
        </View>

    )
};

const mapStateToProps = (state) => ({
    officialProps: state.official,
    hq: state.hq,
    uid: state.uid,
});

export default connect(mapStateToProps, actions)(Ticket);
