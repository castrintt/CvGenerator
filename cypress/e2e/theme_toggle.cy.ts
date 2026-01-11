describe('Theme Toggle', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should toggle between light and dark mode', () => {
    // Check initial state (assuming light mode default)
    cy.get('html').should('have.attr', 'data-theme', 'light');
    
    // Find and click toggle button
    cy.get('button[title="Mudar para modo escuro"]').click();
    
    // Check if theme changed to dark
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    
    // Click again to toggle back
    cy.get('button[title="Mudar para modo claro"]').click();
    
    // Check if theme changed back to light
    cy.get('html').should('have.attr', 'data-theme', 'light');
  });

  it('should persist theme preference', () => {
    // Switch to dark mode
    cy.get('button[title="Mudar para modo escuro"]').click();
    cy.get('html').should('have.attr', 'data-theme', 'dark');
    
    // Reload page
    cy.reload();
    
    // Should still be in dark mode
    cy.get('html').should('have.attr', 'data-theme', 'dark');
  });
});
