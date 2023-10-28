import { color } from '../utils/utils';

describe("Stack component testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("be.empty");
    cy.get('[data-cy=add-button]').should("be.disabled");
  });

  it("should check that the element was added to the stack correctly", () => {
    cy.get("input").type("5");
    cy.get('[data-cy=add-button]').click();
    cy.get(`[data-cy=circle-0`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.changing);
    cy.get('[data-cy=circle-0]').should('contain', "5");
    cy.wait(1000);
    cy.get(`[data-cy=circle-0`).find('div>div[class^="circle"]').should('have.css', 'border-color', color.default);
  });

  it("should check removing an element from the stack correctly", () => {
    cy.get("input").type("5");
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=circle-0]').should('contain', "5");
    cy.get('[data-cy=remove-button]').click();
    cy.get('[data-cy=circle-0]').should('not.exist');
  });

  it("should check the behavior of the Clear button", () => {
    cy.get("input").type("5");
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=circle-0]').should('contain', "5");

    cy.get("input").type("6");
    cy.get('[data-cy=add-button]').click();
    cy.get('[data-cy=circle-1]').should('contain', "6");

    cy.get('[data-cy=clear-button]').click();
    cy.get('[data-cy=circle-0]').should('not.exist');
  });
});
