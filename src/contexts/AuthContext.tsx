import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: ()=>void;
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider(props: AuthContextProviderProps){
    const [user, setUser] = useState<User>(); 
    useEffect(() =>{

      const auth = getAuth();
       const unsubscribe = auth.onAuthStateChanged(user =>{
     
      if(user){
        const { displayName, photoURL, uid } = user
  
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google account.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return()=>{
      unsubscribe();
    }
  }, [])
   
  function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if(result.user){
        const { displayName, photoURL, uid } = result.user
  
        if(!displayName || !photoURL){
          throw new Error('Missing information from Google account.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
  
      }
      
    })
  }

  return(
    <AuthContext.Provider value={{ user, signInWithGoogle }} >
      {props.children}
    </AuthContext.Provider>
    
  );
}