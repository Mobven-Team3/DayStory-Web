export const getToken = () => {
    return window.localStorage.getItem('token');
  };
  
  export const setToken = (token) => {
    window.localStorage.setItem('token', token);
  };
  
  export const clearToken = () => {
    window.localStorage.removeItem('token');
  };
  