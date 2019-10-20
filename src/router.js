import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
function lazyLoad(view) {
  return () => import(`@/views/${view}.vue`);
}
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "welcome",
      component: lazyLoad("Welcome")
    },
    {
      path: "/weather/:city",
      name: "results",
      component: lazyLoad("Results")
    },
    {
      path: "/favourites",
      name: "favourites",
      component: lazyLoad("Favourites")
    }
  ]
});
