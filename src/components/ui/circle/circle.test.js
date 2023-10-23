import { render } from "@testing-library/react";
import { Circle } from ".//circle";
import { ElementStates } from '../../../types/element-states';

describe("Circle Component", () => {
    it("should correctly render a circle without a letter", () => {
        const circle = render(<Circle />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render a circle with a letter", () => {
        const circle = render(<Circle letter="A" />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element with head", () => {
        const circle = render(<Circle head="test" />);
        expect(circle).toMatchSnapshot();
    });
    
    it("should correctly render the element with a react element in the head", () => {
        const circle = render(<Circle head={<div>React Element</div>} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element with tail", () => {
        const circle = render(<Circle tail="test" />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element with a react element in the tail", () => {
        const circle = render(<Circle tail={<div>React Element</div>} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element with index", () => {
        const circle = render(<Circle index={1} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element with props isSmall", () => {
        const circle = render(<Circle isSmall={true} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element in the default state", () => {
        const circle = render(<Circle state={ElementStates.Default} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element in the changing state", () => {
        const circle = render(<Circle state={ElementStates.Changing} />);
        expect(circle).toMatchSnapshot();
    });

    it("should correctly render the element in the modified state", () => {
        const circle = render(<Circle state={ElementStates.Modified} />);
        expect(circle).toMatchSnapshot();
    });
});
