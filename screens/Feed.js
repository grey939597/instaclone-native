import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { colors } from "../colors";

const LogoutLink = styled.Text`
  color: ${colors.blue};
  font-weight: 600;
  margin-top: 20px;
  text-align: center;
`;

export default function Feed() {
  const logout = async () => {
    await logUserOut();
  };
  return (
    <View>
      <TouchableOpacity onPress={logout}>
        <LogoutLink>Logout</LogoutLink>
      </TouchableOpacity>
    </View>
  );
}
