import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen"

import {
  useFonts,
  Raleway_400Regular,
  Raleway_700Bold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
    Raleway_900Black,
  });

  if(fontsLoaded) {
    SplashScreen.hideAsync();
  }

  return (
    <>
      <GestureHandlerRootView>
        <StatusBar barStyle="light-content"/>
        {fontsLoaded && <Slot />}
      </GestureHandlerRootView>
    </>
  );
}
