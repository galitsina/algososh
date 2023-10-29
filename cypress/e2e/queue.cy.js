import { color, testUrl, circleSelector0, circleSelector1, addButtonSelector, inputSelector } from "../utils/utils";

describe("Queue component testing", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/queue`);
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get(inputSelector).should("be.empty");
    cy.get(addButtonSelector).should("be.disabled");
  });

  it("should check whether the element was added to the queue correctly", () => {
    cy.get(inputSelector).type("5");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector0).find('div>div[class^="circle"]').should("have.css", "border-color", color.changing);
    cy.get(circleSelector0).should("contain", "5");
    cy.get(circleSelector0).children().should("contain", "head");
    cy.get(circleSelector0).children().should("contain", "tail");
    cy.wait(1000);
    cy.get(circleSelector0).find('div>div[class^="circle"]').should("have.css", "border-color", color.default);

    cy.get(inputSelector).type("6");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector1).find('div>div[class^="circle"]').should("have.css", "border-color", color.changing);
    cy.get(circleSelector1).should("contain", "6");
    cy.get(circleSelector1).children().should("contain", "tail");
    cy.wait(1000);
    cy.get(circleSelector1).find('div>div[class^="circle"]').should("have.css", "border-color", color.default);
  });

  it("should check  removing an element from the queue correctly", () => {
    cy.get(inputSelector).type("5");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector0).should("contain", "5");
    cy.get(circleSelector0).children().should("contain", "head");
    cy.get(circleSelector0).children().should("contain", "tail");

    cy.get(inputSelector).type("6");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector1).should("contain", "6");
    cy.get(circleSelector1).children().should("contain", "tail");

    cy.get("[data-cy=remove-button]").click();
    cy.get(circleSelector0).should("contain", "");
    cy.get(circleSelector1).should("contain", "6");
    cy.get(circleSelector1).children().should("contain", "tail");
    cy.get(circleSelector1).children().should("contain", "head");
  });

  it("should check the behavior of the Clear button", () => {
    cy.get(inputSelector).type("5");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector0).should("contain", "5");

    cy.get(inputSelector).type("6");
    cy.get(addButtonSelector).click();
    cy.get(circleSelector1).should("contain", "6");

    cy.get("[data-cy=clear-button]").click();
    cy.get(circleSelector0).should("contain", "");
    cy.get(circleSelector1).should("contain", "");
  });
});
