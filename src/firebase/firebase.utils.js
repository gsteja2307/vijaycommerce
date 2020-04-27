import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAS8U1hN7mkAkHucov8RApnJGf9TsyMkNE",
  authDomain: "vijaycommerce-db-55da3.firebaseapp.com",
  databaseURL: "https://vijaycommerce-db-55da3.firebaseio.com",
  projectId: "vijaycommerce-db-55da3",
  storageBucket: "vijaycommerce-db-55da3.appspot.com",
  messagingSenderId: "326197256183",
  appId: "1:326197256183:web:ee87d19b48d4d74849d8f2",
  measurementId: "G-F0K4J01KWB"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
