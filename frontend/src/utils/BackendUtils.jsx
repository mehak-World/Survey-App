export const serverUrl = "http://localhost:8080/"

export const getAuthToken = () => {
    return "Bearer " + window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};