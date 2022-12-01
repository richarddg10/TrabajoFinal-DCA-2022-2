//import { pintarPosts } from "../../services/db.js";

export interface InfoPostNuevos {
    username: string;
    publicacion: string;
    comentario: string;
}

class ListaPostsNuevos extends HTMLElement {

    posts: InfoPostNuevos[] = [];

    username?: string;
    publicacion?: string;
    comentario?: string;

    static get observedAttributes() {
        const variab: Record<InfoPostNuevos, null> = { username: null, publicacion: null, comentario: null };
        return Object.keys(variab);
    }

    attributeChangedCallback(propName: any, oldValue: string, newValue: string) {
        switch (propName) {
        default:
            this[propName] = newValue;
            break;
        }
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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