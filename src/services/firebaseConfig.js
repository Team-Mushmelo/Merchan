// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion, arrayRemove, collection, addDoc, serverTimestamp, getDocs, query, orderBy, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCVgCh7jg2HJDvZuUjam-YzaPTmZhiyK6Y",
    authDomain: "merchan-app-react.firebaseapp.com",
    projectId: "merchan-app-react",
    storageBucket: "merchan-app-react.appspot.com",
    messagingSenderId: "491864034158",
    appId: "1:491864034158:web:c124a623863116ca69cf7f",
    measurementId: "G-2DN1N6F8ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// Firestore methods
export {
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    collection,
    addDoc,
    serverTimestamp,
};

// Função para adicionar um post
export const addPost = async (content, uri) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado.');

        await addDoc(collection(firestore, 'posts'), {
            content,
            uri,
            email: user.email,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            likes: [], // Inicializa likes como um array vazio
            comments: []
        });
        console.log('Post adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar post:', error);
    }
};

// Função para buscar posts
export const fetchPosts = async () => {
    try {
        const postsRef = collection(firestore, 'posts');
        const postsQuery = query(postsRef, orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(postsQuery);

        const posts = [];
        querySnapshot.forEach((doc) => {
            posts.push({ id: doc.id, ...doc.data() });
        });

        return posts;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        return [];
    }
};

// Função para escutar posts em tempo real
export const subscribeToPosts = (callback) => {
    try {
        const postsRef = collection(firestore, 'posts');
        const q = query(postsRef, orderBy('createdAt', 'desc'));
        return onSnapshot(q, (snapshot) => {
            const posts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(posts);
        });
    } catch (error) {
        console.error('Erro ao escutar posts:', error);
    }
};

// Função para adicionar um comentário a um post
export const addComment = async (postId, comment) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado.');

        const postRef = doc(firestore, 'posts', postId);
        await updateDoc(postRef, {
            comments: arrayUnion({ user: user.email, comment, createdAt: serverTimestamp() })
        });
        console.log('Comentário adicionado com sucesso!');
    } catch (error) {
        console.error('Erro ao adicionar comentário:', error);
    }
};

// Função para buscar comentários de um post
export const fetchComments = async (postId) => {
    try {
        const postRef = doc(firestore, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        
        if (postSnapshot.exists()) {
            return postSnapshot.data().comments || [];
        } else {
            console.log('Post não encontrado.');
            return [];
        }
    } catch (error) {
        console.error('Erro ao buscar comentários:', error);
    }
};

// Função para buscar um post específico
export const fetchPostById = async (postId) => {
    try {
        const postRef = doc(firestore, 'posts', postId);
        const postSnapshot = await getDoc(postRef);
        
        if (postSnapshot.exists()) {
            return { id: postSnapshot.id, ...postSnapshot.data() };
        } else {
            console.log('Post não encontrado.');
            return null;
        }
    } catch (error) {
        console.error('Erro ao buscar post:', error);
    }
};

// Função para curtir um post
export const likePost = async (postId) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado.');

        const postRef = doc(firestore, 'posts', postId);
        await updateDoc(postRef, {
            likes: arrayUnion(user.uid) // Adiciona o ID do usuário
        });
        console.log('Post curtido com sucesso!');
    } catch (error) {
        console.error('Erro ao curtir post:', error);
    }
};

// Função para descurtir um post
export const unlikePost = async (postId) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado.');

        const postRef = doc(firestore, 'posts', postId);
        await updateDoc(postRef, {
            likes: arrayRemove(user.uid) // Remove o ID do usuário
        });
        console.log('Post descurtido com sucesso!');
    } catch (error) {
        console.error('Erro ao descurtir post:', error);
    }
};


// Função para atualizar um post
export const updatePost = async (postId, updatedContent) => {
    try {
        const postRef = doc(firestore, 'posts', postId);
        await updateDoc(postRef, {
            content: updatedContent,
            updatedAt: serverTimestamp()
        });
        console.log('Post atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar post:', error);
    }
};

// Função para remover um comentário
export const removeComment = async (postId, comment) => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error('Usuário não autenticado.');

        const postRef = doc(firestore, 'posts', postId);
        await updateDoc(postRef, {
            comments: arrayRemove(comment)
        });
        console.log('Comentário removido com sucesso!');
    } catch (error) {
        console.error('Erro ao remover comentário:', error);
    }
};
