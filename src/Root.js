import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import { navigationRef } from "@/navigationService";
import ToastableScreen from "@/system/Toast";
import SideMenu from "@/system/SideMenu";
import Splash from "@/splash/Splash";
import Menu from "@/menu/Menu";
import { Round1, Round2, Round3 } from "@/game/Round";
import Summary from "@/game/Summary";
import { initialiseStore, getStore } from "@/store";

const Stack = createStackNavigator();

export default function Root() {
  const [loaded, setLoaded] = useState(false);
  const [store, setStore] = useState(getStore());

  useEffect(() => {
    if (!store) {
      initialiseStore().then(() => setStore(getStore()));
    }
  }, [store]);

  if (!loaded || !store) {
    return <Splash onFinishLoading={() => setLoaded(true)} />;
  }

  return (
    <Provider store={store}>
      <ToastableScreen>
        <SideMenu>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="menu"
              headerMode="none"
              screenOptions={{
                gestureEnabled: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              }}
            >
              <Stack.Screen name="menu" component={Menu} />
              <Stack.Screen name="round1" component={Round1} />
              <Stack.Screen name="round2" component={Round2} />
              <Stack.Screen name="round3" component={Round3} />
              <Stack.Screen name="summary" component={Summary} />
            </Stack.Navigator>
          </NavigationContainer>
        </SideMenu>
      </ToastableScreen>
    </Provider>
  );
}
