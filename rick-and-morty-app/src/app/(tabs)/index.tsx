import { theme } from "@/theme";
import { View, StyleSheet, Text } from "react-native";
import { Header } from "@/component/Header";
import Search from "@/component/Search";
import CharacterList from "@/component/CharacterList";
import { useState } from "react";
import AddButton from "@/component/AddButton";
import AddCharacterModal from "@/component/AddCharacterModal";
import Character from "@/interfaces/Character";
import { setEnabled } from "react-native/Libraries/Performance/Systrace";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isAddCharacterModalVisible, setIsAddCharacterModalVisible] = useState(false);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortOrder: string) => {
    if (newSortOrder === "asc" || newSortOrder === "desc") {
      setSortOrder(newSortOrder);
    } else {
      console.error(`Invalid sort order: ${newSortOrder}`);
    }
  };

  const handleAddCharacter = (newCharacter: Character) => {
    setCharacters((prevCharacters) => [...prevCharacters, newCharacter]);
    setIsAddCharacterModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Header
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>

      <View>
        <CharacterList
          searchTerm={searchTerm}
          filter={filter}
          sortOrder={sortOrder}
          characters={characters}
          setCharacters={setCharacters}
        />
        <View style={styles.addbutton}>
          <AddButton onPress={() => setIsAddModalVisible(true)} />
        </View>
      </View>
      <AddCharacterModal
        visible={isAddModalVisible}
        onClose={() => setIsAddModalVisible(false)}
        onAddCharacter={handleAddCharacter}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: theme.colors.background,
    paddingTop: 50,
  },
  text: {
    fontSize: 30,
    color: theme.colors.white,
    fontFamily: theme.fontFamily.h1,
  },
  addbutton: {
    position: "absolute",
    right: 125,
    bottom: 230
  },
});
