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

export function Question({
  content,
  author,
  children
}: QuestionProps){
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span className="username">{author.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}