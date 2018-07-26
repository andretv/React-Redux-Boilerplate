export const TOGGLE_REMEMBERME = 'TOGGLE_REMEMBERME';
export const toggleRemeberMe = () => ({
  type: TOGGLE_REMEMBERME,
});

export const SET_EMAIL_TO_REMEMBER = 'SET_EMAIL_TO_REMEMBER';
export const setEmailToRemember = email => ({
  type: SET_EMAIL_TO_REMEMBER,
  payload: email,
});
