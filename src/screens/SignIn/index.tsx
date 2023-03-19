import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from '../../hooks/auth';
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
  const { signIn } = useAuth();
  const theme = useTheme();
  const navigation: any = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSignIn() {
    try {
      setIsLoading(true);
      const schema = Yup.object().shape({
        password: Yup.string().required("Senha obrigatória"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
      });
  
      await schema.validate({ email, password });

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa", error.message)
      } else {
        Alert.alert(
          "Erro na autenticação",
          "Não foi possível fazer login na aplicação, verifique as credenciais."
        )
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handleNewAccount() {
    navigation.navigate('SignUpFirstStep')
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
              loading={isLoading}
            />

            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              light
              onPress={handleNewAccount}
            />
          </S.Footer>
        </S.Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
