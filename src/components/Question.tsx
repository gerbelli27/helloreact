import { ReactNode } from 'react'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
}

import '../styles/question.css';

export function Question(props: QuestionProps){
  return (
    <div className="question">
      <p>{props.content}</p>
      <footer>
        <div className="user-info">
          <img src={props.author.avatar} alt={props.author.name} />
          <span className="username">{props.author.name}</span>
        </div>
        <div>
        </div>
      </footer>
    </div>
  );
}