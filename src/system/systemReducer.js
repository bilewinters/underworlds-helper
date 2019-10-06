const showToastType = 'SHOW_TOAST';
const hideToastType = 'HIDE_TOAST';
const showSideMenuType = 'SHOW_SIDE_MENU';
const hideSideMenuType = 'HIDE_SIDE_MENU';

const showToast = (toastMessage, dispatch) =>
  dispatch({
    type: showToastType,
    toastMessage,
  });

const hideToast = dispatch =>
  dispatch({
    type: hideToastType,
  });

const showSideMenu = dispatch =>
  dispatch({
    type: showSideMenuType,
  });

const hideSideMenu = dispatch =>
  dispatch({
    type: hideSideMenuType,
  });

const reducer = (state = { showToast: false }, action) => {
  switch (action.type) {
    case showToastType:
      return { ...state, showToast: true, toastMessage: action.toastMessage };
    case hideToastType:
      return { ...state, showToast: false, toastMessage: undefined };
    case showSideMenuType:
      return { ...state, showSideMenu: true };
    case hideSideMenuType:
      return { ...state, showSideMenu: false };
    default:
      return state;
  }
};

export default reducer;

export { showToast, hideToast, showSideMenu, hideSideMenu };
