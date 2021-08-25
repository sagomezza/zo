import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { height } from "../../config/constants/screenDimensions";
import styles from "./styles";

const Button = (props) => {
  const {
    title,
    style,
    textStyle,
    color,
    onPress,
    disabled,
    activityIndicatorStatus,
    activityIndicatorStatusColor
  } = props;

  const background =
    color === "primary"
      ? "#3A3745"
      : color === "success"
      ? "#4caf50"
      : color === "warning"
      ? "#ff9800"
      : color === "light"
      ? "white"
      : color === "green"
      ? "#2DD47F"
      : color === "error"
      ? "#f44336"
      : color;

  return (
    <>
      {activityIndicatorStatus ? (
        <View style={[styles.container, style]}>
          {activityIndicatorStatusColor ? 
          <ActivityIndicator size={"large"} color={activityIndicatorStatusColor} />
          :
          <ActivityIndicator size={"large"} color={background} />}
        </View>
      ) : (
        <TouchableOpacity onPress={onPress} disabled={disabled}>
          <View
            style={[styles.container, style, { backgroundColor: background}]}
          >
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default Button;
