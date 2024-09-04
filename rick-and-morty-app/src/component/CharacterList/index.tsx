import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import useRickAndMortyData from "@/hooks/useRickAndMortyData";
import { StyleSheet } from "react-native";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  gender: string;
  type: string;
}

export default function CharacterList() {
  const { characters, isLoading } = useRickAndMortyData();

  const renderItem = ({ item }: { item: Character }) => (
    <View style={styles.card}>
      {/* <ImageBackground>{item.image}</ImageBackground> */}
      <Text style={styles.image}>{item.image}</Text>
      <View style={styles.bgName}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#9DFF00" />
      ) : (
        <FlatList 
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={characters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    color: "white",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Raleway, sans-serif",
    fontWeight: 400,
    padding: 5,
    textAlign: "center",
  },
  card: {
    width: 156,
    height: 122,
    borderRadius: 8, 
    margin: 5,
    borderColor: "#68C360",
    borderWidth: 2,
  },
  image: {
    height: 98,
    backgroundColor: "white",
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
  },
  bgName: {
    backgroundColor: "#17241A",
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
  list: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  }
});
