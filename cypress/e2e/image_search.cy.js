describe('Image Search', () => {
    it('should open the main page', () => {
      cy.visit('http://localhost:3000');
      cy.contains('Apoteka Image Search');
    });
  
    it('should show loading text when typing', () => {
        cy.visit('http://localhost:3000');
        cy.get('input[placeholder="Search for images..."]').type('Nature');
        cy.contains('loading...');
      });

});