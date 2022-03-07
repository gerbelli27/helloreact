import { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { getDatabase, set, ref, child, push, remove, get } from "firebase/database";
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { Question } from '../components/Question';
import { toast, Toaster } from "react-hot-toast";

import '../styles/room.css';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);
  const db = getDatabase();


  async function handleLikeQuestions(likeId: string | undefined, questionId: string) {
    if (likeId) {
      remove(ref(db, '/rooms/' + roomId + '/questions/' + questionId + '/likes/' + likeId))
    } else {
      const newKeyLike = push(child(ref(db), 'questions/')).key;
      set(ref(db, '/rooms/' + roomId + '/questions/' + questionId + '/likes/' + newKeyLike), {
        authorId: user?.id,
      })
    }
  }
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }
    const roomRef = ref(getDatabase());
    get(child(roomRef, `rooms/${roomId}`)).then((roomCode) => {
      if (roomCode.val().endedAt) {
        toast.error('Room is now closed!')
        return;
      }
      if (roomCode.exists()) {
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
      }

    }).catch((error) => {
      console.error(error);
    });

  }

  return (
    <div id="page-room">
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask logo" />
          <RoomCode code={roomId} />
        </div>
      </header>
      <main className="main">
        <div className="room-title" >
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>
        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="Ask a question."
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer" >
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span className="username">{user.name}</span>
              </div>
            ) : (<span className="username1"><a className="log-in">Log in</a>to ask questions</span>)}
            <button className="btn" type="submit" disabled={!user} >Send question</button>
          </div>
        </form>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likeId ? 'liked' : ''}`}
                    type="button"
                    aria-label="I like"
                    onClick={() => handleLikeQuestions(question.likeId, question.id)}
                  >
                    {question.likeCount > 0 && <span>{question.likeCount}</span>}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </div>
      </main>

    </div>


  )
}