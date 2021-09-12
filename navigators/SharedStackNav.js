import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import { colors } from "../colors";
import Feed from "../screens/Feed";
import Me from "../screens/Me";
import Notifications from "../screens/Notifications";
import Photo from "../screens/Photo";
import Profile from "../screens/Profile";
import Search from "../screens/search";

const Stack = createStackNavigator();

export default function SharedStackNav({ screenName }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerBackTitleVisible: false,
        headerTintColor: colors.white,
        headerStyle: {
          backgroundColor: colors.black,
          shadowColor: "rgba(255, 255, 255, 0.3)",
        },
      }}
    >
      {screenName === "Feed" ? (
        <Stack.Screen
          name="SFeed"
          component={Feed}
          options={{
            headerTitle: () => (
              <Image
                style={{ maxHeight: 40 }}
                resizeMode="contain"
                source={require("../assets/logo.png")}
              />
            ),
          }}
        />
      ) : null}
      {screenName === "Search" ? (
        <Stack.Screen
          name="SSearch"
          component={Search}
          options={{ headerTitle: "Search" }}
        />
      ) : null}
      {screenName === "Notifications" ? (
        <Stack.Screen
          name="SNotifications"
          component={Notifications}
          options={{ headerTitle: "Notifications" }}
        />
      ) : null}
      {screenName === "Me" ? (
        <Stack.Screen
          name="SMe"
          component={Me}
          options={{ headerTitle: "Me" }}
        />
      ) : null}
      <Stack.Screen name="Photo" component={Photo} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}
