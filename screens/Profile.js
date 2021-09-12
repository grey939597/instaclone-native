import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { colors } from "../colors";

export default function Profile({ navigation }) {
  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Photo")}>
        <Text style={{ color: colors.white }}>Go To Photo</Text>
      </TouchableOpacity>
    </View>
  );
}
