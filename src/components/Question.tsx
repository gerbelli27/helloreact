import { ReactNode } from 'react'
import '../styles/question.css';
import classnames from 'classnames'

type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div className={classnames(
      "question",
      { answered: isAnswered },// nesse trecho do codigo estou usando o pacote classnames com objetivo didatido de uso do pacote
      { highlighted: isHighlighted && !isAnswered },
      )}> 
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={author.avatar} alt={author.name} />
          <span className="username">{author.name}</span>
        </div>
        <div>{children}</div>
      </footer>
    </div>
  );
}