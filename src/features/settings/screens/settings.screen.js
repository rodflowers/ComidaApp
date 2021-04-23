import React from "react";
import { useSelector } from "react-redux";

import { List, Avatar } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";

import styled from "styled-components";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actions/auth.action";

const SettingsItem = styled(List.Item)`
  padding: ${(props) => props.theme.space[3]};
`;
const AvatarContainer = styled.View`
  align-items: center;
`;

export const SettingsScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.authStore);
  const dispatch = useDispatch();
  return (
    <SafeArea>
      <Spacer position="bottom" size="large" />
      <AvatarContainer>
        <Avatar.Icon size={180} icon="account" backgroundColor="#2182BD" />
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </AvatarContainer>
      <List.Section>
        <SettingsItem
          title="Favoritos"
          description="Acá, tus favoritos"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate("Favourites")}
        />
        <SettingsItem
          title="Cerrar Sesión"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={() => dispatch(logoutUser())}
        />
      </List.Section>
    </SafeArea>
  );
};
