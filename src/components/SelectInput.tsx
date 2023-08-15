import React from 'react'

export interface IProps {
    title: string,
    name: string,
    defaultValue: string,
    value: string,
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    options: string[]
}

const SelectInput = ({
    title,
    name,
    defaultValue,
    value,
    handleChange,
    options
}: IProps) => {
  return (
    <div className='flex justify-between'>
        <label htmlFor={title}>{title}</label>
        <select
            name={name}
            id={name}
            value={value}
            onChange={handleChange}
        >
            <option hidden value={defaultValue}>{defaultValue}</option>
            {options.map((name) => (
                <option key={name} value={name}>{name}</option>
            ))}
        </select>
    </div>
  )
}

export default SelectInput