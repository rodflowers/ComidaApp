import React from "react";

import styled from "styled-components";
import { FlatList, TouchableOpacity } from "react-native";
import { RestaurantInfo } from "../../../features/restaurants/components/restaurant-info.component";

import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ActivityIndicator, Colors } from "react-native-paper";

import { useSelector } from "react-redux";

export const FavouritesScreen = ({ navigation }) => {
  const { favourites, loading } = useSelector((state) => state.favouriteStore);

  return (
    <SafeArea>
      {loading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <>
          <FavouritesList
            data={favourites}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", { item })
                  }
                >
                  <Spacer position="bottom" size="large">
                    <RestaurantInfo restaurant={item} />
                  </Spacer>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        </>
      )}
    </SafeArea>
  );
};

const FavouritesList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
