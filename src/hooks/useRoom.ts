import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
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
  hasLiked: boolean;
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean
  isHighlighted: boolean;
  likes: {
    authorId: string;
  }
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
          hasLiked: Object.values(value.likes ?? {}).some(like => like.authorId === user?.id)
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