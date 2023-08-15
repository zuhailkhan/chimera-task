import React from 'react'


export interface IProps {
  title: string;
  type: string;
  placeholder?: string;
  name?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string,
}

const Input = ({title, type, placeholder, name, handleChange, value}: IProps) => {

  return (
    <div className="flex justify-between" title={title + '_container'}>
      <label htmlFor={title}>{title}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        title={title}
        id={type + title}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default Input