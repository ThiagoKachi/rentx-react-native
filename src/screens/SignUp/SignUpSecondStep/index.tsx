import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Confirmation } from '../../Confirmation'
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { PassWordInput } from "../../../components/PassWordInput";
import { Button } from "../../../components/Button";

import * as S from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const theme = useTheme();
  const navigation: any = useNavigation();
  const route = useRoute();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }

  function handleRegister() {
    if (!password || !passwordConfirm) {
      return Alert.alert("Informe a senha e a confirmação dela");
    }

    if (password !== passwordConfirm) {
      return Alert.alert("As senhas não são iguais");
    }

    navigation.navigate("Confirmation", {
      title: "Conta Criada!",
      message: `Agora é só fazer login\ne aproveitar`,
      nextScreenRoute: "SignIn",
    });
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.Container>
          <S.Header>
            <BackButton onPress={handleBack} />
            <S.Steps>
              <Bullet active />
              <Bullet />
            </S.Steps>
          </S.Header>

          <S.Title>
            Crie sua{"\n"}
            conta
          </S.Title>

          <S.SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </S.SubTitle>

          <S.Form>
            <S.FormTitle>2. Senha</S.FormTitle>

            <PassWordInput
              iconName="lock"
              placeholder="Senha"
              placeholderTextColor={theme.colors.shape}
              onChangeText={setPassword}
              value={password}
            />
            <PassWordInput
              iconName="lock"
              placeholder="Repetir senha"
              placeholderTextColor={theme.colors.shape}
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />
          </S.Form>

          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
