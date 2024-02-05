// Importation de la base de données Firebase

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export const useFirebase = () => {
  const firebaseConfig = {
   apiKey: "AIzaSyDt1Rjd73TC3aZ61ckih0dlkqU3hs6J0cE",
  authDomain: "nami-17ae4.firebaseapp.com",
  projectId: "nami-17ae4",
  storageBucket: "nami-17ae4.appspot.com",
  messagingSenderId: "1005624533902",
  appId: "1:1005624533902:web:ffdda638cd349acafa3adf"
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);

  return {
    firebaseApp,
    firestore,
  };
};