import { addPost } from "../../services/db.js";

export class CrearPosts extends HTMLElement {
    
    username = "";
    publicacion = "";
    comentario = "";
    
    constructor() {
        super();
        this.attachShadow({mode:"open"});
    }

    connectedCallback() {
        this.render();

        const btn = this.shadowRoot?.querySelector("button");
        btn?.addEventListener("click", async () => {
            if(this.username && this.publicacion && this.comentario) {
                const dataPost = {
                    username: this.username,
                    publicacion: this.publicacion,
                    comentario: this.comentario
                }
                
                try {
                    await addPost(dataPost);
                    alert("Post creado");

                    const event: CustomEvent = new CustomEvent("crearpost-fullfilled", {
                        composed: true
                    });

                    this.dispatchEvent(event);
                } catch (error) {
                    console.error(error);
                    alert("An error occurred while creating the post");
                }
            } else {
                alert("Missing fields");
            }
        });

        const usernameInput = this.shadowRoot?.querySelector('#username');
        const publicacionInput = this.shadowRoot?.querySelector('#publicacion');
        const comentarioInput = this.shadowRoot?.querySelector('#comentario');
        
        usernameInput?.addEventListener("change", (evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.username = value;
        });

        publicacionInput?.addEventListener("change", (evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
            this.publicacion = value;
        });

        comentarioInput?.addEventListener("change", (evt) => {
            const value: string = (evt.target as HTMLInputElement).value || "";
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