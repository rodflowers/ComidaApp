import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Searchbar } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import { getLocations } from "../../../redux/actions/location.action";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Search = ({ isFavouritesIsToggled, onFavouritesToggle }) => {
  const [searchKeyword, setSearchKeyword] = useState("san francisco");

  const dispatch = useDispatch();
  const locationRedux = useSelector((state) => state.locationStore);
  const { keyword } = locationRedux;

  useEffect(() => {
    setSearchKeyword(keyword);
    return () => {
      // cleanup
    };
  }, [keyword]);

  useEffect(() => {
    dispatch(getLocations(searchKeyword));
    return () => {
      //  cleanup
    };
  }, []);
  return (
    <SearchContainer>
      <Searchbar
        icon={isFavouritesIsToggled ? "heart" : "heart-outline"}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => {
          dispatch(getLocations(searchKeyword));
          // search(searchKeyword);
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};
