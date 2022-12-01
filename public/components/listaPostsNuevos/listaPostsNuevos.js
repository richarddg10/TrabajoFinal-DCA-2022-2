//import { pintarPosts } from "../../services/db.js";
class ListaPostsNuevos extends HTMLElement {
    constructor() {
        super();
        this.posts = [];
        this.attachShadow({ mode: 'open' });
    }
    static get observedAttributes() {
        const variab = { username: null, publicacion: null, comentario: null };
        return Object.keys(variab);
    }
    attributeChangedCallback(propName, oldValue, newValue) {
        switch (propName) {
            default:
                this[propName] = newValue;
                break;
        }
        this.render();
    }
    connectedCallback() {
        this.render();
    }
    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <h1 id="nombreUsuario">${this.username}</h1>
                <img id="publicacion" src="${this.publicacion}"/>
                <p id="miComentario1">${this.comentario}</p>
            `;
        }
    }
}
customElements.define("lista-posts-nuevos", ListaPostsNuevos);
export default ListaPostsNuevos;
