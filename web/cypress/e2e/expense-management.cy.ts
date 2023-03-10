const baseUrl = Cypress.env('URL');

const generatePayouts = () => {
  cy.get('#expense-table-body tr:nth-child(1) td:nth-child(1) input').type('Adriana');
  cy.get('#expense-table-body tr:nth-child(1) td:nth-child(2) input').clear().type('5.75');
  cy.get('#add-expense-btn').click();

  cy.get('#expense-table-body tr:nth-child(2) td:nth-child(1) input').type('Adriana');
  cy.get('#expense-table-body tr:nth-child(2) td:nth-child(2) input').clear().type('5.75');
  cy.get('#add-expense-btn').click();

  cy.get('#expense-table-body tr:nth-child(3) td:nth-child(1) input').type('Bao');
  cy.get('#expense-table-body tr:nth-child(3) td:nth-child(2) input').clear().type('12');
  cy.get('#settle-up-btn').click();
};

describe('Expense_Management', () => {
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('Check_Main_Page_Is_Working', () => {
    cy.title().should('eq', 'ExpenseTracker');
  });

  it('Check_Add_Expense_Button_Is_Working', () => {
    cy.get('#add-expense-btn').click();
    cy.get('#expense-table-body tr').should('have.length', 2);
  });

  it('Check_Remove_Expense_Button_Is_Working', () => {
    cy.get('#add-expense-btn').click();
    cy.get('#expense-table-body tr:nth-child(2) td:last-child button').click();
    cy.get('#expense-table-body tr').should('have.length', 1);
  });

  it('Check_Remove_Settle_Up_Is_Working_Working', () => {
    generatePayouts();
    cy.contains('Owes Adriana Owed Bao Amount 0.25');
  });

  it('Check_Reset_Button_Is_Working_Working', () => {
    generatePayouts();
    cy.get('#reset-btn').click();
    cy.get('#expense-table-body tr').should('have.length', 1);
  });
});
