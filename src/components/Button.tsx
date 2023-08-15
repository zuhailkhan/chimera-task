import React from 'react'

export interface IProps {
    type: "button" | "submit" | "reset",
    title: string,
    handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
    children?: React.ReactNode
}

const Button = ({ type, title, handleClick, children }: IProps) => {
  return (
    <button type={type} title={title} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button