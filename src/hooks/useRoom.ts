import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useAuth } from '../hooks/useAuth';

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean
  isHighlighted: boolean;
  likeCount: number;
  likeId: string;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean
  isHighlighted: boolean;
  likes: Record<string,{
    authorId: string;
  }>
}>

export function useRoom(roomId: string){
  const { user } = useAuth();
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
          likeCount: Object.values(value.likes  ?? {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0],
          
        }
      })
      setTitle(dataRoom.title)
      setQuestions(parsedQuestions)
    });
     /* return () => {
        roomRef.off('value');
      }*/
  },[roomId, user?.id]); 
  
  

  return {questions, title}
}