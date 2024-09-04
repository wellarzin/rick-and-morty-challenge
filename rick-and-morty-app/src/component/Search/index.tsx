import { styles } from "./styles";
import { View, Text } from "react-native";

export default function Search() {
    return (
      <View style={styles.Search}>
        <Text style={styles.text}>
          Digite o nome ou id do personagem
        </Text>
      </View>
    )
  }