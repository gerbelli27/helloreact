import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";

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
