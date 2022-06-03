export default {
    namespaced: true,
    state: {
        user: {
            userid: "",
            token: ""
        }
    },
    mutations: {
        setUser(state, userid) {
            state.user.userid = userid;
        }
    }
}