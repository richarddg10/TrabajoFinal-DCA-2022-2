var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { addPost } from "../../services/db.js";
export class CrearPosts extends HTMLElement {
    constructor() {
        super();
        this.username = "";
        this.publicacion = "";
        this.comentario = "";
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        var _a, _b, _c, _d;
        this.render();
        const btn = (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector("button");
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            if (this.username && this.publicacion && this.comentario) {
                const dataPost = {
                    username: this.username,
                    publicacion: this.publicacion,
                    comentario: this.comentario
                };
                try {
                    yield addPost(dataPost);
                    alert("Post creado");
                    const event = new CustomEvent("crearpost-fullfilled", {
                        composed: true
                    });
                    this.dispatchEvent(event);
                }
                catch (error) {
                    console.error(error);
                    alert("An error occurred while creating the post");
                }
            }
            else {
                alert("Missing fields");
            }
        }));
        const usernameInput = (_b = this.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('#username');
        const publicacionInput = (_c = this.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('#publicacion');
        const comentarioInput = (_d = this.shadowRoot) === null || _d === void 0 ? void 0 : _d.querySelector('#comentario');
        usernameInput === null || usernameInput === void 0 ? void 0 : usernameInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.username = value;
        });
        publicacionInput === null || publicacionInput === void 0 ? void 0 : publicacionInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.publicacion = value;
        });
        comentarioInput === null || comentarioInput === void 0 ? void 0 : comentarioInput.addEventListener("change", (evt) => {
            const value = evt.target.value || "";
            this.comentario = value;
        });
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./components/formulario/stylesLogin.css">

            <article class="input">
                <input id="username" type="text" placeholder="username">
                <input id="publicacion" type="text" placeholder="publicacion/imagen">
                <input id="comentario" type="text" placeholder="comentario">

                <button id="crear" type="submit">Crear</button>
            </article>
        `;
        }
    }
}
customElements.define("crear-posts", CrearPosts);
