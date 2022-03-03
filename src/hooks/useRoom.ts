import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean
  isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean
  isHighlighted: boolean;
}>

export function useRoom(roomId: string){
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');
  const db = getDatabase();

  useEffect(() => {
    const roomRef = ref(db, '/rooms/' + roomId)
    onValue(roomRef, (room) => {
      const dataRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = dataRoom.questions ?? {};
      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(dataRoom.title)
      setQuestions(parsedQuestions)
    });
  }, [roomId]);

  return {questions, title}
}