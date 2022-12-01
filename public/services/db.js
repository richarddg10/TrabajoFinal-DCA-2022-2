var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
const firebaseConfig = {
    apiKey: "AIzaSyAKMhcEsfDBKdQYQ3md5rhCdgkMijV8m9Y",
    authDomain: "usuarios-instagram.firebaseapp.com",
    projectId: "usuarios-instagram",
    storageBucket: "usuarios-instagram.appspot.com",
    messagingSenderId: "999866750942",
    appId: "1:999866750942:web:9f36c0767b4c1e82b4ef4f"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, "usuarios");
export const queryUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = yield getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
        return !querySnapshot.empty;
    }
    catch (error) {
        return false;
    }
});
export const addUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield addDoc(collection(db, "usuarios"), { email, password });
        console.log(docRef.id);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
export const addPost = ({ username, publicacion, comentario }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const docRef = yield addDoc(collection(db, 'posts'), {
            username,
            publicacion,
            comentario,
            comentarios: 0,
            profilephoto: '../assets/perfilRichard.png'
        });
        console.log(docRef.id);
        return true;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
export const pintarPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = [];
        const querySnapshot = yield getDocs(collection(db, 'posts'));
        querySnapshot.forEach((post) => {
            posts.push(post.data());
            //console.log(post);
        });
        return posts;
    }
    catch (error) {
        console.error(error);
        alert('No se pudo mostrar el post');
    }
});
