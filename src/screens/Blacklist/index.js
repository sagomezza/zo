import React, { useEffect, useState, useRef } from 'react';
import {
    Text,
    View,
    Modal,
    Image,
    ImageBackground,
    Keyboard,
    FlatList,
    ActivityIndicator,
    TextInput
} from 'react-native';
import styles from '../Blacklist/styles';
import normalize from '../../config/services/normalizeFontSize';
import numberWithPoints from '../../config/services/numberWithPoints';
import Header from '../../components/Header/HeaderIndex';
import FooterIndex from '../../components/Footer';
import Button from '../../components/Button';
import CurrencyInput from 'react-native-currency-input';
// api
import { PAY_DEBTS, FIND_USER_BY_PLATE, LIST_HQ_DEBTS } from "../../config/api";
import instance from "../../config/axios";
import { TIMEOUT } from '../../config/constants/constants';
// redux
import { connect } from "react-redux";
import * as actions from "../../redux/actions";
import * as Sentry from "@sentry/browser";
import moment from 'moment';
import { useCallback } from 'react/cjs/react.development';

const Blacklist = (props) => {
    const { navigation, officialProps } = props;
    const officialHq = officialProps.hq !== undefined ? officialProps.hq[0] : "";
    const [plateOne, setPlateOne] = useState('');
    const [plateTwo, setPlateTwo] = useState('');
    const refPlateOne = useRef(null);
    const refPlateTwo = useRef(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modal2Visible, setModal2Visible] = useState(false);
    const [modal3Visible, setModal3Visible] = useState(false);
    const [totalPay, setTotalPay] = useState(0);
    const [listHQDebts, setListHQDebts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingListHQDebts, setLoadingListHQDebts] = useState(true);
    const [blacklist, setBlacklist] = useState([]);
    const [blackListExists, setBlacklistExists] = useState(false);
    let blacklistValue = blacklist !== undefined && blacklist.length > 0 ? blacklist[0].value : 0;

    const clearPlateOne = () => setPlateOne('');
    const clearPlateTwo = () => setPlateTwo('');

    const debtPayedSuccess = () => {
        listHQDebtsCall();
        clearPlateOne();
        clearPlateTwo();
        setModalVisible(false);
    };

    const userNotFoundModal = () => {
        clearPlateOne();
        clearPlateTwo();
        setModal2Visible(false);
    };

    const debtNotFoundModal = () => {
        clearPlateOne();
        clearPlateTwo();
        setModal3Visible(false);
    };


    async function findUserByPlate() {
        try {
            if (plateOne.length === 3 && plateTwo.length >= 2) {
                const response = await instance.post(
                    FIND_USER_BY_PLATE,
                    {
                        plate: plateOne + plateTwo,
                        type: "full"
                    },
                    { timeout: TIMEOUT }
                )
                if (response.data.blackList) {
                    setBlacklist(response.data.blackList);
                    setBlacklistExists(true);
                } else {
                    setModal3Visible(true);
                }
            }
        } catch (err) {
            Sentry.captureException(err);
            setBlacklistExists(false);
            // console.log(err)
            // console.log(err?.response)
            if (err?.response.data.response === -1) setModal2Visible(true);
        }
    };

    useEffect(() => {
        listHQDebtsCall();
    }, []);

    const listHQDebtsCall = async () => {
        setLoadingListHQDebts(true);
        try {
            const response = await instance.post(
                LIST_HQ_DEBTS,
                {
                    hqId: officialHq
                },
                { timeout: TIMEOUT }
            )
            setListHQDebts(response.data.data)
            setLoadingListHQDebts(false);
        } catch (err) {
            Sentry.captureException(err);
            // console.log(err)
            // console.log(err?.response)
            setLoadingListHQDebts(false);
        }
    };

    async function payDebts() {
        setLoading(true);
        try {
            if (plateOne.length === 3 && plateTwo.length >= 2) {
                const response = await instance.post(
                    PAY_DEBTS,
                    {
                        hqId: officialHq,
                        plate: plateOne + plateTwo,
                        value: Number(blacklistValue),
                        cash: Number(totalPay),
                        change: Number(inputChange),
                        generateRecip: true
                    },
                    { timeout: TIMEOUT }
                )
                setTotalPay(0);
                setBlacklistExists(false);
                setLoading(false);
                setModalVisible(true);
            }
        } catch (err) {
            Sentry.captureException(err);
            // console.log(err)
            // console.log(err?.response)
            setLoading(false);
            if (err?.response.data.response === -2) setModal3Visible(true);
        }
    }


    let inputChange = (totalPay - blacklistValue) <= 0 ? 0 : '' + (totalPay - blacklistValue)

    const formatDateDays = (date) => {
        return moment(date).format('L')
    };

    const formatDateHours = (date) => {
        return moment(date).format('LT')
    };

    const handleChangePlateOne = (text) => {
        setPlateOne(text);
        if (refPlateTwo && text.length === 3) {
            refPlateTwo.current.focus();
        };
    };

    const handleFocusPlateOne = () => { clearPlateOne(); clearPlateTwo(); }

    const handleChangePlateTwo = text => {
        setPlateTwo(text);
        if (text.length === 3) {
            if (plateOne.length === 3) Keyboard.dismiss()
        };
    };

    const handleModal = () => setModalVisible(true);
    const handleChangeTotalPay = text => setTotalPay(text);

    const handleBackModal = () => {
        setBlacklistExists(false);
        setModalVisible(false);
        clearPlateOne();
        clearPlateTwo();
        setTotalPay(0);
    };

    const listHQDebtsKeyExtractor = useCallback(({ id }) => id, [listHQDebts]);

    const renderListHQDebtsKeyExtractorItem = useCallback(({ item }) =>
        <View style={{ ...styles.list, paddingTop: '3%', paddingBottom: '4%' }} >
            <Text style={styles.textPlaca}>
                {item.plate !== undefined ? item.plate : ''}
            </Text>
            <Text style={styles.dateDaysText}>
                {item.date ? formatDateDays(item.date) : ''}
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '20%', height: '100%' }}>
                <Text style={styles.dateDaysText}>
                    {item.date ? formatDateHours(item.date) : ''}
                </Text>

            </View>
            <Text style={{ ...styles.textPlaca, textAlign: 'right', marginRight: '3%' }}>
                {item.value ? `$${numberWithPoints(item.value)}` : ''}
            </Text>
        </View>
        , [listHQDebts]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground
                style={{
                    flex: 1,
                    width: '100%',
                    height: '35%',
                    flexDirection: 'column'
                }}
                source={require('../../../assets/images/logoutStripes.png')}>
                <Header navigation={navigation} />
                <View style={{ height: '15%', alignContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center', height: '35%', width: '60%', marginTop: '2%' }}>
                        <TextInput
                            ref={refPlateOne}
                            placeholder={'EVZ'}
                            placeholderTextColor={'#D9D9D9'}
                            style={styles.plateInput}
                            textAlign='center'
                            maxLength={3}
                            autoCapitalize={"characters"}
                            onChangeText={handleChangePlateOne}
                            value={plateOne}
                            onFocus={handleFocusPlateOne}
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
                            onFocus={clearPlateTwo}
                            onChangeText={handleChangePlateTwo}
                            value={plateTwo}
                            onEndEditing={findUserByPlate}
                        />
                    </View>
                    <View style={{ height: '42%', width: '57%', justifyContent: 'center', marginTop: '2%' }}>
                        <Button onPress={handleModal}
                            title="PAGAR"
                            color='#FFF200'
                            style={[plateOne === "" || plateTwo === "" ? styles.buttonIDisabled : styles.buttonI]}
                            textStyle={styles.buttonTextSearch}
                            disabled={plateOne === "" || plateTwo === ""}
                            activityIndicatorStatus={loading}
                        />
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={{ height: '90%', width: '90%', borderRadius: 10 }}>
                        <View style={{ marginBottom: '5%', marginTop: '5%', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={styles.textListTitle} >LISTA NEGRA</Text>
                        </View>
                        {loadingListHQDebts ?
                            <View style={{ height: "90%" }}>
                                <View style={{ justifyContent: 'center', height: '100%' }}>
                                    <ActivityIndicator size={"large"} color={'#00A9A0'} />
                                </View>
                            </View>
                            :
                            <View style={{ height: "95%" }}>
                                <View style={{ width: '100%', height: '5%', flexDirection: 'row', alignSelf: 'center', marginTop: '3%' }}>
                                    <Text style={{ ...styles.titleText, marginLeft: '5%' }}>Placa</Text>
                                    <Text style={{ ...styles.titleText, marginLeft: '16%' }}>Fecha</Text>
                                    <Text style={{ ...styles.titleText, marginLeft: '18%' }}>Hora</Text>
                                    <Text style={{ ...styles.titleText, marginLeft: '19%' }}>Deuda</Text>
                                </View>
                                {listHQDebts.length > 0 ?
                                    <FlatList
                                        style={{ height: "37%" }}
                                        data={listHQDebts}
                                        keyExtractor={listHQDebtsKeyExtractor}
                                        renderItem={renderListHQDebtsKeyExtractorItem}
                                        maxToRenderPerBatch={6}
                                    />
                                    :
                                    <View style={{ marginLeft: '13%', padding: '10%' }}>
                                        <Text style={styles.textPago}> No se encuentran registros en el historial </Text>
                                    </View>
                                }
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
                        {blackListExists ?
                            <View style={{
                                height: '100%',
                                width: '100%',
                                justifyContent: 'space-between',
                                padding: '2%'
                            }}>
                                <View style={{ justifyContent: 'center', height: ' 20%' }}>
                                    <Text style={styles.modalTitleText}>
                                        COBRAR DEUDA
                                    </Text>
                                    <Text style={styles.modalTitleTextGray}>
                                        {`$${numberWithPoints(blacklistValue)}`}
                                    </Text>
                                </View>
                                <View style={{
                                    justifyContent: 'space-between',
                                    height: '45%',
                                    flexDirection: 'column',
                                    paddingBottom: '7%',
                                }}>
                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}>Pago:  </Text>
                                        <CurrencyInput
                                            placeholder='$'
                                            textAlign='center'
                                            keyboardType='numeric'
                                            style={styles.currencyInput}
                                            value={totalPay}
                                            onChangeValue={handleChangeTotalPay}
                                            prefix="$"
                                            delimiter="."
                                            separator="."
                                            precision={0}
                                        />
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: 'flex-end' }}>
                                        <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold' }}> A devolver:  </Text>
                                        <TextInput
                                            style={styles.currencyInput}
                                            keyboardType='numeric'
                                            placeholder='$'
                                            textAlign='center'
                                            editable={false}
                                            value={`$${numberWithPoints(inputChange)}`}
                                        />
                                    </View>

                                </View>
                                <View style={{ height: '15%', width: '100%', justifyContent: 'center', marginBottom: '3%' }}>
                                    <Button onPress={payDebts}
                                        title="PAGAR"
                                        color="#00A9A0"
                                        style={totalPay - blacklistValue < 0 ? styles.modalButtonDisabled : styles.modalButton}
                                        textStyle={{
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            fontFamily: 'Montserrat-Bold',
                                            letterSpacing: 5
                                        }}
                                        activityIndicatorStatus={loading}
                                        disabled={totalPay - blacklistValue < 0}
                                    />
                                    <Button onPress={handleBackModal}
                                        title="DEVOLVER"
                                        color="transparent"
                                        style={styles.modalButtonBack}
                                        textStyle={{
                                            color: "#00A9A0",
                                            textAlign: "center",
                                            fontFamily: 'Montserrat-Bold',
                                            letterSpacing: 5
                                        }} />
                                </View>

                            </View>
                            :
                            <View style={{
                                height: '100%',
                                width: '100%',
                                justifyContent: 'space-between',
                                padding: '2%'

                            }}>
                                <View>
                                </View>
                                <View style={{ margin: '4%', justifyContent: 'center', height: ' 40%' }}>
                                    <Text style={{ ...styles.textListTitle, textAlign: 'center' }}>LA DEUDA YA FUE RETIRADA</Text>
                                </View>
                                <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                    <Button onPress={debtPayedSuccess}
                                        title="ENTENDIDO"
                                        color="#00A9A0"
                                        style={styles.modalButton}
                                        textStyle={{
                                            color: "#FFFFFF",
                                            textAlign: "center",
                                            fontFamily: 'Montserrat-Bold',
                                            letterSpacing: 5
                                        }} />
                                </View>
                            </View>
                        }
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
                                <Text style={styles.modalTextAlert}> Esta placa no se encuentra asociada a un usuario. </Text>
                            </View>
                            <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                <Button onPress={userNotFoundModal}
                                    title="ENTENDIDO"
                                    color="#00A9A0"
                                    style={
                                        styles.modalButton
                                    }
                                    textStyle={{
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        fontFamily: 'Montserrat-Bold',
                                        letterSpacing: 5
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
                visible={modal3Visible}
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
                                <Text style={styles.modalTextAlert}> No se encuentra deuda asociada a este usuario. </Text>
                            </View>
                            <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                <Button onPress={debtNotFoundModal}
                                    title="ENTENDIDO"
                                    color="#00A9A0"
                                    style={styles.modalButton}
                                    textStyle={{
                                        color: "#FFFFFF",
                                        textAlign: "center",
                                        fontFamily: 'Montserrat-Bold',
                                        letterSpacing: 5
                                    }} />
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
};



const mapStateToProps = (state) => ({
    officialProps: state.official,
});

export default connect(mapStateToProps, actions)(Blacklist);
