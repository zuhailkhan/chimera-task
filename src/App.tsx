import React, { useState } from 'react'
import Input from './components/Input'
import './App.css'
import SelectInput from './components/SelectInput'
import Button from './components/Button'

interface iFormData {
  name: string,
  age: number,
  email: string,
  mobile: string,
  gender: string,
}

const initialState = {
  name: '',
  age: 0,
  email: '',
  mobile: '',
  gender: '',
}

function App() {

  const [formData, setFormData] = useState<iFormData>(initialState)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    console.log(e);
  };

  return (
    <>
      <div>
        <form title="defaultForm" onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3">
          {
            Object.entries(formData).map(([key]) => {
              if(key === 'gender') {
                return (
                  <SelectInput
                    key={key}
                    title={key}
                    name={key}
                    defaultValue="Select a gender"
                    value={formData["gender"]}
                    handleChange={handleInput}
                    options={['Male', 'Female', 'Other']}
                  />
                );
              } else {
                  return <Input 
                    key={key} 
                    title={key} 
                    type="text" 
                    placeholder={`Enter ${key}`} 
                    name={key} 
                    handleChange={handleInput}
                    value={formData[key as keyof Omit<iFormData, 'age'>]}
                  />
              }
            }
            )
          }
          <Button type="submit" title="submitBtn" handleClick={handleSubmit}>Submit</Button>
          <Button type='reset' title="resetBtn" handleClick={() => setFormData(initialState)}>Clear Form</Button>
        </form>
      </div>
    </>
  );
}

export default App
