import { render } from "preact";
import { App } from "./route/app.jsx";
// import "./index.css";
// register sw
if (self.navigator?.serviceWorker) {
    self.navigator.serviceWorker.register("sw.js").then(() => {
        console.log("Service Worker Registed.");
    });
}

console.log("Hello World");

render(App(), document.querySelector("#app"))
