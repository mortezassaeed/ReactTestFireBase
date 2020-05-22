import firebase from 'firebase/app';
import  "firebase/firestore";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDPiC02G7uTBaqB6BJJ2avuxNt-RUk-jbM",
    authDomain: "crown-db-84e58.firebaseapp.com",
    databaseURL: "https://crown-db-84e58.firebaseio.com",
    projectId: "crown-db-84e58",
    storageBucket: "crown-db-84e58.appspot.com",
    messagingSenderId: "883606008282",
    appId: "1:883606008282:web:2312c170ba3edc309a50e3",
    measurementId: "G-L6TE7FJSS8"
  };

  firebase.initializeApp(firebaseConfig);
  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt : 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);


  // firestore.collection('users').doc('[id]').collection('cartItem').doc('id');
  // firestore.doc('/users/[id]/cartItem/[id]')
  // firestore.collection('/users/[id]/cartItem')



  export const createUserInDb = async (user, addtionalData)=>{
    debugger;
    if(!user)
      return null;
      console.log(user);
      const userRef = firestore.doc(`users/${user.uid}`);
      const userSanpshot = await userRef.get();
      const { displayName, email } = user;

      try{
        if(!userSanpshot.exists){
          await userRef.set({
            displayName,
            email,
            ...addtionalData
          });
        }
      }catch(e){
        console.log(e);
      }
  }