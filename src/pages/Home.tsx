import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.css'
import { Button } from '../components/Button'
import { useAuth } from "../hooks/useAuth";
import { getDatabase, ref, child, get } from "firebase/database";
import { toast, Toaster } from "react-hot-toast";

export function Home() {
  let navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState('');
  function createRoom() {
    if (!user) {
      signInWithGoogle()
    }
    navigate('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }
    const roomRef = ref(getDatabase());
    get(child(roomRef, `rooms/${roomCode}`)).then((roomCode) => {
      if (!roomCode.exists()) {
        toast.error("Room does not exist!")
        return;
      }
      if (roomCode.val().endedAt) {
        toast.error('Room already closed!')
        return;
      }
      if (roomCode.exists()) {
        navigate(`/rooms/${roomCode.key}`)
        return;
      }

    }).catch((error) => {
      console.error(error);
    });

  }

  return (
    <div id="page-auth" >
      <Toaster
        position="bottom-center"
        reverseOrder={true}
      />
      <aside>
        <img className="img-big-home"  src={illustrationImg} alt="illustration ask" />
        <strong>Answer your audience</strong>
        <p>Real time answer your community.</p>
      </aside>
      <main>
        <div className="main-content">
          <img  className="main-logo" src={logoImg} alt="letmeask" />
          <div className="container">
            <strong className="title">Answer your audience</strong>
            <p className="subtitle">answer your community in real time</p>
          </div>
          <button onClick={createRoom} className="btn-create-room">
            <img src={googleIcon} alt="google logo" />
            Create your room
          </button>
          <div className="separator" >or enter in a room</div>
          <form onSubmit={handleJoinRoom} >
            <input
              type="text"
              placeholder="Type the room code"
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
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