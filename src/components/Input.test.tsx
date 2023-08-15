import { cleanup, screen, render } from "@testing-library/react";
import Input, { IProps } from "./Input";

describe("Input Custom Component", () => {
  const defaultProps: IProps = {
    title: "Name",
    type: "text",
    value: "",
    handleChange: jest.fn(),
  };

  afterEach(cleanup)

  it('should render the component', () => {
    const { container } = render(<Input {...defaultProps} />)
    expect(container).toMatchSnapshot()
  })

  it('should have correct values', () => {
    render(<Input {...defaultProps} value="Zuhail" />)
    const input = screen.getByTitle(defaultProps.title)! as HTMLInputElement
    expect(input.value).toBe('Zuhail')
  })
});
