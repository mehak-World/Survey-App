export const isLoggedIn = () => {
    const user = localStorage.getItem("username");
    if(user == null){
        return false
    }
    return true;
}