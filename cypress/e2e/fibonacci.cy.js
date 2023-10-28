describe("Fibonacci component testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("be.empty");
    cy.get("button").should("be.disabled");
  });

  it("should generate numbers correctly", () => {
    cy.get('[data-cy=fibonacci-input]').type("5");
    cy.get('[data-cy=calculate-button]').click();

    const fibonacciNumbers = [1, 1, 2, 3, 5, 8];
    cy.get('[data-cy^=circle-]').each((item, index) => {
        cy.get('[data-cy^=circle-]').should('have.length', fibonacciNumbers.length);
        cy.wrap(item).should('contain', String(fibonacciNumbers[index]));
    });
  });
});
