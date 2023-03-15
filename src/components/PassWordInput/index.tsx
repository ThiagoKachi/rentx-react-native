import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PassWordInput({ iconName, ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const theme = useTheme();

  function handlePasswordVisibilityChange() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <S.Container>
      <S.IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </S.IconContainer>

      <S.InputText {...rest} secureTextEntry={isPasswordVisible} />

      <S.ChangePasswordVisibilityButton
        onPress={handlePasswordVisibilityChange}
      >
        <S.IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </S.IconContainer>
      </S.ChangePasswordVisibilityButton>
    </S.Container>
  );
}