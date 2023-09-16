describe('Payouts', () => {
  it('Calculates correct payouts', () => {
    cy.visit('http://localhost:4200');

    cy.get('[data-testid="name-input"]').type('Adriana');
    cy.get('[data-testid="amount-input"]').type('5.75');
    cy.get('[data-testid="add-expense-button"]').click();
    cy.get('[data-testid="name-input"]').type('Adriana');
    cy.get('[data-testid="amount-input"]').type('5.75');
    cy.get('[data-testid="add-expense-button"]').click();
    cy.get('[data-testid="name-input"]').type('Bao');
    cy.get('[data-testid="amount-input"]').type('12');
    cy.get('[data-testid="add-expense-button"]').click();

    cy.get('[data-testid="settle-up-button"]').click();

    cy.get('[data-testid="total"]').should('contain.text', '23.5');
    cy.get('[data-testid="equal-share"]').should('contain.text', '11.75');
    cy.get('[data-testid="payouts-owes-0"]').should('contain.text', 'Adriana');
    cy.get('[data-testid="payouts-owed-0"]').should('contain.text', 'Bao');
    cy.get('[data-testid="payouts-amount-0"]').should('contain.text', '0.25');
  });

  it('Edit button correct behavior', () => {
    cy.visit('http://localhost:4200');

    cy.get('[data-testid="name-input"]').type('Adriana');
    cy.get('[data-testid="amount-input"]').type('5.75');
    cy.get('[data-testid="add-expense-button"]').click();

    cy.get('[data-testid="delete-data-0"]').click();
    cy.get('[data-testid="edit-data-0"]').click();
    cy.get('[data-testid="edit-data-0"]').should('have.class', 'fa-marked');
  })
});





