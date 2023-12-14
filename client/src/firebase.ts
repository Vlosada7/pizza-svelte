// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDvYNo92RhTctqcO3DfBSWRcpr7fabIP80',
	authDomain: 'svelte-pizza.firebaseapp.com',
	projectId: 'svelte-pizza',
	storageBucket: 'svelte-pizza.appspot.com',
	messagingSenderId: '420314462695',
	appId: '1:420314462695:web:e3fbf4925e38bd102ba542'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
