describe("Queue component testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("be.empty");
    cy.get("[data-cy=add-head-button]").should("be.disabled");
    cy.get("[data-cy=add-tail-button]").should("be.disabled");
    cy.get("[data-cy=add-by-index-button]").should("be.disabled");
    cy.get("[data-cy=delete-by-index-button]").should("be.disabled");
  });

  it("should check whether the default list is drawn correctly", () => {
    cy.get("[data-cy=circle-0]").should("contain", "0");
    cy.get("[data-cy=circle-1]").should("contain", "34");
    cy.get("[data-cy=circle-2]").should("contain", "8");
    cy.get("[data-cy=circle-3]").should("contain", "1");
  });

  it("should check whether the element is added to head correctly", () => {
    cy.get("[data-cy=input-value]").type("5");
    cy.get("[data-cy=add-head-button]").click();
    cy.get("[data-cy=circle-0]").should("contain", "5");
  });

  it("should check whether the element is added to tail correctly", () => {
    cy.get("[data-cy=input-value]").type("5");
    cy.get("[data-cy=add-tail-button]").click();
    cy.get("[data-cy=circle-4]").should("contain", "5");
  });

  it("should check whether the element by index is added correctly", () => {
    cy.get("[data-cy=input-value]").type("5");
    cy.get("[data-cy=input-index]").type("1");
    cy.get("[data-cy=add-by-index-button]").click();
    cy.get("[data-cy=circle-1]").should("contain", "5");
  });

  it("should check whether the element is removed from head correctly", () => {
    cy.get("[data-cy=delete-head-button]").click();
    cy.get("[data-cy=circle-0]").should("contain", "34");
  });

  it("should check whether the element is removed from tail correctly", () => {
    cy.get("[data-cy=delete-tail-button]").click();
    cy.get("[data-cy=circle-2]").should("contain", "8");
  });

  it("should check whether the element by index is removed correctly", () => {
    cy.get("[data-cy=input-index]").type("1");
    cy.get("[data-cy=delete-by-index-button]").click();
    cy.get("[data-cy^=circle-]").should("have.length", 3);
  });
});