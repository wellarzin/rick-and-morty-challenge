import { theme } from "@/theme";
import { View, StyleSheet, Text } from "react-native";
import { Header } from "@/component/Header";
import Search from "@/component/Search";	
import CharacterList from "@/component/CharacterList";

export default function Home() {
    return(
        <View style={styles.container}>
            <Header></Header>
            <Search></Search>
            <View >
                <CharacterList></CharacterList>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        paddingTop: 50
    },
    text:{
        fontSize: 30,
        color: theme.colors.white,
        fontFamily: theme.fontFamily.h1
    },
})