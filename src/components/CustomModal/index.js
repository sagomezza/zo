import React, { useState } from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import styles from './styles';
import Button from "../../components/Button";
import normalize from '../../config/services/normalizeFontSize';
import CurrencyInput from 'react-native-currency-input';

const CustomModal = (props) => {
    const {
        title,
        titleStyle,
        onTouchOutside,
        style,
        animationType,
        custom,
        children,
        color,
        icon,
        visible,
        type,
        onClose,
        prepayValue,
        prepayDay,
        plateOne,
        plateTwo,
        phone,
        totalPay,
        prepayDayValue,
        change,
        onChangeTotalPay,
        onStartPark,
        activityStatus
    } = props;

    switch (type) {
        case 'fullMensuality':
            return (
                <Modal
                    animationType={animationType !== undefined ? animationType : 'slide'}
                    transparent={true}
                    backdropOpacity={0.3}
                    visible={visible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                        </View>
                    </View>
                </Modal>
            )
        case 'workerInstructions':
            return (
                <Modal
                    animationType='slide'
                    transparent={true}
                    backdropOpacity={0.3}
                    visible={visible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalInfoContainer}>
                                <View style={styles.iconTitleContainer}>
                                    <Image
                                        style={{ width: '22%', height: "100%", alignSelf: 'flex-end' }}
                                        resizeMode={"contain"}
                                        source={require("../../../assets/images/alert.png")}
                                    />
                                    <View style={{
                                        height: '100%',
                                        width: '62%',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}>
                                        <Text style={styles.modalTextTitle}> HOLA, </Text>
                                        <Text style={styles.modalTextTitle}> PARA INICIAR: </Text>
                                    </View>
                                </View>
                                <View style={{ justifyContent: 'space-around', height: '50%', marginBottom: 15 }}>
                                    <View style={styles.stepContainer}>
                                        <Text style={styles.modalNum}> 1 </Text>
                                        <View style={{ height: '100%', width: '90%', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={styles.modalText}>Recuerda revisar la conexión a internet de tu dispositivo </Text>
                                        </View>
                                    </View>
                                    <View style={styles.stepContainer}>
                                        <Text style={styles.modalNum}> 2 </Text>
                                        <View style={{ height: '100%', width: '90%', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={styles.modalText}>Inicia sesión con tu usuario y contraseña</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stepContainer}>
                                        <Text style={styles.modalNum}> 3 </Text>
                                        <View style={{ height: '100%', width: '90%', flexDirection: 'column', justifyContent: 'center' }}>
                                            <Text style={styles.modalText}>Luego del cierre del día, recuerda cerrar tu sesión</Text>
                                        </View>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        height: "12%",
                                        width: "100%",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        onPress={onClose}
                                        title="ENTENDIDO"
                                        color="#00A9A0"
                                        style={styles.modalButton}
                                        textStyle={styles.modalButtonText}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        case 'prepayAndStart':
            return (
                <Modal
                    animationType={animationType !== undefined ? animationType : 'slide'}
                    transparent={true}
                    backdropOpacity={0.3}
                    visible={visible}
                >
                    {prepayDay ?
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewPrepay}>
                                <View style={{
                                    height: '100%',
                                    width: '100%',
                                    justifyContent: 'space-between',
                                }}>
                                    <View style={{ height: '25%', width: '100%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ alignSelf: 'center', width: '60%', height: '85%' }}
                                            resizeMode={'contain'}
                                            source={require('../../../assets/images/prepayFullday.png')} />
                                    </View>
                                    <View style={{ height: '20%', width: '100%', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: normalize(30),
                                            textAlign: 'center',
                                            color: '#00A9A0',
                                            fontFamily: 'Montserrat-Bold'
                                        }}>
                                            COBRAR PASE DÍA
                                        </Text>
                                        <Text style={{
                                            fontSize: normalize(30),
                                            textAlign: 'center',
                                            color: '#68696C',
                                            fontFamily: 'Montserrat-Bold'
                                        }}>
                                            {prepayValue}
                                        </Text>
                                    </View>
                                    <View style={{
                                        justifyContent: 'space-around',
                                        height: '40%',
                                        flexDirection: 'column',
                                        paddingBottom: '6%',
                                    }}>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                            <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold', marginTop: '3%' }}>Pago  </Text>
                                            <CurrencyInput
                                                placeholder='$'
                                                textAlign='center'
                                                keyboardType='numeric'
                                                style={styles.currencyInput}
                                                value={totalPay}
                                                onChangeValue={onChangeTotalPay}
                                                prefix="$"
                                                delimiter="."
                                                separator="."
                                                precision={0}
                                            />
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
                                            <Text style={{ ...styles.modalText, fontSize: normalize(20), fontFamily: 'Montserrat-Bold', marginTop: '3%' }}>A devolver  </Text>
                                            <TextInput
                                                style={styles.currencyInput}
                                                keyboardType='numeric'
                                                placeholder='$'
                                                textAlign='center'
                                                editable={false}
                                                value={change}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ height: '15%', width: '100%', justifyContent: 'flex-end' }}>
                                        <Button onPress={onStartPark}
                                            title="GUARDAR"
                                            color="#00A9A0"
                                            textStyle={{
                                                color: "#FFFFFF",
                                                textAlign: "center",
                                                fontFamily: 'Montserrat-Bold',
                                                letterSpacing: 5
                                            }}
                                            style={[totalPay - prepayDayValue < 0 ? styles.modalButtonDisabled : styles.modalButtonPrepay]}
                                            disabled={totalPay - prepayDayValue < 0}
                                            activityIndicatorStatus={activityStatus} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.centeredView}>
                            <View style={styles.modalViewStartPark}>
                                <View style={{
                                    flexDirection: 'column',
                                    height: '100%',
                                    width: '100%',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    padding: '4%',
                                }}>
                                    <View style={{ height: '35%', width: '75%', justifyContent: 'center' }}>
                                        <Image
                                            style={{ alignSelf: 'center', width: '60%', height: '85%' }}
                                            resizeMode={'contain'}
                                            source={require('../../../assets/images/startParking.png')} />
                                    </View>
                                    <View style={{ height: '22%', width: '75%', justifyContent: 'center' }}>
                                        <Text style={{
                                            fontSize: normalize(30),
                                            textAlign: 'center',
                                            color: '#00A9A0',
                                            fontFamily: 'Montserrat-Bold'
                                        }}>
                                            HA INICIADO EL PARQUEO
                                        </Text>
                                    </View>
                                    <View style={{ height: '15%', width: '55%', backgroundColor: '#00A9A0', borderRadius: 25, justifyContent: 'center', marginTop: '3%' }}>
                                        <Text style={styles.modalPhoneText}>{plateOne + ' ' + plateTwo}</Text>
                                    </View>

                                    <View style={{ height: '15%', width: '76%', justifyContent: 'center' }}>
                                        <Text style={styles.prepayModalText}>{phone} </Text>
                                    </View>
                                    <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end' }}>
                                        <Button onPress={onClose}
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
                    }
                </Modal>
            )
        default:
            return null;
    }


}





export default CustomModal;