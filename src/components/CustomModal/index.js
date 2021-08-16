import React, { useState } from 'react';
import {
    Modal,
    TouchableWithoutFeedback,
    TouchableOpacity,
    View,
    Text,
    Image,
} from 'react-native';
import styles from './styles';
import Button from "../../components/Button";

const CustomModal = (props) => {
    const [show, setShow] = useState(false);

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
        onClose
    } = props;

    switch (type) {
        case 'fullMensuality':
            return (
                <>
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
                </>
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
        default:
            return null;
    }


}





export default CustomModal;