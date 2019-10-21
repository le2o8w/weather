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
      name: "home",
      component: lazyLoad("Home")
    },
    {
      path: "",
      name: "layout",
      component: lazyLoad("Layout"),
      children: [
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
    }
  ]
});
