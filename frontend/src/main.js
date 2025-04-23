import { Icon } from "@iconify/vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const app = createApp(App);

app.component("Icon", Icon);

app.use(router);

app.mount("#app");
