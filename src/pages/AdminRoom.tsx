import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { getDatabase, set, ref, child, push } from "firebase/database";
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';

import '../styles/room.css';
import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId)
  const db = getDatabase();

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('you must be logged in')
    }

    const newKeyQuestion = push(child(ref(db), 'rooms/')).key;
    set(ref(db, '/rooms/' + roomId + '/questions/' + newKeyQuestion), {
      content: newQuestion,
      author: {
        name: user!.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    });

    setNewQuestion('')
    // navigate(`/rooms/${roomRef}`);

  }

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