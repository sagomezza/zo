import { Platform, PixelRatio } from "react-native";
import { height } from "../constants/screenDimensions";

//const scale = width / 375;

export default function normalize(size) {
  if (Platform.OS === "ios" && height > 700) {
    return Math.round(PixelRatio.roundToNearestPixel(size));
  }
  return Math.round(PixelRatio.roundToNearestPixel(size)) - 2;
}
