describe("app works correctly with routes", function () {
    beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open homepage", () => {
    cy.contains("Вдохновлено школами, в которых не учили алгоритмам");
  });

  it("should open string page", () => {
    cy.get('[data-cy="stringLink"]').click();
    cy.contains("Строка");
  });

  it("should open fibonacci page", () => {
    cy.get('[data-cy="fibonacciLink"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page", () => {
    cy.get('[data-cy="sortingLink"]').click();
    cy.contains("Сортировка массива");
  });

  it("should open stack page", () => {
    cy.get('[data-cy="stackLink"]').click();
    cy.contains("Стек");
  });

  it("should open queue page", () => {
    cy.get('[data-cy="queueLink"]').click();
    cy.contains("Очередь");
  });

  it("should open list page", () => {
    cy.get('[data-cy="listLink"]').click();
    cy.contains("Связный список");
  });
});
