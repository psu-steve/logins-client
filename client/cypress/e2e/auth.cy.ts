describe('Authentication Flow', () => {
  it('successfully logs in with Google', () => {
    cy.visit('/');
    cy.get('[data-testid=google-login]').click();
    cy.url().should('include', 'accounts.google.com');
  });

  it('handles failed authentication', () => {
    cy.visit('/login?error=auth_failed');
    cy.contains('Authentication failed').should('be.visible');
  });

  it('successfully logs in with Facebook', () => {
    cy.visit('/login')
    cy.get('[data-testid="facebook-login"]').click()
    // Add mock for Facebook OAuth
    cy.url().should('include', '/dashboard')
  })
}) 