import React from "react";
import styled from "styled-components/native";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import {
  addFavourite,
  deleteFavourite,
} from "../../redux/actions/favourites.action";
import { useDispatch, useSelector } from "react-redux";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 9;
`;

export const Favourite = ({ restaurant }) => {
  const disptach = useDispatch();
  const favouriteRedux = useSelector((state) => state.favouriteStore);
  const { favourites } = favouriteRedux;

  console.log("IS FAVOURITE => ", favourites);
  const isFavourite = favourites.find((r) => r.placeId === restaurant.placeId);
  return (
    <FavouriteButton
      onPress={() =>
        !isFavourite
          ? disptach(addFavourite(restaurant))
          : disptach(deleteFavourite(restaurant))
      }
    >
      <AntDesign
        name={isFavourite ? "heart" : "hearto"}
        size={24}
        color={isFavourite ? "red" : "white"}
      />
    </FavouriteButton>
  );
};
