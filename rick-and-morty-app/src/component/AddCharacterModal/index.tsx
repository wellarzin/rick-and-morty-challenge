import React, { useState } from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import Character from "@/interfaces/Character";

interface AddCharacterModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCharacter: (newCharacter: Character) => void;
}

const AddCharacterModal: React.FC<AddCharacterModalProps> = ({ visible, onClose, onAddCharacter }) => {
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [species, setSpecies] = useState("");
    const [gender, setGender] = useState("");
    const [image, setImage] = useState("");
  
    const handleSave = () => {
      const newCharacter: Character = {
        id: Date.now(), // Simulação de ID único
        name,
        status,
        species,
        gender,
        image,
        type: "", // Se aplicável
      };
      onAddCharacter(newCharacter);
      onClose();
    };
  
    return (
      <Modal visible={visible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add New Character</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              value={status}
              onChangeText={setStatus}
              placeholder="Status"
            />
            <TextInput
              style={styles.input}
              value={species}
              onChangeText={setSpecies}
              placeholder="Species"
            />
            <TextInput
              style={styles.input}
              value={gender}
              onChangeText={setGender}
              placeholder="Gender"
            />
            <TextInput
              style={styles.input}
              value={image}
              onChangeText={setImage}
              placeholder="Image URL"
            />
            <View style={styles.buttonContainer}>
              <Button title="Save" onPress={handleSave} />
              <Button title="Cancel" onPress={onClose} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      width: 300,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      marginBottom: 10,
      width: "100%",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
  });
  
  export default AddCharacterModal;