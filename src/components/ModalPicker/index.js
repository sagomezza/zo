// import React from "react";
// import { View, TextInput, StyleSheet } from "react-native";
// import ModalSelector from "react-native-modal-selector";
// import { MaterialIcons } from "@expo/vector-icons";

// const ModalPicker = ({
//   data,
//   onChange,
//   initValue,
//   iconSize,
//   style,
//   selectedValue,
// }) => {
//   return (
//     <ModalSelector
//       data={data}
//       initValue={initValue}
//       // supportedOrientations={["landscape"]}
//       accessible={true}
//       scrollViewAccessibilityLabel={"Scrollable options"}
//       cancelButtonAccessibilityLabel={"Cancel Button"}
//       onChange={onChange}
//       style={[styles.container, style]}
//     >
//       <View style={styles.innerView}>
//         <TextInput
//           style={styles.text}
//           editable={false}
//           placeholder="Filtrar"
//           value={selectedValue}
//         />
//         <MaterialIcons name={"keyboard-arrow-down"} size={iconSize} />
//       </View>
//     </ModalSelector>
//   );
// };

// ModalPicker.defaultProps = {
//   iconSize: 28,
// };

// const styles = StyleSheet.create({
//   container: {
//     height: 45,
//     borderColor: "darkgray",
//     backgroundColor: "#F0EEEE",
//     borderRadius: 12,
//     // width: "45%",
//     justifyContent: "center",
//     alignContent: "center",
//     // alignItems: "flex-start",
//     paddingHorizontal: "3%",
//   },
//   innerView: {
//     flexDirection: "row",
//     // borderColor: "blue",
//     // borderWidth: 1,
//     // width: "100%",
//     justifyContent: "space-between",
//   },
//   text: {
//     borderWidth: 0,
//     // borderColor: "#ccc",
//     // padding: 10,
//     // height: 30
//     // textAlign: "left",
//   },
// });

// export default ModalPicker;