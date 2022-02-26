import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
const auth = getAuth;

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: ()=>void;
}

type User = {
  id: string;
  name: string;
  avatar: string;
}

export const AuthContext = createContext({} as AuthContextType)

function App() {
const [user, setUser] = useState<User>();
const auth = getAuth();

useEffect(() =>{
  auth.onAuthStateChanged(user =>{
    
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


 return (
  <BrowserRouter>
    <AuthContext.Provider value={{ user, signInWithGoogle }} >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rooms/new" element={<NewRoom />} />
    </Routes>
    </AuthContext.Provider>
  </BrowserRouter>
 );
}

export default App
