// import React, { useState } from 'react';
// import {
//     Modal,
//     TouchableWithoutFeedback,
//     TouchableOpacity,
//     View,
//     Text,
//     Image,
// } from 'react-native';
// import styles from './styles';

// const CustomModal = (props) => {

//     const {
//         title,
//         titleStyle,
//         onTouchOutside,
//         style,
//         animationType,
//         custom,
//         children,
//         color,
//         icon,
//     } = props;

//     const [show, setShow] = useState(false);


//     return (
//         <>
//             <Modal
//                 animationType={animationType !== undefined ? animationType : 'slide'}
//                 transparent={true}
//                 visible={show}
//                 onRequestClose={_close}>
//                 <View style={styles({}).container}>
//                     {renderOutsideTouchable(onTouchOutside)}
//                     <View style={[styles({ selectedColor }).modalContainer, style]}>
//                         {renderClose()}
//                         {renderTitle()}
//                     </View>
//                     <View style={styles({ selectedColor }).dialogTriangle} />
//                     {icon && renderIcon()}
//                     {renderOutsideTouchable(onTouchOutside)}
//                 </View>
//             </Modal>
//         </>
//     )

// }

// export default CustomModal;