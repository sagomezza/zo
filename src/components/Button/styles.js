import { StyleSheet } from "react-native";
import normalize from "../../config/services/normalizeFontSize";

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: normalize(17),
    textAlign: "center",
  },
});

export default styles;
