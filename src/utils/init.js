import store from "../store"

if(localStorage.getItem("cyf")){
    store.commit("login/setUser", JSON.parse(localStorage.getItem("cyf")))
}