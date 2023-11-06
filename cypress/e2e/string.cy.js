import { color, testUrl } from '../utils/utils';

const input = '[data-testid=input]';
const button = '[data-testid=reverse-button]';
const circle  = '[data-testid^=circle-]';

describe("String component testing", () => {
    beforeEach(() => {
        cy.visit(`${testUrl}/recursion`);
      });

    it("if the input is empty, then the add button is not available", () => {
        cy.get(input).should('be.empty');
        cy.get(button).should('be.disabled');
    });

    it("should expand the string correctly", () => {
        cy.get(input).type('hey');
        for(let i = 0; i < 3; i++) {       
            cy.get(`[data-testid=circle-${i}]`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.default);
        }
        cy.get(button).click();

        cy.get(`[data-testid=circle-0`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.changing);
        cy.get(`[data-testid=circle-2`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.changing);

        for(let i = 0; i < 3; i++) {
            cy.get(circle).eq(i).should('have.text', 'hey'.charAt(i));
        }

        cy.wait(1000);

        for(let i = 0; i < 3; i++) {
            cy.get(circle).eq(i).should('have.text', 'hey'.charAt(2 - i));
            cy.get(`[data-testid=circle-${i}]`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.modified);
        }
    });
})