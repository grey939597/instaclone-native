import React from "react";
import { ActivityIndicator } from "react-native";

export default function ScreenLayout({ loading, children }) {
  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loading ? <ActivityIndicator color={colors.white} /> : children}
    </View>
  );
}
