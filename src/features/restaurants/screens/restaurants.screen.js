import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FlatList, TouchableOpacity } from "react-native";
import { RestaurantInfo } from "../components/restaurant-info.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { ActivityIndicator, Colors } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../../redux/actions/restaurants.action";
import { loadFavourite } from "../../../redux/actions/favourites.action";
import { Search } from "../components/search.component";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";

export const RestaurantScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const restRedux = useSelector((state) => state.restaurantsReducer);
  const { loading, listRestaurants } = restRedux;

  const locationRx = useSelector((state) => state.locationStore);
  const { Location } = locationRx;

  const favouriteRedux = useSelector((state) => state.favouriteStore);
  const { favourites } = favouriteRedux;

  const { user } = useSelector((state) => state.authStore);

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    const locationString = `${Location.lat},${Location.lng}`;
    dispatch(loadFavourite(user.uid));
    dispatch(getRestaurants(locationString));
    return () => {
      // cleanup;
    };
  }, [dispatch, Location, user]);

  return (
    <SafeArea>
      <Search
        isFavouritesIsToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      {loading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      ) : (
        <>
          <RestaurantList
            data={listRestaurants}
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

const RestaurantList = styled(FlatList).attrs({
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
