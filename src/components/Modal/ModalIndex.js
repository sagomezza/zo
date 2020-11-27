// import React, {useState} from 'react';
// import { TouchableOpacity, View, Text, Modal, TouchableHighlight, Alert, Image} from 'react-native';
// import styles from '../../screens/UserInput/UserInputStyles';


// const ModalIndex = (modalVisible, setModalVisible) => {
//     return(
//     <View>
//     <Modal
//     animationType="fade"
//     transparent={true}
//     backdropOpacity={0.3}
//     visible={modalVisible}
//     onRequestClose={() => {
//     Alert.alert("Modal has been closed.");
//     }}
//     >
//         <View style={styles.centeredView}>
//             <View style={styles.modalView}>
//                 <View style={{marginBottom: '7%', alignItems: 'center'}}>
//                     <Text style={styles.modalText}>EZV 123</Text>
//                     <Text>+3004678602</Text>
//                     <Text>Ha iniciado tiempo de parqueo</Text>
//                     <Text>11/11/2020 4:20 PM</Text>
//                 </View>
//                 <TouchableHighlight
//                 style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
//                 onPress={() => {
//                     setModalVisible(!modalVisible);
//                 }}
//                 >
//                     <Text style={styles.textStyle}>Entendido</Text>
//                 </TouchableHighlight>
//             </View>
//         </View>
//     </Modal>
//     </View>
//     )
// };
// export default ModalIndex;