import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import CardStackStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator';

import ToastableScreen from '@/system/Toast';
import Splash from '@/splash/Splash';
import Menu from '@/menu/Menu';
import Game from '@/game/Game';
import Summary from '@/game/Summary';
import store from '@/store';

const Root = () => (
  <Provider store={store}>
    <ToastableScreen>
      <Router>
        <Stack
          hideNavBar
          key="root"
          panHandlers={null}
          transitionConfig={() => ({
            screenInterpolator: props => {
              const { scene } = props;
              switch (scene.route.routeName) {
                case 'menu':
                  return CardStackStyleInterpolator.forHorizontal(props);
                case 'game':
                  return CardStackStyleInterpolator.forHorizontal(props);
                case 'summary':
                  return CardStackStyleInterpolator.forHorizontal(props);
                default:
                  return CardStackStyleInterpolator.forInitial;
              }
            },
          })}
        >
          <Scene key="splash" initial component={Splash} />
          <Scene key="menu" gesturesEnabled={false} component={Menu} />
          <Scene key="game" gesturesEnabled={false} component={Game} />
          <Scene key="summary" gesturesEnabled={false} component={Summary} />
        </Stack>
      </Router>
    </ToastableScreen>
  </Provider>
);

export default Root;
