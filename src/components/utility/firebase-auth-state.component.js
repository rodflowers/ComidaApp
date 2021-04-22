import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import { loadUserFromAuthState } from "../../redux/actions/auth.action";

export const FirebaseAuthState = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((usr) => {
      if (usr) {
        dispatch(loadUserFromAuthState(usr));
      } else {
        console.log("NOT USER AUTH STATE => ");
      }
    });
    return () => {
      // cleanup
    };
  }, [dispatch]);

  return <>{children}</>;
};
