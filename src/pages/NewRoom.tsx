
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcon from '../assets/images/google-icon.svg'
import '../styles/auth.css'
import { Button } from '../components/Button'
import { Link } from "react-router-dom";
import { useContext } from 'react'
import { AuthContext } from '../App'
export function NewRoom(){
const { user } = useContext(AuthContext)

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
      <h1>{ user?.name }</h1>
      <h2>Create a new room</h2>
      <form>
        <input 
        type="text" 
        placeholder="room name"
        />
        <Button type="submit">
          Create room
        </Button>
      </form>
      <p className="txt-p">Do you want to enter a room? <Link to="/">Click here</Link></p>
    </div>
  </main>
</div>
  )
}