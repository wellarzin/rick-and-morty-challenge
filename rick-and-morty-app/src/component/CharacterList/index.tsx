import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Character from "@/interfaces/Character";
import CharacterModal from "../CharacterModal";
import EditModal from "../EditModal";

interface CharacterListProps {
  searchTerm: string;
  filter: string;
  sortOrder: "asc" | "desc";
  characters: Character[];
  setCharacters: (characters: Character[]) => void; // Adiciona a função de atualização de personagens
}

export default function CharacterList({
  searchTerm,
  filter,
  sortOrder,
  characters,
  setCharacters, // Recebe a função de atualização de personagens como prop
}: CharacterListProps) {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

  useEffect(() => {
    const getFilteredAndSortedCharacters = () => {
      let filtered = characters;

      if (filter !== "All") {
        filtered = filtered.filter(character => character.status === filter);
      }

      if (searchTerm) {
        filtered = filtered.filter(character =>
          character.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      filtered = filtered.sort((a, b) => {
        if (a.name < b.name) return sortOrder === "asc" ? -1 : 1;
        if (a.name > b.name) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });

      return filtered;
    };

    setFilteredCharacters(getFilteredAndSortedCharacters());
  }, [searchTerm, filter, sortOrder, characters]);

  const openModal = (character: Character) => {
    setSelectedCharacter(character);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setSelectedCharacter(null);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Exclusão de Personagem",
      "Tem certeza que deseja excluir este personagem?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => {
            const updatedCharacters = characters.filter(
              (character) => character.id !== id
            );
            setCharacters(updatedCharacters);
          },
          style: "destructive",
        },
      ]
    );
    setIsModalVisible(false);
  };

  const handleEdit = (character: Character) => {
    setSelectedCharacter(character);
    setIsEditModalVisible(true);
    setIsModalVisible(false);
  };

  const saveEdit = (updatedCharacter: Character) => {
    const updatedCharacters = characters.map((char) =>
      char.id === updatedCharacter.id ? updatedCharacter : char
    );
    setCharacters(updatedCharacters);
    setIsEditModalVisible(false);
  };

  const renderItem = ({ item }: { item: Character }) => (
    <TouchableOpacity onPress={() => openModal(item)}>
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
        />
        <View style={styles.bgName}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {filteredCharacters.length === 0 ? (
        <Text style={styles.noResults}>No characters found</Text>
      ) : (
        <FlatList
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          keyboardShouldPersistTaps="handled"
        />
      )}
      <CharacterModal
        character={selectedCharacter}
        visible={isModalVisible}
        onClose={closeModal}
        onDelete={() => handleDelete(selectedCharacter?.id!)}
        onEdit={handleEdit}
      />
      {selectedCharacter !== null && (
        <EditModal
          character={selectedCharacter}
          visible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          onSave={saveEdit}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  name: {
    color: "white",
    fontSize: 16,
    lineHeight: 16,
    fontFamily: "Raleway, sans-serif",
    fontWeight: "400",
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
    width: 156,
    height: 93,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  bgName: {
    backgroundColor: "#17241A",
    borderBottomEndRadius: 7,
    borderBottomStartRadius: 7,
  },
  list: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  noResults: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});