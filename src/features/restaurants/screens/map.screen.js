import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import MapView from "react-native-maps";
import styled from "styled-components";
import { Search } from "../../../features/map/components/search.component";
import { MapCallout } from "../../map/components/map-callout.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = ({ navigation }) => {
  const locationRedux = useSelector((state) => state.locationStore);
  const { Location } = locationRedux;
  const restaurantRedux = useSelector((state) => state.restaurantsReducer);
  const { listRestaurants } = restaurantRedux;

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = Location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [Location, viewport]);
  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      >
        {listRestaurants.map((restaurant) => {
          return (
            <MapView.Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <MapView.Callout
                onPress={() =>
                  navigation.navigate("RestaurantDetail", {
                    item: restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </MapView.Callout>
            </MapView.Marker>
          );
        })}
      </Map>
    </>
  );
};
