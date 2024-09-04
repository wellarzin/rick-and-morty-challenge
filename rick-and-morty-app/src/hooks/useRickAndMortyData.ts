import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

interface Character{
    id: number;
    name: string;
    status: string;
    species: string;
    image: string;
    gender: string;
    type: string;
}
const useRickAndMortyData = () => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCharacters = async () => {
        try {
          const response = await fetch('https://rickandmortyapi.com/api/character');
          const data = await response.json();
          setCharacters(data.results);
          await AsyncStorage.setItem('characters', JSON.stringify(data.results));
        } catch (error) {
          console.error('Failed to fetch characters:', error);
        } finally {
          setIsLoading(false);  // Certifique-se de que `isLoading` seja definido como false aqui
        }
      };

    const loadCharacters = async () => {
        try {
            const storedCharacters = await AsyncStorage.getItem('characters');
            if (storedCharacters) {
              setCharacters(JSON.parse(storedCharacters));
            } else {
              await fetchCharacters();
            }
          } catch (error) {
            console.error('Failed to load characters from storage:', error);
          } finally {
            setIsLoading(false);  // Certifique-se de que `isLoading` seja definido como false aqui
          }
    }

    useEffect(() => {
        loadCharacters();
    }, []);

    return { characters, isLoading };
}

export default useRickAndMortyData