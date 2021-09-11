import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import { colors } from "../../colors";
import { ActivityIndicator } from "react-native";

const Button = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 16px 8px;
  border-radius: 4px;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
`;

const ButtonText = styled.Text`
  color: ${colors.white};
  font-weight: 600;
  text-align: center;
`;

function AuthButton({ onPress, disabled, text, loading }) {
  return (
    <Button disabled={disabled} onPress={onPress}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <ButtonText>{text}</ButtonText>
      )}
    </Button>
  );
}

AuthButton.propTypes = {
  loading: PropTypes.bool,
};

export default AuthButton;
