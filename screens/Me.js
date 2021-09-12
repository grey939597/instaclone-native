import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { colors } from "../colors";

const LogoutLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  text-align: center;
`;

export default function Me() {
  const logout = async () => {
    await logUserOut();
  };
  return (
    <View
      style={{
        backgroundColor: colors.black,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity onPress={logout}>
        <LogoutLink>Logout</LogoutLink>
      </TouchableOpacity>
    </View>
  );
}
