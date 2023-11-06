import {testUrl, circleSelector0, circleSelector1, circleSelector2, circleSelector3, circleSelector4, circleSelectorAll } from '../utils/utils';

const inputValueSelector = "[data-cy=input-value]";
const inputIndexSelector = "[data-cy=input-index]";
const addHeadButtonSelector = "[data-cy=add-head-button]";
const addTailButtonSelector = "[data-cy=add-tail-button]";
const addByIndexButtonSelector = "[data-cy=add-by-index-button]";
const deleteHeadButtonSelector = "[data-cy=delete-head-button]";
const deleteTailButtonSelector = "[data-cy=delete-tail-button]";
const deleteByIndexButtonSelector = "[data-cy=delete-by-index-button]";

describe("Queue component testing", () => {
  beforeEach(() => {
    cy.visit(`${testUrl}/list`);
  });

  it("if the input is empty, then the add button is not available", () => {
    cy.get("input").should("be.empty");
    cy.get(addHeadButtonSelector).should("be.disabled");
    cy.get(addTailButtonSelector).should("be.disabled");
    cy.get(addByIndexButtonSelector).should("be.disabled");
    cy.get(deleteByIndexButtonSelector).should("be.disabled");
  });

  it("should check whether the default list is drawn correctly", () => {
    cy.get(circleSelector0).should("contain", "0");
    cy.get(circleSelector1).should("contain", "34");
    cy.get(circleSelector2).should("contain", "8");
    cy.get(circleSelector3).should("contain", "1");
  });

  it("should check whether the element is added to head correctly", () => {
    cy.get(inputValueSelector).type("5");
    cy.get(addHeadButtonSelector).click();
    cy.get(circleSelector0).should("contain", "5");
  });

  it("should check whether the element is added to tail correctly", () => {
    cy.get(inputValueSelector).type("5");
    cy.get(addTailButtonSelector).click();
    cy.get(circleSelector4).should("contain", "5");
  });

  it("should check whether the element by index is added correctly", () => {
    cy.get(inputValueSelector).type("5");
    cy.get(inputIndexSelector).type("1");
    cy.get(addByIndexButtonSelector).click();
    cy.get(circleSelector1).should("contain", "5");
  });

  it("should check whether the element is removed from head correctly", () => {
    cy.get(deleteHeadButtonSelector).click();
    cy.get(circleSelector0).should("contain", "34");
  });

  it("should check whether the element is removed from tail correctly", () => {
    cy.get(deleteTailButtonSelector).click();
    cy.get(circleSelector2).should("contain", "8");
  });

  it("should check whether the element by index is removed correctly", () => {
    cy.get(inputIndexSelector).type("1");
    cy.get(deleteByIndexButtonSelector).click();
    cy.get(circleSelectorAll).should("have.length", 3);
  });
});