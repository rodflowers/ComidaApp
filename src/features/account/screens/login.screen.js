import React, { useState } from "react";
import {
  AccountBackground,
  AccountCover,
  LoginInput,
  AccountContainer,
  AuthButton,
  Title,
  ErrorContainer,
} from "../components/account.styles";

import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { ActivityIndicator, Colors } from "react-native-paper";

import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../../redux/actions/auth.action";

//! Render
export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, error, loading, isAuth } = useSelector(
    (state) => state.authStore
  );

  return (
    <AccountBackground>
      <AccountCover />
      <Title>Comidas Ya</Title>
      <AccountContainer>
        <LoginInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />
        <Spacer size="large">
          <LoginInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            secure
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        {error && (
          <ErrorContainer size="large">
            <Text variant="error">{error}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!loading ? (
            <AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={() => dispatch(loginUser(email, password))}
            >
              Log In
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="large">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Volver
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
