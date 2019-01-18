export const SET_USER_DETAILS = 'main/SET_USER_DETAILS';
export const SET_ACTIVE_ROLE = 'main/SET_ACTIVE_ROLE';
export const SET_SYSTEM_DETAILS = 'main/SET_SYSTEM_DETAILS';

const initialState = {
  uid: '',
  userDetails: {},
  activeRole: '', // sales, finance, admin, or ops
  systemDetails: {}
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
    case SET_SYSTEM_DETAILS:
      return {
        ...state,
        systemDetails: action.systemDetails
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
