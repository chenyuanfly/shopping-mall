export default{
    namespaced:true,
    state:{
        user:{
            username:"",
            token:""
        }
    },
    mutations:{
        setUser(state, username){
            state.user.username = username;
        }
    }
}