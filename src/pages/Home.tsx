import { useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from "../App";
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.css'
import { Button } from '../components/Button'
import { useContext } from "react";

export function Home(){
  let navigate = useNavigate();
  const { user, signInWithGoogle } = useContext(AuthContext)

  function createRoom(){
   if(!user){
     signInWithGoogle()
   }
   navigate('/rooms/new')
  }

  return (
<div id="page-auth" >
  <aside>
    <img src={illustrationImg} alt="illustration ask" />
    <strong>Answer your audience</strong>
    <p>answer your community in real time</p>
  </aside>
  <main>
    <div className="main-content">
      <img src={logoImg} alt="letmeask" />
      <button onClick={createRoom} className="btn-create-room">
        <img src={googleIcon} alt="google logo" />
        Create your room
      </button>
      <div className="separator" >or enter in a room</div>
      <form>
        <input 
        type="text" 
        placeholder="Type the room code"
        />
        <Button type="submit">
          enter room
        </Button>
      </form>
    </div>
  </main>
</div>
  )
}