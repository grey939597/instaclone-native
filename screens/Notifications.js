import React from "react";
import { Text, View } from "react-native";
import { colors } from "../colors";

export default function Notifications() {
  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: colors.white }}>Notifications</Text>
    </View>
  );
}
