import router from "./index"
import store from "../store"

router.beforeEach((to, from, next) => {
    if (to.meta.isLogin) {
        let token = store.state.login.user.userid;
        //console.log(token)
        if (token) {
            next();
        }
        else {
            next({
                name: "Login"
            });
        }
    } else {
        next();
    }
})