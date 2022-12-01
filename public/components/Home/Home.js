var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import DataPosts from "../../dataPosts.js";
import dataPersonalProfile from "../../dataPersonalProfile.js";
import dataSugerencias from "../../dataSugerencias.js";
import { pintarPosts } from "../../services/db.js";
export class Home extends HTMLElement {
    constructor() {
        super();
        this.newposts = [];
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield pintarPosts();
            this.newposts = posts;
            console.log(posts);
            this.render();
        });
    }
    render() {
        const comptsProfile = dataPersonalProfile.map(({ username, profilephoto, nombrecompleto, opcioncambiar }) => `
        <personal-profile
        username="${username}"
        profilephoto="${profilephoto}"
        nombrecompleto="${nombrecompleto}"
        opcioncambiar="${opcioncambiar}"
        ></personal-profile>
        `);
        const comptsSugerencias = dataSugerencias.map(({ username, profilephoto, userinfo, opcionseguir }) => `
        <my-sugerencias
        username="${username}"
        profilephoto="${profilephoto}"
        userinfo="${userinfo}"
        opcionseguir="${opcionseguir}"
        ></my-sugerencias>
        `);
        const comptsPosts = DataPosts.map(({ username, profilephoto, ubicacion, publicacion, usernamecomentario, micomentario1, micomentario2, fechapublicacion }) => `
        <my-post
        username="${username}"
        profilephoto="${profilephoto}"
        ubicacion="${ubicacion}"
        publicacion="${publicacion}"
        usernamecomentario="${usernamecomentario}"
        micomentario1="${micomentario1}"
        micomentario2="${micomentario2}"
        fechapublicacion="${fechapublicacion}"
        ></my-post>
        `);
        const postscreados = this.newposts.map(({ username, publicacion }) => `
        username="${username}"
        publicacion="${publicacion}"
        `);
        if (!this.shadowRoot)
            return;
        this.shadowRoot.innerHTML = `
        
        <link rel="stylesheet" href="./components/sugerencias/stylesSugerencias.css">
            <section class="fondoTitulosSugerencias">
                <h1 id="tituloSugerencias">Sugerencias para ti</h1>
                <h1 id="verTodo">Ver Todo</h1>
            </section>

        <section>
        <up-menu></up-menu>
        <my-historias></my-historias>

        ${comptsProfile.join("")}
        ${comptsSugerencias.join("")}
        ${comptsPosts.join("")}
        ${postscreados.join("")}
        </section>
        `;
    }
}
customElements.define("app-home", Home);
