import React, { useState } from "react";
import { useTheme } from "styled-components";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";

import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PassWordInput } from "../../components/PassWordInput";

import * as S from "./styles";

export function SignIn() {
  const theme = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha obrigatória"),
      });
  
      await schema.validate({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return console.log(error);
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Não foi possível fazer login na aplicação, verifique as credenciais."
        )
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />

            <PassWordInput
              iconName="lock"
              placeholder="Senha"
              placeholderTextColor={theme.colors.shape}
              onChangeText={setPassword}
              value={password}
            />
          </S.Form>

          <S.Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
