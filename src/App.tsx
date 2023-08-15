import React, { useState } from 'react'
import Input from './components/Input'
import './App.css'
import SelectInput from './components/SelectInput'
import Button from './components/Button'
import PostBox from './components/PostBox'

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
  const [showPosts, setShowPosts] = useState<Boolean>(false)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowPosts(true)
  };

  return (
    <>
      <div>
        {!showPosts ? (
          <form
            title="defaultForm"
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-3"
          >
            {Object.entries(formData).map(([key]) => {
              if (key === "gender") {
                return (
                  <SelectInput
                    key={key}
                    title={key}
                    name={key}
                    defaultValue="Select a gender"
                    value={formData["gender"]}
                    handleChange={handleInput}
                    options={["Male", "Female", "Other"]}
                  />
                );
              } else {
                return (
                  <Input
                    key={key}
                    title={key}
                    type={key === "age" ? "number" : "text"}
                    placeholder={`Enter ${key}`}
                    name={key}
                    handleChange={handleInput}
                    value={formData[key as keyof Omit<iFormData, "age">]}
                  />
                );
              }
            })}
            <Button type="submit" title="submitBtn" handleClick={handleSubmit}>
              Submit
            </Button>
            <Button
              type="reset"
              title="resetBtn"
              handleClick={() => setFormData(initialState)}
            >
              Clear Form
            </Button>
          </form>
        ) : (
          <PostBox />
        )}

        <button type="button" onClick={() => setShowPosts(!showPosts)}>{showPosts ? "Hide Posts" : "Show Posts"}</button>
      </div>
    </>
  );
}

export default App
