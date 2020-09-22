import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

import { navigationRef } from '@/navigationService';
import ToastableScreen from '@/system/Toast';
import SideMenu from '@/system/SideMenu';
import Splash from '@/splash/Splash';
import Menu from '@/menu/Menu';
import { Round1, Round2, Round3 } from '@/game/Round';
import Summary from '@/game/Summary';
import { getStore } from '@/store';

const Stack = createStackNavigator();

export default function Root() {
  const [loaded, setLoaded] = useState(false);

  if (!loaded) {
    return <Splash onFinishLoading={() => setLoaded(true)} />;
  }

  return (
    <Provider store={getStore()}>
      <ToastableScreen>
        <SideMenu>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="menu"
              headerMode="none"
              screenOptions={{ gestureEnabled: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
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
