import React, { useState } from 'react';
import { View, Modal, Text, Image } from 'react-native';
import Button from '../Button';
import styles from './styles';
import { MaterialIcons } from "@expo/vector-icons";

const NoConnectionModal = (props) => {
    return (
        <Modal
        animationType="fade"
        transparent={true}
        backdropOpacity={0.3}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{
              height: '100%',
              width: '100%',
              justifyContent: 'space-between',
              padding: '2%'

            }}>
              <View style={{
                margin: '4%',
                justifyContent: 'space-between',
                height: ' 70%',
                alignItems: 'center'
              }}>
                  <MaterialIcons
                                name="wifi-off"
                                color="#00A9A0"
                                size={75}
                            />
                <Text style={styles.modalTextAlert}> Upss no hay conexión... </Text>
                <Text style={styles.modalTextAlert}> Verifica tu conexión a internet </Text>
              </View>
              <View style={{ height: '18%', width: '100%', justifyContent: 'flex-end'}}>
                <Button onPress={props.onCheck}
                  title="R E C A R G A R"
                  color="#00A9A0"
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
    );
};

export default NoConnectionModal;