import React, { useState } from "react";
import styled from "styled-components";
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import { Searchbar } from "react-native-paper";
import { RestaurantInfo } from "../components/restaurant-info.component";

export const RestaurantScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <SafeAreaResto>
      <SearchView>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
        />
      </SearchView>
      <ListView>
        <RestaurantInfo />
      </ListView>
    </SafeAreaResto>
  );
};

const SafeAreaResto = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px;`}
`;

const SearchView = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const ListView = styled(View)`
  flex: 1;
  padding: ${(props) => props.theme.space[3]};
`;
