export const SET_USER_DETAILS = 'main/SET_USER_DETAILS';
export const SET_CATEGORIES = 'main/SET_CATEGORIES';
export const SET_ACTIVE_ROLE = 'main/SET_ACTIVE_ROLE';
export const SET_SYSTEM_DETAILS = 'main/SET_SYSTEM_DETAILS';
export const SET_SELECTED_TAB = 'main/SET_SELECTED_TAB';

const initialState = {
  uid: '',
  userDetails: {},
  categories: {},
  activeRole: '', // sales, finance, admin, or ops
  systemDetails: {},
  selectedTab: ['1']
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
        uid: action.uid
      };
    case SET_ACTIVE_ROLE:
      return {
        ...state,
        activeRole: action.role
      };
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories
      };
    case SET_SYSTEM_DETAILS:
      return {
        ...state,
        systemDetails: action.systemDetails
      };
    case SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.selectedTab
      };
    default:
      return state;
  }
};

export const setUserDetails = (userDetails, uid) => dispatch => {
  dispatch({
    type: SET_USER_DETAILS,
    userDetails,
    uid
  });
};

export const setCategories = categories => dispatch => {
  dispatch({
    type: SET_CATEGORIES,
    categories
  });
};

export const setSelectedTab = selectedTab => dispatch => {
  dispatch({
    type: SET_SELECTED_TAB,
    selectedTab
  });
};

export const setSystemDetails = systemDetails => dispatch => {
  dispatch({
    type: SET_SYSTEM_DETAILS,
    systemDetails
  });
};

export const setActiveRole = role => dispatch => {
  dispatch({
    type: SET_ACTIVE_ROLE,
    role
  });
};
