import {  Image, Text, View } from "react-native";
import { styles } from "./styles";

export function Header() {
  return (
    <View style={styles.Header}>
      <Text style={styles.RickAndMorty}>Rick and Morty</Text>
      <Image
        style={styles.Fav_button}
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/ap8bwuv85ii-1%3A21?alt=media&token=64f4cd17-0e03-46a6-aed3-3a73525493d7",
        }}
      />
    </View>
  );
}


