import React from "react";
import { useTheme } from "styled-components";
import { StatusBar } from "react-native";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PassWordInput } from "../../components/PassWordInput";

import * as S from "./styles";

export function SignIn() {
  const theme = useTheme();

  return (
    <S.Container>
      <StatusBar barStyle="dark-content" />
      <S.Header>
        <S.Title>Estamos{"\n"}quase lá.</S.Title>
        <S.SubTitle>
          Faça seu login para começar{"\n"}uma experiência incrível.
        </S.SubTitle>
      </S.Header>

      <S.Form>
        <Input
          iconName="mail"
          placeholder="E-mail"
          placeholderTextColor={theme.colors.shape}
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />

        <PassWordInput
          iconName="lock"
          placeholder="Senha"
          placeholderTextColor={theme.colors.shape}
        />
      </S.Form>

      <S.Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />

        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          light
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
      </S.Footer>
    </S.Container>
  );
}
