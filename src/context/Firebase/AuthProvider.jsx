import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import auth from "../../firebase/Firebase.config";
import AuthLoading from "../../components/Shared/AuthLoading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // * Sing Up with Email and Password
  const signUpWithEmailAndPassWord = (email, Password) => {
    setAuthLoading(true);
    return createUserWithEmailAndPassword(auth, email, Password);
  };

  // * Login with Email and Password
  const loginWithEmailAndPassword = (email, password) => {
    setAuthLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // * Sign In with Google
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setAuthLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // * Sing OUt User
  const signOUt = () => {
    setAuthLoading(true);
    return signOut(auth);
  };

  // * Track User
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    signUpWithEmailAndPassWord,
    loginWithEmailAndPassword,
    signInWithGoogle,
    user,
    setUser,
    signOUt,
    authLoading,
    setAuthLoading,
  };

  if (authLoading) {
    return <AuthLoading />;
  }

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
