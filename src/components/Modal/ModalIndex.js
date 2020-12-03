import React, {useState} from 'react';
import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Alert, Image} from 'react-native';
import styles from '../../screens/UserInput/UserInputStyles';



const AlreadyParkedModal = ({modal2Visible}) => {
   
        return(
            <View>
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
                    <View style={styles.modalView}>
                        <View style={{ marginBottom: '7%', alignItems: 'center' }}>
                        <Text style={styleses.modalText}> El vehículo con placas + {plateOne + ' ' + plateTwo} + ya se encuentra estacionado. </Text>
                        </View>
                        <TouchableHighlight
                        style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        >
                        <Text style={styles.textStyle}>Entendido</Text>
                        </TouchableHighlight>
                    </View>
                    </View>
                </Modal>
            </View>
        )
};
export default AlreadyParkedModal;