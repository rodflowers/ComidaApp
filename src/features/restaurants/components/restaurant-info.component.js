import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Title } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import { Favourite } from "../../../components/favourites/favourites.component";

import star from "../../../../assets/star";
import open from "../../../../assets/open";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  RestaurantCard,
  RestaurantCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Address,
} from "./restaurant-info-card.styles";

export const RestaurantInfo = ({ restaurant = {} }) => {
  const {
    name = "Some restaurant",
    icon = "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/lodging-71.png",
    photos = [
      "https://s1.eestatic.com/2017/07/28/social/comida_rapida-mcdonald-s-burger_king_234737744_41241306_1706x960.jpg",
    ],
    address = "100 random street",
    isOpenNow = true,
    rating = 4,
    isClosedTemp = true,
    placeId,
  } = restaurant;

  const ratingArr = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <View>
        <Favourite restaurant={restaurant} />
        <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </View>
      <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>
            {ratingArr.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemp && (
              <Text variant="label" style={{ color: "red" }}>
                CERRADO
              </Text>
            )}
            <View style={{ paddingLeft: 16 }} />
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <View style={{ paddingLeft: 16 }} />
            </Spacer>
            <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};

const styles = StyleSheet.create({});
