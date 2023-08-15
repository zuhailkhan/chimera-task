import { fireEvent, render, screen } from "@testing-library/react";
import Button, { IProps } from "./Button";
import React from "react";

describe('Button Component', () => {
    const defaultProps: IProps = {
        type: "button",
        title: "Submit",
        handleClick: jest.fn(),
    }
    it('should render the component', () => {
        render(<Button {...defaultProps}>Submit</Button>);
        const button = screen.getByTitle(defaultProps.title)!;
        expect(button).toBeInTheDocument();
        expect(button).toBeDefined()
    });

    it('should be clickable and event should run', () => {
        render(<Button type="button" title="Submit" handleClick={defaultProps.handleClick}/>);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(defaultProps.handleClick).toHaveBeenCalledTimes(1);  
    })
})