const showToastType = 'SHOW_TOAST';
const hideToastType = 'HIDE_TOAST';

const showToast = (toastMessage, dispatch) =>
  dispatch({
    type: showToastType,
    toastMessage,
  });

const hideToast = dispatch =>
  dispatch({
    type: hideToastType,
  });

const reducer = (state = { showToast: false }, action) => {
  switch (action.type) {
    case showToastType:
      return { ...state, showToast: true, toastMessage: action.toastMessage };
    case hideToastType:
      return { ...state, showToast: false, toastMessage: undefined };
    default:
      return state;
  }
};

export default reducer;

export { showToast, hideToast };
