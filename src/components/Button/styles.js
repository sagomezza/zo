import { StyleSheet } from "react-native";
import normalize from "../../config/services/normalizeFontSize";

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingHorizontal: 25,
  },
  text: {
    color: "white",
    fontSize: normalize(17),
    textAlign: "center",
  },
});

export default styles;
