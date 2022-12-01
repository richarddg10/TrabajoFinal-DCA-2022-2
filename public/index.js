import "./components/index.js";
//import { addUser, queryUser } from "./services/db.js";
var Screens;
(function (Screens) {
    Screens[Screens["login"] = 0] = "login";
    Screens[Screens["registro"] = 1] = "registro";
    Screens[Screens["home"] = 2] = "home";
    Screens[Screens["crearpost"] = 3] = "crearpost";
})(Screens || (Screens = {}));
class MyContainer extends HTMLElement {
    constructor() {
        super();
        this.screen = Screens.login;
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a, _b, _c;
        this.render();
        const login = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("my-login");
        login === null || login === void 0 ? void 0 : login.addEventListener("login-success", () => {
            this.screen = Screens.home;
            this.render();
        });
        const irAlRegistro = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector("my-login");
        irAlRegistro === null || irAlRegistro === void 0 ? void 0 : irAlRegistro.addEventListener("ir-al-registro", () => {
            var _a;
            this.screen = Screens.registro;
            this.render();
            const registro = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("my-registro");
            registro === null || registro === void 0 ? void 0 : registro.addEventListener("register-success", () => {
                console.log('holi');
                this.screen = Screens.home;
                this.render();
            });
        });
        const crearP = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector("crear-posts");
        crearP === null || crearP === void 0 ? void 0 : crearP.addEventListener("crearpost-fullfilled", () => {
            this.screen = Screens.home;
            this.render();
        });
    }
    render() {
        if (this.shadowRoot) {
            switch (this.screen) {
                case Screens.login:
                    this.shadowRoot.innerHTML = "<my-login></my-login>";
                    break;
                case Screens.registro:
                    this.shadowRoot.innerHTML = "<my-registro></my-registro>";
                    break;
                case Screens.home:
                    this.shadowRoot.innerHTML = "<app-home></app-home>";
                    break;
                case Screens.crearpost:
                    this.shadowRoot.innerHTML = "<crear-posts></crear-posts>";
                    break;
                default:
                    break;
            }
        }
    }
}
customElements.define("my-container", MyContainer);
