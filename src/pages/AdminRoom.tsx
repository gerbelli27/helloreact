import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import '../styles/room.css';
import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask logo" />
          <div className="close-room">
            <RoomCode code={roomId} />
            <Button className="btn-close">Close Room</Button>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="room-title" >
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>

        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              />
            );
          })}
        </div>
      </main>

    </div>


  )
}