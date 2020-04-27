import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAOQnaWBR_AIA8VOqfua_m6li7b4TqxE0Y",
  authDomain: "vijaycommerce-db.firebaseapp.com",
  databaseURL: "https://vijaycommerce-db.firebaseio.com",
  projectId: "vijaycommerce-db",
  storageBucket: "vijaycommerce-db.appspot.com",
  messagingSenderId: "461709027947",
  appId: "1:461709027947:web:37f940671635e78c551f2e",
  measurementId: "G-ZFMTXDJGT0"
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
