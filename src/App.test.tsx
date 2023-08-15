import App from "./App";
import { screen, render, fireEvent } from '@testing-library/react'

describe('App form testing', () => {
    it('should render the form', () => {
        render(<App />)
        const form = screen.getByTitle('defaultForm')
        expect(form).toBeInTheDocument()
        expect(form).toBeVisible()
    })

    it('should be valid form', () => {
        render(<App />)
        const form = screen.getByTitle('defaultForm')
        expect(form).toBeDefined()

        const nameInput: HTMLInputElement = screen.getByTitle('name')
        fireEvent.change(nameInput, {
            target: {
                value: 'Zuhail'
            }
        })

        expect(nameInput.value).toBe('Zuhail')

        // age Input
        const ageInput: HTMLInputElement = screen.getByTitle('age')!
        fireEvent.change(ageInput, {
            target: {
                value: 20
            }
        })

        expect(ageInput.value).toBe("20")

        // email Input
        const emailInput: HTMLInputElement = screen.getByTitle('email')!
        fireEvent.change(emailInput, {
            target: {
                value: 'zuhail@test.com'
            }
        })
        const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/gm;
        expect(emailInput.value).toMatch(emailRegex)
        expect(emailInput.value).toBe('zuhail@test.com')

        // mobile number input
        const mobileInput: HTMLInputElement = screen.getByTitle('mobile')!
        fireEvent.change(mobileInput, {
            target: {
                value: '9895123456'
            }
        })

        expect(mobileInput.value).toBe('9895123456')

        // gender Selector
        const genderSelect: HTMLSelectElement = screen.getByTitle('gender')!
        fireEvent.change(genderSelect, {
            target: {
                value: 'Male'
            }
        })

        expect(genderSelect.value).toBe('Male')
    })
    
})