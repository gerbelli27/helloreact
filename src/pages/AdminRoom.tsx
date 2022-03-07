import { useParams, useNavigate } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'
import answerImg from '../assets/images/answer.svg'
import likeImg from '../assets/images/like.svg'
import emptyQuestions from '../assets/images/empty-questions.svg'
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';


import '../styles/room.css';
import { useRoom } from '../hooks/useRoom';
import { Button } from '../components/Button';
import { getDatabase, ref, remove, update } from "firebase/database";



type RoomParams = {
  id: string;
}

export function AdminRoom() {
  //const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId)
  const db = getDatabase();
  const navigate = useNavigate();

  async function handleEndRoom(){
    update(ref(db, '/rooms/' + roomId), {
      endedAt: new Date(),
    })
    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Are you sure you want to delete this ?')) {
      remove(ref(db, '/rooms/' + roomId + '/questions/' + questionId))
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    update(ref(db, '/rooms/' + roomId + '/questions/' + questionId), {
      isAnswered: true,
    });

  }

  async function handleHighLightQuestion(questionId: string) {
    update(ref(db, '/rooms/' + roomId + '/questions/' + questionId), {
      isHighlighted: true,
    });

  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img className="logo-img" src={logoImg} alt="letmeask logo" />
          <div className="close-room">
            <RoomCode code={roomId} />
            <Button 
            className="btn-close"
            onClick={handleEndRoom}
            > Close Room
            </Button>
          </div>
        </div>
      </header>
      <main className="main">
        <div className="room-title" >
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} question(s)</span>}
        </div>
        <div className="question-list">
        <div className="question-empty">
        {questions.length == 0 && <img className="image-empty" src={ emptyQuestions } alt="No questions yet" /> }
        </div>
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
                   <>
                   {question.likeCount > 0 && <span>{question.likeCount}</span>}
                   <img src={ likeImg } alt="number of likes" />
                   <button type="button"
                   onClick={() => handleCheckQuestionAsAnswered(question.id)}>
                   <img src={checkImg} alt="Highlight question" />
                 </button>
                  <button type="button"
                   onClick={() => handleHighLightQuestion(question.id)}>
                   <img src={answerImg} alt="Mark question as answered" />
                 </button>
                 </>
                )}
                <button type="button"
                  onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="Remove question" />
                </button>
              </Question>


            );
          })}
        </div>
      </main>

    </div>


  )
}