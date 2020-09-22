import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef();

export const naviagationService = {
  navigateTo: routeName => navigationRef.current?.dispatch(StackActions.push(routeName)),
  goBack: () => navigationRef.current?.goBack(),
  goToMenu: () => navigationRef.current?.dispatch(StackActions.popToTop()),
};
