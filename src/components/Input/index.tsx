import React from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import * as S from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function Input({ iconName, ...rest }: InputProps) {
  const theme = useTheme();

  return (
    <S.Container>
      <S.IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </S.IconContainer>

      <S.InputText {...rest} />
    </S.Container>
  );
}
