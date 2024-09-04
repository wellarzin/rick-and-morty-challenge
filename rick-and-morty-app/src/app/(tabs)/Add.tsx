import { theme } from "@/theme";
import { View, StyleSheet, Text } from "react-native";

export default function Add() {
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Add</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background
    },
    text:{
        fontSize: 30,
        color: theme.colors.white,
        fontFamily: theme.fontFamily.h1
    }
})