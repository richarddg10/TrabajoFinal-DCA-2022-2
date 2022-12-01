import "./components/index.js";

//import { addUser, queryUser } from "./services/db.js";

enum Screens {
    login,
    registro,
    home,
    crearpost
}

class MyContainer extends HTMLElement {

    screen: Screens = Screens.login;

    constructor() {
        super();
        this.attachShadow({ mode:"open" });
    }

    connectedCallback() {
        this.render();

        const login = this.shadowRoot?.querySelector("my-login");
        login?.addEventListener("login-success", () => {
            this.screen = Screens.home;
            this.render();
        })

        const irAlRegistro = this.shadowRoot?.querySelector("my-login");
        irAlRegistro?.addEventListener("ir-al-registro", () => {
            this.screen = Screens.registro;
            this.render();

            const registro = this.shadowRoot?.querySelector("my-registro");
            registro?.addEventListener("register-success", () => {
                console.log('holi')
                this.screen = Screens.home;
                this.render();
            })
        })

        const crearP = this.shadowRoot?.querySelector("crear-posts");
        crearP?.addEventListener("crearpost-fullfilled", () => {
            this.screen = Screens.home;
            this.render();
        })
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