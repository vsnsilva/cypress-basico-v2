it('tsta a página da política de privacidade de forma independentee', () => {
    cy.visit('./src/privacy.html')

    cy.contains('Talking About Testing').should('be.visible')
})