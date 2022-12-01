import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";

//import { DataShape } from "../dataPosts.js";
import { InfoPostNuevos } from "../components/listaPostsNuevos/listaPostsNuevos.js";

const firebaseConfig = {
    apiKey: "AIzaSyAKMhcEsfDBKdQYQ3md5rhCdgkMijV8m9Y",
    authDomain: "usuarios-instagram.firebaseapp.com",
    projectId: "usuarios-instagram",
    storageBucket: "usuarios-instagram.appspot.com",
    messagingSenderId: "999866750942",
    appId: "1:999866750942:web:9f36c0767b4c1e82b4ef4f"
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const usersRef = collection(db,"usuarios");

export const queryUser = async ({ email, password }: { email: string; password: string; }) => {

    try {
        const q = query(usersRef, where("email", "==", email), where("password","==", password));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc:any) => {
            console.log(doc.id,"=>",doc.data());
        });

        return !querySnapshot.empty;
    } catch (error) {
        return false;
    }
}

export const addUser = async ({ email, password }: { email: string; password: string; }) => {
    
    try {
        const docRef = await addDoc(collection(db,"usuarios"), { email, password });
        console.log(docRef.id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export const addPost = async ({ username, publicacion, comentario }: { username: string; publicacion: string; comentario: string; }) => {
    
    try {
        const docRef = await addDoc(collection(db,'posts'), {
          username,
          publicacion,
          comentario,
          comentarios: 0,
          profilephoto: '../assets/perfilRichard.png'
        });
        console.log(docRef.id);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

export interface DataP extends InfoPostNuevos {
    data: () => InfoPostNuevos;
}

export const pintarPosts = async () => {
    try {
        const posts: InfoPostNuevos[] = [];
        const querySnapshot = await getDocs(collection(db, 'posts'));
        querySnapshot.forEach((post: DataP) => {
            posts.push(post.data());
            //console.log(post);
        });
        return posts;
    } catch (error) {
      console.error(error);
      alert('No se pudo mostrar el post');
    }
}