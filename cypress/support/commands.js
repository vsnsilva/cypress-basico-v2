Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Veronica')
    cy.get('#lastName').type('Negreiro')
    cy.get('#email').type('vsnsilva@paschoalotto.com.br')
    cy.get('#open-text-area').type('Teste')
    cy.get('button[type="submit"]').click()
})
