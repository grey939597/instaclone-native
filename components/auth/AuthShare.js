import styled from "styled-components";
import { colors } from "../../colors";

export const TextInput = styled.TextInput`
  background-color: rgba(255, 255, 255, 0.15);
  color: ${colors.white};
  padding: 16px 8px;
  border-radius: 4px;
  margin-bottom: ${(props) => (props.lastOne ? 16 : 8)}px;
`;
