
import { FormEvent, useState } from 'react'
import { getDatabase, ref, child, push, update } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth';

import '../styles/auth.css'


export function NewRoom() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if (newRoom.trim() === '') {
      return;
    }
    //push room and data
    const firebaseRoom = getDatabase();
    const dataRoom = {
      title: newRoom,
      authorId: user?.id,
    };
    const roomRef = push(child(ref(firebaseRoom), 'rooms/')).key;
    const updates = {};

    updates['/rooms/' + roomRef] = dataRoom;

    navigate(`/admin/rooms/${roomRef}`);

    return update(ref(firebaseRoom), updates);
  }



  return (
    <div id="page-auth" >
      <aside>
        <img className="img-big-home" src={illustrationImg} alt="illustration ask" />
        <strong>Answer your audience</strong>
        <p>Real time answer your community.</p>
      </aside>
      <main>
        <div className="main-content">
          <img className="main-logo" src={logoImg} alt="letmeask" />
          <div className="user-info2">
            <img className="user-avatar" src={user?.avatar} alt="User avatar" />
            <h1 className="user-name">{user?.name}</h1>
          </div>
          <h2>Create a new room</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="room name"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Create a room
            </Button>
          </form>
          <p className="txt-p">if you want to join a open room <Link to="/">Click here</Link></p>
        </div>
      </main>
    </div>
  )
}