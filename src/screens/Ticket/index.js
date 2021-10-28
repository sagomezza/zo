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
                </View>
                <View style={styles.container}>


                </View>



            </ImageBackground>
        </View>

    )
};

const mapStateToProps = (state) => ({
    officialProps: state.official,
    hq: state.hq,
    uid: state.uid,
});

export default connect(mapStateToProps, actions)(Ticket);
